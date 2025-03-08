declare namespace NodeJS {
  export interface ProcessEnv {
    LETTA_ACCESS_TOKEN?: string
    LETTA_SERVER_URL: string
    USE_COOKIE_BASED_AUTHENTICATION: string
    NEXT_PUBLIC_CREATE_AGENTS_FROM_UI: string
  }
}
