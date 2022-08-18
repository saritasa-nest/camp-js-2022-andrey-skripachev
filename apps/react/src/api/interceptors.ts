import { AxiosRequestConfig } from 'axios';

import { CONFIG } from './config';
import { AuthService } from './services/authApi';
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
      Authorization: `Bearer ${token.access}`,
    },
  };
}

/**
 * Checks if need to refresh token for current request.
 * @param config Request config.
 */
function shouldCheckToken(config: AxiosRequestConfig): boolean {
  const isAuthRequest = config.url?.startsWith('auth') ?? false;

  return !isAuthRequest;
}

/**
 * Checks token is valid.
 * @param config Request config.
 */
export async function checkTokenValidity(config: AxiosRequestConfig): Promise<AxiosRequestConfig> {
  let token = TokenService.getToken();

  if (token === null || !shouldCheckToken(config)) {
    return config;
  }

  const isTokenValid = await AuthService.verifyToken(token);

  if (!isTokenValid) {
    try {
      token = await AuthService.refreshToken(token);

      TokenService.saveToken(token);
    } catch {
      TokenService.deleteToken();
    }
  }

  return config;
}
