const DISABLED = 'disabled';

/**
 * Deletes the class from the elements.
 * @param elements Elements to delete a class.
 * @param className The name of the class to be deleted.
 */
export function removeClassFromElements(elements: NodeListOf<HTMLElement>, className: string): void {
  elements.forEach(element => {
    if (element.classList.contains(className)) {
      element.classList.remove(className);
    }
  });
}

/**
 * Creates a new HTML element with classes and text content.
 * @param tagName HTML element name.
 * @param textContent The text content of the HTML element.
 * @param classes A list of class names that the element will have.
 * @returns New HTML element.
 */
export function createNode<T extends keyof HTMLElementTagNameMap>(
  tagName: T,
  textContent: string,
  classes?: string[],
): HTMLElementTagNameMap[T] {
  const newElement = document.createElement<T>(tagName);
  if (classes !== undefined) {
    newElement.classList.add(...classes);
  }
  newElement.textContent = textContent;
  return newElement;
}

/**
 * Disables or enables the button.
 * @param isDisabled Button disabling condition.
 * @param button Button for locking/unlocking.
 */
export function toggleDisabledState(isDisabled: boolean, button: HTMLButtonElement): void {
  if (isDisabled && !button.hasAttribute(DISABLED)) {
    button.setAttribute(DISABLED, DISABLED);
    button.classList.add(DISABLED);
  } else if (button.hasAttribute(DISABLED)) {
    button.removeAttribute(DISABLED);
    button.classList.remove(DISABLED);
  }
}
