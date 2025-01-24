import { openDB } from 'idb';
import { TrackerEventTypeEnum } from '@/types/tracker-type'
import type { TrackerOptions } from "@/types/tracker"
import { getTime } from '@/utils/track-helper';

export interface OfflineLog {
  eventType: TrackerEventTypeEnum,
  pathname: string;
  clickDom: {
    tagName: string;
    id?: string, // ID
    className?: string, // 类名
    textContent?: string, // 文本内容
    html?: string;
  };
}

class OfflineLogManage {

  offlineLogManage;

  constructor() {
    this.offlineLogManage = openDB('BehaviorLogsDB', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('logs')) {
          db.createObjectStore('logs', { keyPath: 'key' });
        }
      },
    })
  }

  async save (
    trackerOptions: TrackerOptions,
    log: OfflineLog
  ) {
    if (!trackerOptions.enabledOfflineLog) {
      return;
    }
    const db = await this.offlineLogManage;
    const tx = db.transaction('logs', 'readwrite');
    const store = tx.objectStore('logs');
    await store.add({
      ...log,
      key: getTime(), // 添加时间戳
    });
    await tx.done;
    if (trackerOptions.debug) {
      console.log('Behavior Log saved:', log);
    }
  }
}

export const initDB = async () => {
  return openDB('BehaviorLogsDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('logs')) {
        db.createObjectStore('logs', { keyPath: 'key' });
      }
    },
  });
}

export default OfflineLogManage