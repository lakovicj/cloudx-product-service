import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      httpApi: {
        method: "get",
        path: "/products",
        responses: {
          200: {
            description: "Returns list of products",
            bodyType: "Products",
          },
          500: {
            description: "Server error",
          },
        },
      },
    },
  ],
};
