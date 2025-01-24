import type { LogEvent } from '../types/index';
import { getTime } from './track-helper';

export const log = (event: LogEvent) =>  {
  const { level = 'success', message } = event;
  console.log(
    `%c[${getTime()}][tracker] ${message}`,
    `color: ${
      { error: 'red', success: 'green', info: 'skyblue', warnning: 'yellow' }[
        level
      ]
    }`
  );
}

