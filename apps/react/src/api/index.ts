import { isErrorResponse } from '@js-camp/core/guards/error';
import { ErrorResponseMapper } from '@js-camp/core/mappers/error-response.mapper';
import { AppError } from '@js-camp/core/models/error-response';
import axios, { AxiosInstance } from 'axios';

import { CONFIG } from './config';
import { addAuthorizationTokenBeforeRequest } from './interceptors';

export const http: AxiosInstance = axios.create({
  baseURL: CONFIG.campApiUrl,
  headers: {
    'Api-Key': CONFIG.campApiKey,
  },
});

/**
 * Creates new error.
 * @param error Error response.
 * @param errorMapper Error mapper.
 */
export function createError<ErrorDto, Error>(
  error: unknown,
  errorMapper: (dto: ErrorDto) => Error,
): AppError<Error> | null {
  if (axios.isAxiosError(error)) {
    const errorResponse = error.response;

    if (errorResponse && isErrorResponse<ErrorDto>(errorResponse.data)) {
      const errorResponseMessages = errorResponse.data;

      return ErrorResponseMapper.fromDto(errorResponseMessages, errorMapper);
    }
  }

  return null;
}

http.interceptors.request.use(addAuthorizationTokenBeforeRequest);
