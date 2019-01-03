import http from './httpServices';

export function getMovies() {
  return http.get(`/movies/`);
}

export function getMovie(id) {
  return http.get(`/movies/${id}`);
}

export function deleteMovie(movieId) {
  http.delete(`/movies/${movieId}`);
}

export async function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(`/movies/${movie._id}`, body);
  }

  return http.post(`/movies`, movie);
}
