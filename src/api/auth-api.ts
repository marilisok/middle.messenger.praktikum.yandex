import {BaseAPI} from './base-api';
import {SignInData, SignUpData} from './interfaces/auth-interfaces';

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

  getUser() {
    return this.http.get('/user');
  }
}
