import { log } from "@/utils";

export const beaconUploader = (url: string, data: Record<string, any>) => {
  if (!navigator.sendBeacon) {
    log({
      level: 'warnning',
      message: '当前浏览器不支持sendBeacon'
    })
    return;
  }
  navigator.sendBeacon(url, JSON.stringify(data));
}