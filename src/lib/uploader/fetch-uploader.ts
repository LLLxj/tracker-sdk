export const fetchUploader = (
  url: string,
  data: Record<string, any>,
  headers?: Record<string, any>,
) => {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(data),
  }).catch((err) => console.error('Upload error:', err));
};
