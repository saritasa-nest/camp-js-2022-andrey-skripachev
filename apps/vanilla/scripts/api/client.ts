import axios from 'axios';

const { VITE_API_KEY: apiKey, VITE_API_URL: baseUrl } = import.meta.env;

export const httpClient = axios.create({
  baseURL: baseUrl,
  headers: {
    'accept': 'application/json',
    'Api-Key': apiKey,
  },
});
