import { log } from "./log";
import {
  pageOnloadListener,
  pageUnloadListener,
  routeChangeListener,
  mixinUploader,
  functionListener,
  clickListener,
} from '@/lib/index'
import {
  getTime,
  getSessionId,
  getURL,
} from '@/utils/index'
import type {
  TrackerOptions,
  FunctionListenerCallbackData
} from '@/types/index'
import OfflineLogManage from "@/lib/log/offline-log";
import type { OfflineLog } from "@/lib/log/offline-log";
import { TrackerEventTypeEnum } from '@/types/trackerEventType'
import BehaviorLogManage from "@/lib/log/behavior-log";
import type { BehaviorLog } from "@/lib/log/behavior-log";

class Tracker {

  public options: TrackerOptions;
  public offlineLogManage;
  public behaviorLogManage;

  constructor(trackerOptions: TrackerOptions) {
    const defaultOptions = {
      name: 'tracker',
      debug: false,
      enabledGlobalPvEvent: true,
      enabledBehaviorLog: true,
      attributeNameKey: 'tracker-name',
      attributeCategoryKey: 'tracker-category',
      enabledBehaviorLogStackSize: 3
    }
    this.options = { ...defaultOptions, ...trackerOptions };
    log({
      level: 'info',
      message: `${this.options.name}实例化成功`
    })
    this.initEvent();
    this.offlineLogManage = new OfflineLogManage()
    this.behaviorLogManage = new BehaviorLogManage(
      this.options,
      'behavior_log',
      this.options.enabledBehaviorLogStackSize,
    )
  }

  initEvent() {
    pageOnloadListener(this.options, () => {
      this.track(TrackerEventTypeEnum.pageOpen);
    });
    pageUnloadListener(this.options, () => {
      this.track(TrackerEventTypeEnum.pageClose);
    });
    routeChangeListener(this.options, () => {
      this.track(TrackerEventTypeEnum.pageView);
    });
    functionListener(this.options, (data: FunctionListenerCallbackData) => {
      this.track(TrackerEventTypeEnum.click, data);
    });
    clickListener(
      this.options,
      (data: BehaviorLog) => {
        this.behaviorLogManage.add(data)
      },
      (data: OfflineLog) => {
        this.offlineLogManage.save(this.options, data)
      }
    )
  }

  track(trackEventType: TrackerEventTypeEnum, data?: Record<string, any>) {
    const reportData = {
      version: '1.0.0',
      eventType: trackEventType,
      clientId: this.options.clientId,
      authorization: this.options.authorization,
      time: getTime(), // 时间戳
      sessionId: getSessionId(),
      title: document.title,
      url: getURL(),
      pathname: location.pathname,
      ...data
    }
    const reportRequestUrl = `${this.options.host}${this.options.reportPath}`
    mixinUploader(reportRequestUrl, reportData)
  }
}

export default Tracker