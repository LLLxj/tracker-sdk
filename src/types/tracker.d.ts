export interface TrackerConfig {
  name?: string;
  host: string;
  reportPath: string;
  reportPerformancePath?: string;
  reportErrorPath: string;
  reportUserActionPath: string;
  clientId: string;
  authorization: string | (() => string);
  debug: boolean;
  enabledGlobalPvEvent?: boolean;
  enabledGlobalClickEvent?: boolean;
  enabledBehaviorLog?: boolean;
  enabledOfflineLog?: boolean;
  hostBlockList?: string[];
  attributeNameKey?: string;
  attributeCategoryKey?: string;
  enabledBehaviorLogStackSize: number;
}

export interface TrackerOptions extends TrackerConfig {
  version: string;
}