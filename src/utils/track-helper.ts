import lodash from 'lodash'

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

export const getTimestamp = () => {
  return Date.now()
}

export const getIsoTime = () => {
  return new Date().toISOString()
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