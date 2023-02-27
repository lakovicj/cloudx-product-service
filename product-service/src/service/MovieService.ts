import { Movie, Movies } from "src/model/movie";
import movies from "@mocks/movies.json";

export default class MovieService {
  constructor() {}

  async getMovies(): Promise<Movies> {
    return new Promise<Movies>((resolve) => {
      resolve(movies);
    });
  }

  async getMovieById(id: string): Promise<Movie> {
    return new Promise<Movie>((resolve) => {
      resolve(movies.find((movie: Movie) => movie.id === id));
    });
  }
}
