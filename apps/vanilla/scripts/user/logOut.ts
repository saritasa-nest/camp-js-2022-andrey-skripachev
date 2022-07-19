import { ACCESS, REFRESH } from "../variables/constants/user";

/** Deletes access and refresh tokens from the storage. */
export function logOut(): void {
  localStorage.removeItem(ACCESS);
  localStorage.removeItem(REFRESH);
}
