import { Api } from "../api/api";
import { ACCESS, OK_MESSAGE, REFRESH } from "../variables/constants/user";
import { Authorization } from "../variables/interfaces/user";
import { isToken } from "./registration";

export async function authorizeUser(formData: FormData): Promise<string> {

  const authorization: Authorization = {
    email: String(formData.get('email')),
    password: String(formData.get('password')),
  }

  const result = await Api.userApi.authorizeUser(authorization);

  if (isToken(result)) {
    localStorage.setItem(ACCESS, result.access);
    localStorage.setItem(REFRESH, result.refresh);
    return OK_MESSAGE;
  }

  return 'Invalid email or password';
}
