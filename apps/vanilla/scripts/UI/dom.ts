import { DISABLED } from '../variables/constants/pagination';

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
 * @param classes Classes that the element will have.
 * @returns New HTML element.
 */
export function createNode<T extends keyof HTMLElementTagNameMap>(
  tagName: T,
  textContent: string,
  classes: string,
): HTMLElementTagNameMap[T] {
  const newElement = document.createElement<typeof tagName>(tagName);
  newElement.className = classes;
  newElement.textContent = textContent;
  return newElement;
}

/**
 * Locks or unlocks the button.
 * @param condition Button lock condition.
 * @param button Button for locking/unlocking.
 */
export function changeDisabled(condition: boolean, button: HTMLButtonElement): void {
  if (condition) {
    button.setAttribute(DISABLED, DISABLED);
    button.classList.add(DISABLED);
  } else {
    button.removeAttribute(DISABLED);
    button.classList.remove(DISABLED);
  }
}
