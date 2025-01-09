import { TrackerEventTypeEnum } from "./trackerEventType"

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