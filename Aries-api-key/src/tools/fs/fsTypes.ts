/**
 * @status CERTIFIED_INDUSTRY_GRADE
 */
import { Logger } from '../../audit/auditLogger';


export type FsToolName =
  | "fs.read"
  | "fs.write"
  | "fs.list";

export type FsToolInput = {
  path: string;
  content?: string;
};

export type FsToolOutput = {
  success: boolean;
  data?: string;
  error?: string;
};

export type FsToolDefinition = {
  name: FsToolName;
  readOnly: boolean;
  maxSizeKB: number;
};
