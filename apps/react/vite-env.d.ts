// eslint-disable-next-line spaced-comment
/// <reference types="vite/client" />

interface ImportMetaEnv {

  /** Camp Api base url. */
  readonly VITE_CAMP_API_BASE_URL: string;

  /** Camp Api key. */
  readonly VITE_CAMP_API_KEY: string;
}

interface ImportMeta {

  /** Contains application environment data. */
  readonly env: ImportMetaEnv;
}
