import { TrackerEventTypeEnum, TrackerOptions } from "@/types";
import { fetchUploader } from '@/lib/uploader'
import { getTime } from '@/utils'

export interface BehaviorLog {
  eventType: TrackerEventTypeEnum,
  time?: string;
  pathname: string;
  clickDom: string;
}


class BehaviorLogManage {

  stackSize: number;
  key: string;
  stack: BehaviorLog[]
  trackerOptions: TrackerOptions;

  constructor(
    trackerOptions: TrackerOptions,
    behavoirLogKey = 'behavior_log',
    initStackSize = 10
  ) {
    this.stackSize = initStackSize; // 堆栈限制
    this.key = behavoirLogKey; // localStorage 键名
    this.stack = this.loadLogs() || []; // 初始化堆栈
    this.trackerOptions = trackerOptions;
    this.initLog()
  }

  initLog() {
    this.save()
  }

  loadLogs() {
    const stackInfos = localStorage.getItem(this.key);
    return stackInfos ? JSON.parse(stackInfos).stacks : [];
  }

  // 保存日志堆栈
  save() {
    localStorage.setItem(this.key, JSON.stringify({
      stacks: this.stack
    }));
  }

  // 添加日志
  async add(log: BehaviorLog) {
    const timestamp = getTime();
    const newLog = { ...log, time: timestamp };

    // 添加到堆栈
    this.stack.push(newLog);

    if (
      this.stack.length > this.stackSize ||
      this.stack.some((item) => item.eventType === 'error')
    ) {
      await this.sendLogsToServer(this.stack);
      this.stack = [];
    }
    this.save();
  }

  clearLogs() {
    this.stack = [];
    this.save();
  }

  async sendLogsToServer(actions: BehaviorLog[]) {
    try {
      // 示例请求：向后端发送日志数据
      const requestUrl = `${this.trackerOptions.host}${this.trackerOptions.reportUserActionPath}`
      await fetchUploader(
        requestUrl,
        { actions },
        {
          Authorization: this.trackerOptions.authorization,
        }
      );
      console.log('Logs sent successfully');
    } catch (error) {
      console.error('Failed to send logs', error);
    }
  }
}
export default BehaviorLogManage