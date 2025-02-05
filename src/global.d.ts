/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "local" | "development" | "production" | "staging";
    readonly PUBLIC_URL: string;
  }
}
