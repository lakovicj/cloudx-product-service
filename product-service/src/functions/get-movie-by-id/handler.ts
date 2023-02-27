import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import schema from "./schema";
import { HTTP_STATUS_CODES } from "@constants/http-status-codes";
import { Movie } from "../../model/movie";
import movieService from "@service/index";

const getMovieById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const { id: movieId } = event.pathParameters;
  try {
    const movie: Movie = await movieService.getMovieById(movieId);
    if (movie) {
      return formatJSONResponse(movie, HTTP_STATUS_CODES.OK);
    }
    return formatJSONResponse(null, HTTP_STATUS_CODES.NOT_FOUND);
  } catch (e) {
    return formatJSONResponse(e, HTTP_STATUS_CODES.SERVER_ERROR);
  }
};

export const main = middyfy(getMovieById);
