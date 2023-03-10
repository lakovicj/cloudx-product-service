import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      httpApi: {
        method: "get",
        path: "/products/{id}",
        responseData: {
          200: {
            description: "Returns a single product with provided ID",
            bodyType: "Product",
          },
          404: {
            description: "Product not found",
          },
          500: {
            description: "Server error",
          },
        },
      },
    },
  ],
};
