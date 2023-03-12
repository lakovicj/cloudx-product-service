import { Options } from "@middy/http-cors";

export const DEFAULT_CORS_CONFIG: Options = {
  origin: process.env.FRONTEND_APP_URL,
  methods: "OPTIONS,GET,POST,PUT,DELETE",
};
