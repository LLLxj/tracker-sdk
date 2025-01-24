import type { TrackerOptions } from "@/types/tracker"
import type { OfflineLog } from '@/lib/index'
import { TrackerEventTypeEnum } from '@/types/tracker-type'
import { BehaviorLog } from "../log/behavior-log";

export const clickListener = (
  trackerOptions: TrackerOptions,
  behaviorLogCallback: (Record: BehaviorLog) => void,
  offlineLogCallback: (Record: OfflineLog) => void,
) => {
  if (!trackerOptions.enabledGlobalClickEvent) {
    return;
  }

  document.addEventListener('click', (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const offlineLog = {
      title: document.title,
      pathname: location.pathname,
      eventType: TrackerEventTypeEnum.click,
      clickDom: {
        tagName: target.tagName,
        id: target.id,
        className: target.className,
        textContent: target.textContent?.trim(),
        html: target.outerHTML.slice(0, 500),
      },
    }
    const behaviorLog = {
      eventType: TrackerEventTypeEnum.click,
      pathname: location.pathname,
      clickDom: target.outerHTML.slice(0, 500),
    }
    behaviorLogCallback(behaviorLog)
    offlineLogCallback(offlineLog);
  });

};