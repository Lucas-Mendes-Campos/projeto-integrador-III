/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_RECAPTCHA_SITEKEY: string;
  readonly VITE_APP_API_BASEURL: string;
  readonly VITE_APP_VOTING_END?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
