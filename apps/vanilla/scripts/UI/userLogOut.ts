import { ACCESS, REFRESH } from "../variables/constants/user";

const buttonUserLogOut = document.querySelector('.log-out');

if (buttonUserLogOut === null) {
  throw new Error('Cannot find button for user log out');
}

buttonUserLogOut.addEventListener('click', () => {
  localStorage.removeItem(REFRESH);
  localStorage.removeItem(ACCESS);
});
