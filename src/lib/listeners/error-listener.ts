import { getTime } from "@/utils";

export const errorListener = (
  callback: (data: Record<string, any>) => void
) => {
  window.addEventListener('error', (event) => {
    const data = {
      type: 'error',
      message: event.message,
      source: event.filename,
      line: event.lineno,
      column: event.colno,
      timestamp: getTime(),
    };
    callback(data);
  });

  window.addEventListener('unhandledrejection', (event) => {
    const data = {
      type: 'promise_error',
      message: event.reason,
      timestamp: getTime(),
    };
    callback(data);
  });
};
