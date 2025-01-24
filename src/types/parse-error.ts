export interface ErrorInfo {
  columnNumber: number;
  fileName: string;
  functionName: string;
  lineNumber: number;
  source?: string;
}