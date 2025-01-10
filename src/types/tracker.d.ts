export interface TrackerOptions {
  name?: string;
  host: string;
  reportPath: string;
  reportPerformancePath?: string;
  clientId: string;
  authorization: string | (() => string);
  debug?: boolean;
  enabledGlobalPvEvent?: boolean;
  enabledGlobalClickEvent?: boolean;
  hostBlockList?: string[];
  attributeNameKey?: string;
  attributeCategoryKey?: string;
}