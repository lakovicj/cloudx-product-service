import middy from "@middy/core";
import middyJsonBodyParser from "@middy/http-json-body-parser";
import cors from "@middy/http-cors";
import { DEFAULT_CORS_CONFIG } from "@constants/default-cors-config";

export const middyfy = (handler) => {
  return middy(handler)
    .use(middyJsonBodyParser())
    .use(cors(DEFAULT_CORS_CONFIG));
};
