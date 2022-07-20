import { TOP_OF_PAGE } from '../variables/constants/global';

const buttonMoveTop = document.querySelector<HTMLButtonElement>('.top-moving-button');

if (buttonMoveTop === null) {
  throw new Error('Button for moving on page is null');
}

buttonMoveTop.onclick = () => {
  window.scrollTo({
    top: TOP_OF_PAGE,
    behavior: 'smooth',
  });
};
