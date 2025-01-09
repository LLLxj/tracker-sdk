import lodash from 'lodash'
import { v4 } from 'uuid';

export const padZero = (num: number) => {
  return num < 10 ? `0${num}` : num;
}

export const getTime = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return `${year}-${padZero(month)}-${padZero(day)} ${padZero(hour)}:${padZero(
    minute
  )}:${padZero(second)}`;
}

export const _decodeURI = (uri: string) => {
  let result = uri;
  try {
    result = decodeURI(uri);
  } catch (e) {
    result = uri;
  }
  return result;
}

export const getURL = (url?: string) => {
  if (lodash.isString(url)) {
    url = lodash.trim(url);
    return _decodeURI(url);
  } else {
    return _decodeURI(window.location.href);
  }
}

export const getSessionId = (): string => {
  const key = 'track_session_id';
  const sessionId = sessionStorage.getItem(key);
  if (sessionId) {
    return sessionId;
  }

  const newSessionId = v4();
  sessionStorage.setItem(key, newSessionId);
  return newSessionId;
}