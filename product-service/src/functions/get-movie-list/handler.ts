import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import schema from "./schema";
import { HTTP_STATUS_CODES } from "@constants/http-status-codes";
import { Movies } from "src/model/movie";
import movieService from "@service/index";

const getMovieList: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async () => {
  try {
    const movies: Movies = await movieService.getMovies();
    return formatJSONResponse(movies, HTTP_STATUS_CODES.OK);
  } catch (e) {
    return formatJSONResponse(e, HTTP_STATUS_CODES.SERVER_ERROR);
  }
};

export const main = middyfy(getMovieList);
