import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      httpApi: {
        method: "post",
        path: "/products",
        responses: {
          200: {
            description: "Returns created product",
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
