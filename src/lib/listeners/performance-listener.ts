import type { TrackerOptions } from "@/types/index";
import { TrackerEventTypeEnum } from '@/types/trackerEventType'
import { log } from "@/utils/log";

export const performanceListener = (
  trackerOptions: TrackerOptions,
  callback: (data: Record<string, any>) => void,
) => {
  if (!trackerOptions.reportPerformancePath) {
    return;
  }
  window.addEventListener('load', () => {
   
    const [ navigationEntry ] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    if (navigationEntry) {
      const data = {
        type: TrackerEventTypeEnum.performance,
        loadTime: navigationEntry.loadEventEnd - navigationEntry.startTime,
        domContentLoaded: navigationEntry.domContentLoadedEventEnd - navigationEntry.startTime,
        timestamp: Date.now(),
      };
      callback(data);
    } else {
      log({
        level: 'warnning',
        message: 'PerformanceNavigationTiming is not supported in this browser.'
      })
    }
  });
};
