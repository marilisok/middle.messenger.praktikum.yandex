import {BaseAPI} from './base-api';
import {SignInData, SignUpData, User} from './interfaces/auth-interfaces';

export class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  signUp(data: SignUpData) {
    return this.http.post('/signup', {data});
  }

  signIn(data: SignInData) {
    return this.http.post('/signin', {data});
  }

  logOut() {
    return this.http.post('/logout');
  }

  getUser(): Promise<User> {
    return this.http.get('/user');
  }
}
