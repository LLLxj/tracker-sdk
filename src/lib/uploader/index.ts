export const mixinUploader = (url: string, data: Record<string, any>) => {
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, JSON.stringify(data));
  } else {
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).catch((err) => console.error('Upload error:', err));
  }
};

export * from './beacon-uploader'
export * from './fetch-uploader'