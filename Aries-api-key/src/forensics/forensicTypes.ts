export interface ForensicEvent {
  id: string;
  type: string;
  source: string;
  timestamp: number;
  correlationId?: string;
  payloadHash: string;
}
