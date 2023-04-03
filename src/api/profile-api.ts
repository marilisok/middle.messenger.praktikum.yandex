import {BaseAPI} from './base-api';
import {User} from './interfaces/auth-interfaces';
import {PasswordRequest} from './interfaces/profile-interfaces';

export class ProfileAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  changeUserProfile(data: User) {
    return this.http.put('/profile', {data});
  }

  changeUserAvatar(data: FormData) {
    return this.http.put('/profile/avatar', {data});
  }

  changeUserPassword(data: PasswordRequest) {
    return this.http.put('/password', {data});
  }

  getUserById(id: number) {
    return this.http.get(`${id}`);
  }

  searchUserByLogin(login: string) {
    return this.http.post('/search', {data: {login}});
  }
}
