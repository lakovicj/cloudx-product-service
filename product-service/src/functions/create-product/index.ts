import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      httpApi: {
        method: "put",
        path: "/products",
        responseData: {
          200: {
            description: "Returns upserted product",
            bodyType: "Product",
          },
          400: {
            description: "Bad request - invalid data",
          },
          500: {
            description: "Server error",
          },
        },
      },
    },
  ],
};
