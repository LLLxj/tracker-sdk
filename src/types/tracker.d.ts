export interface TrackerOptions {
  name?: string;
  host: string;
  reportPath: string;
  reportPerformancePath?: string;
  clientId: string;
  authorization: string | (() => string);
  debug?: boolean;
  openGlobalPvEvent?: boolean;
  hostBlockList?: string[];
}