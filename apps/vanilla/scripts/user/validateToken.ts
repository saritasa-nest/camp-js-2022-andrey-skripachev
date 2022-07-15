import { Api } from "../api/api";
import { ACCESS, REFRESH } from "../variables/constants/user";
import { isToken } from "./registration";

export async function isUserAuthorized(): Promise<boolean> {

  const access = localStorage.getItem('access');
  if (access !== null) {
    const isValidAccess = await Api.userApi.isValidAccess(access);
    if (isValidAccess) {
      return true;
    }
  }

  const refresh = localStorage.getItem('refresh');
  if (refresh !== null) {
    const result = await Api.userApi.refreshToken(refresh);
    if (isToken(result)) {
      const { access: newAccess, refresh: newRefresh } = result;

      localStorage.setItem(ACCESS, newAccess);
      localStorage.setItem(REFRESH, newRefresh);

      return true;
    }
  }

  return false;
}
