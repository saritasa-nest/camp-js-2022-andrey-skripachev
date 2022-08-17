/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';

import eslintPlugin from '@nabla/vite-plugin-eslint';

import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [eslintPlugin({ eslintOptions: { cache: false } })],
  resolve: {
    alias: {
      '@js-camp/react/store': path.resolve(__dirname, 'src/store'),
      '@js-camp': path.resolve(__dirname, '../../libs'),
    },
  },
});
