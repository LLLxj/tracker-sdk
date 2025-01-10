import type { TrackerOptions, FunctionListenerCallbackData } from "@/types/index"

export const functionListener = (
  options: TrackerOptions,
  callback: (data: FunctionListenerCallbackData) => void
) => {
  console.log(options)
  if (!options.enabledGlobalClickEvent) {
    return;
  }

  const invalidateElementTypes = ['HTML', 'BODY']

  const findTrackCategoryElement = (
    event: MouseEvent, attributeKey: string
  ): string | null | undefined => {
    let currentElement: HTMLElement | null = event.target as HTMLElement;
    const trackCategory = currentElement
      .closest(`[${attributeKey}]`)
      ?.getAttribute(attributeKey);
    return trackCategory
  }

  const findTrackNameElement = (
    event: MouseEvent, attributeKey: string
  ): string | null | undefined => {
    let currentElement: HTMLElement | null = event.target as HTMLElement;
    const trackName = currentElement
      .closest(`[${attributeKey}]`)
      ?.getAttribute(attributeKey);
    return trackName
  }


  document.addEventListener('click', (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const $elementType = target.tagName;
    if (invalidateElementTypes?.includes($elementType)) {
      return;
    }
    const attributeNameKey = options.attributeNameKey || '';
    const attributeCategoryKey = options.attributeCategoryKey || '';
    let name;
    let category;
    if (attributeNameKey) {
      name = findTrackNameElement(event, attributeNameKey)
    }
    if (attributeCategoryKey) {
      category = findTrackCategoryElement(event, attributeCategoryKey)
    }
    
    if (name && category) {
      const data: FunctionListenerCallbackData = {
        category,
        name,
      };
      console.log(data)
      callback(data);
    }
  });
};