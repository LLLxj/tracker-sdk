import { log } from "@/utils/log"
import type { TrackerOptions } from "@/types/tracker"
import { TrackerEventTypeNameEnum } from '@/types/trackerEventType' 

export const pageUnloadListener = (
  trackerOptions: TrackerOptions,
  callback: (data: Record<string, any>) => void,
) => {
  if (!trackerOptions.openGlobalPvEvent) {
    return
  }
  const unloadEvent = trackerOptions.debug ? 'beforeunload' : 'unload';
  window.addEventListener(unloadEvent, () => {
    const data = {
      name: TrackerEventTypeNameEnum.pageClose,
      
    };
    trackerOptions.debug &&
      log({
        level: 'success',
        message: `unload: ${JSON.stringify(data)}`,
      });
    callback(data);
  });
}