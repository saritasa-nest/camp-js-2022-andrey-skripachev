import { AxiosRequestConfig } from 'axios';

import { CONFIG } from './config';
import { TokenService } from './services/token';

/**
 * Checks if a request should be intercepted.
 * @param config Request config.
 */
function shouldInterceptToken(config: AxiosRequestConfig): boolean {
  return (config.baseURL?.startsWith(CONFIG.campApiUrl) ?? false);
}

/**
 *  Appends authorization token to request.
 * @param config Request config.
 */
export function addAuthorizationTokenBeforeRequest(config: AxiosRequestConfig): AxiosRequestConfig {

  const token = TokenService.getToken();

  if (!shouldInterceptToken(config) || token === null) {
    return config;
  }

  // const isTokenValid = await AuthService.verifyToken(token);

  // console.log('Intercept');

  // if (!isTokenValid) {
  //   try {
  //     token = await AuthService.refreshToken(token);

  //     TokenService.saveToken(token);
  //   } catch {
  //     return config;
  //   }
  // }

  const { headers } = config;

  if (headers === undefined) {
    throw new Error(
      'Axios did not pass any header. Please check your request.',
    );
  }

  return {
    ...config,
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  };
}
