import { log } from "@/utils/log"
import type { TrackerOptions } from "@/types/tracker"
import { TrackerEventTypeNameEnum } from '@/types/tracker-type' 

export const pageUnloadListener = (
  trackerOptions: TrackerOptions,
  callback: (data: Record<string, any>) => void,
) => {
  if (!trackerOptions.enabledGlobalPvEvent) {
    return
  }
  const unloadEvent = trackerOptions.debug ? 'beforeunload' : 'unload';
  window.addEventListener(unloadEvent, () => {
    const data = {
      name: TrackerEventTypeNameEnum.pageClose,
      
    };
    if (trackerOptions.debug) {
      log({
        level: 'success',
        message: `unload: ${JSON.stringify(data)}`,
      });
    }
      
    callback(data);
  });
}