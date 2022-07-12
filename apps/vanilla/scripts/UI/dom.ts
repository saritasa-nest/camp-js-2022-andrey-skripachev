import { DISABLED, FormElements, HIDDEN } from '../variables/constants';

/**
 * Inserts text into an element.
 * @param element Element for inserting text.
 * @param text Text.
 */
export function insertUnicodeText(element: HTMLElement, text: string): void {
  const temporary = document.createElement('div');
  temporary.innerHTML = text;

  element.innerText = temporary.innerText;
}

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
export function createNode<Type extends HTMLElement>(tagName: string, textContent: string, classes: string): Type {
  const newElement = document.createElement(tagName);
  newElement.className = classes;
  newElement.textContent = textContent;
  return <Type>newElement;
}

/**
 * Locks or unlocks the button.
 * @param condition Button lock condition.
 * @param button Button.
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

/**
 * Hides the error message in the form.
 * @param form Form element.
 */
export function hideFormErrorMessage(form: HTMLFormElement): void {
  const errorBlock = form.querySelector<HTMLDivElement>(FormElements.error);

  if (errorBlock === null) {
    return;
  }

  if (!errorBlock.classList.contains(HIDDEN)) {
    errorBlock.classList.add(HIDDEN);
  }

  errorBlock.textContent = '';
}

/**
 * Outputs an error in the form.
 * @param form Form element.
 * @param text Text content of the error.
 */
export function printFormErrorMessage(form: HTMLFormElement, text: string): void {
  const errorBlock = form.querySelector<HTMLDivElement>(FormElements.error);

  if (errorBlock === null) {
    return;
  }

  if (errorBlock.classList.contains(HIDDEN)) {
    errorBlock.classList.remove(HIDDEN);
  }

  insertUnicodeText(errorBlock, text);
}
