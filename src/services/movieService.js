import http from "./httpServices";
import { apiUrl } from "../config.json";

export function getMovies() {
  return http.get(`${apiUrl}/movies/`);
}

export function getMovie(id) {
  return http.get(`${apiUrl}/movies/${id}`);
}

export function deleteMovie(movieId) {
  http.delete(`${apiUrl}/movies/${movieId}`);
}
