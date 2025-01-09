import { log } from "@/utils/index"
import type { TrackerOptions } from "@/types/tracker"
import { TrackerEventTypeNameEnum } from '@/types/trackerEventType' 

export const pageOnloadListener = (
  trackerOptions: TrackerOptions,
  callback: (data: Record<string, any>) => void,
) => {
  if (!trackerOptions.openGlobalPvEvent) {
    return
  }
  window.addEventListener('load', () => {
    const data = {
      name: TrackerEventTypeNameEnum.pageOpen,
    };
    trackerOptions.debug &&
      log({
        level: 'success',
        message: `load: ${JSON.stringify(data)}`,
      });
    callback(data);
  });
}