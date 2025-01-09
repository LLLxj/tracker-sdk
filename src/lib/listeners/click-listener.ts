export const trackClicks = (callback: (data: Record<string, any>) => void) => {
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const data = {
      type: 'click',
      tagName: target.tagName,
      id: target.id,
      className: target.className,
      timestamp: Date.now(),
    };
    callback(data);
  });
};
