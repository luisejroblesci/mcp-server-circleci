#!/usr/bin/env node

import express from 'express';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import { CCI_HANDLERS, CCI_TOOLS, ToolHandler } from './circleci-tools.js';

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageJson = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'),
);

const server = new McpServer(
  { name: 'mcp-server-circleci', version: packageJson.version },
  { capabilities: { tools: {}, resources: {} } },
);

// Register CircleCI tools
CCI_TOOLS.forEach((tool) => {
  const handler = CCI_HANDLERS[tool.name];
  if (!handler) throw new Error(`Handler for tool ${tool.name} not found`);
  server.tool(
    tool.name,
    tool.description,
    { params: tool.inputSchema },
    handler as ToolHandler<typeof tool.name>,
  );
});

async function main() {
  const app = express();
  app.use(express.json());                                  

  // Keep active transports per session
  const transports: Record<string, SSEServerTransport> = {};

  // GET /sse → SSE endpoint for establishing connection
  app.get('/sse', async (req, res) => {
    const transport = new SSEServerTransport('/invocations', res);
    transports[transport.sessionId] = transport;
    
    // Connect the server to the transport (this calls start() automatically)
    await server.connect(transport);
  });

  // POST /invocations → handle initialize + calls
  // @ts-ignore - TypeScript inference issue with Express route handler
  app.post('/invocations', async (req, res) => {
    const sessionId = req.header('mcp-session-id') as string || req.query.sessionId as string;
    
    if (!sessionId || !transports[sessionId]) {
      return res.status(400).json({
        jsonrpc: '2.0',
        error: { code: -32000, message: 'Invalid or missing MCP session ID' },
        id: req.body?.id || null,
      });
    }

    const transport = transports[sessionId];
    
    try {
      // handle the MCP request via transport
      await transport.handlePostMessage(req, res, req.body);
    } catch (error: any) {
      console.error('MCP request error:', error);
      if (!res.headersSent) {
        res.status(500).json({
          jsonrpc: '2.0',
          error: {
            code: -32603,
            message: 'Internal error',
            data: error.message,
          },
          id: req.body?.id || null,
        });
      }
    }
  });

  // GET /ping → simple health check
  app.get('/ping', (_req, res) => {
    res.json({ result: 'pong' });
  });

  const port = 8080;
  app.listen(port, () => {
    console.log(`CircleCI MCP server listening on http://0.0.0.0:${port}`);  
  });
}

main().catch((err) => {
  console.error('Server error:', err);
  process.exit(1);
});
