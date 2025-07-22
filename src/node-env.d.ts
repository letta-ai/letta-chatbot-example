declare namespace NodeJS {
  export interface ProcessEnv {
    LETTA_API_KEY?: string
    LETTA_BASE_URL: string
    USE_COOKIE_BASED_AUTHENTICATION: string
    NEXT_PUBLIC_CREATE_AGENTS_FROM_UI: string
  }
}
