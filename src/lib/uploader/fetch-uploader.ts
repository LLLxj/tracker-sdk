export const fetchUploader = (data: Record<string, any>, url: string) => {
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).catch((err) => console.error('Upload error:', err));
};
