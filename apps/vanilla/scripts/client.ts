import axios from 'axios';

const { VITE_API_KEY: apiKey, VITE_API_URL: baseUrl } = import.meta.env;

const client = axios.create({
  baseURL: baseUrl,
  headers: {
    'accept': 'application/json',
    'Api-Key': apiKey,
  },
});

export default client;
