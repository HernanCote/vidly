import http from './httpServices';

const apiEndpoint = '/users';

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.email,
    name: user.name,
    password: user.password
  });
}
