declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production";
    SPOTIFY_CLIENT_ID: string;
    SPOTIFY_CLIENT_SECRET: string;
    SPOTIFY_REDIRECT_URI: string;
    MONGO_URI: string;
    JWT_SECRET: string;
  }
}
