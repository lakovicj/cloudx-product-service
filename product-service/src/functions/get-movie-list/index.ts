import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      httpApi: {
        method: "get",
        path: "/movies",
        responses: {
          200: {
            description: "Returns list of movies",
            bodyType: "Movies",
          },
          500: {
            description: "Server error",
          },
        },
      },
    },
  ],
};
