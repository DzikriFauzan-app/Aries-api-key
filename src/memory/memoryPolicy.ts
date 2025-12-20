export const MEMORY_POLICY = {
  FREE: {
    maxRecords: 100,
    write: false
  },
  PRO: {
    maxRecords: 10_000,
    write: true
  },
  ENTERPRISE: {
    maxRecords: 1_000_000,
    write: true
  }
};
