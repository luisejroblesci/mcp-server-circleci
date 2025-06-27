import { Transport, SSETransport } from './sse.js';
import { StdioTransport } from './stdio.js';

export { Transport };

export type TransportType = 'sse' | 'stdio';

export function createTransport(type: TransportType): Transport {
  switch (type) {
    case 'sse':
      return new SSETransport();
    case 'stdio':
      return new StdioTransport();
    default:
      throw new Error(`Unknown transport type: ${type as string}`);
  }
}
