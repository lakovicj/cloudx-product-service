import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      httpApi: {
        method: "get",
        path: "/movies/{id}",
        responses: {
          200: {
            description: "Returns a single movie with provided ID",
            bodyType: "Movie",
          },
          404: {
            description: "Movie not found",
          },
          500: {
            description: "Server error",
          },
        },
      },
    },
  ],
};
