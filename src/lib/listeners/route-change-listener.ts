/**
 * 添加单页面路由页面监听
 * 兼容React、Vue的hash和history路由模式
 */
import type { TrackerOptions } from "@/types/tracker"
import lodash from 'lodash'

export const routeChangeListener = (
  options: TrackerOptions,
  callback: ({ url }: { url: string }) => void
) => {
  if (!options.openGlobalPvEvent) {
    return;
  };

  let recentlyUrl = location.href;

  const { pushState, replaceState } = window.history;

  if (lodash.isFunction(pushState)) {
    window.history.pushState = function (...args) {
      pushState.apply(window.history, args);
      callback({
        url: recentlyUrl
      });
      recentlyUrl = location.href;
    };
  }

  if (lodash.isFunction(replaceState)) {
    window.history.replaceState = function (...args) {
      replaceState.apply(window.history, args);
      callback({
        url: recentlyUrl
      });
      recentlyUrl = location.href;
    };
  }

  // 确定适当的事件类型
  // @ts-ignore
  const singlePageEvent = window.document.documentMode
    ? 'hashchange'
    : 'popstate';

  // 监听 popstate 或 hashchange 事件
  window.addEventListener(singlePageEvent, function () {
    callback({
      url: recentlyUrl
    });
    recentlyUrl = location.href;
  });
}