import { TrackerEventTypeEnum, TrackErrorTypeEnum } from "./tracker-type"

export interface BaseReportData {
  eventType: TrackerEventTypeEnum;
  clientId: string;
  authorization: string;
  time: string;
  sessionId: string;
  title: string;
  url: string;
  pathname: string;
}

export interface FunctionListenerCallbackData {
  name: string;
  category: string;
}

export interface ReportErrorData {
  type: TrackErrorTypeEnum;
  message: string;
  columnNumber: number;
  fileName: string;
  functionName: string;
  lineNumber: number;
  source?: string;
  time: string;
  url: string;
  pathname: string;
  clientId: string;
  version: string;
  errorId: string;
}