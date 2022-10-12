export default function authHeader() {

    //If there is a logged in user with accessToken (JWT), return HTTP Authorization header. Otherwise, return an empty object.
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.accessToken) {
        return { 'x-access-token': user.accessToken };
    } else {
      return {};
    }
  }