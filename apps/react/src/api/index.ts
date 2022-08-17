import axios, { AxiosInstance } from 'axios';

import { CONFIG } from './config';
import { addAuthorizationTokenBeforeRequest } from './interceptors';

export const http: AxiosInstance = axios.create({
  baseURL: CONFIG.campApiUrl,
  headers: {
    'Api-Key': CONFIG.campApiKey,
  },
});

http.interceptors.request.use(addAuthorizationTokenBeforeRequest);
