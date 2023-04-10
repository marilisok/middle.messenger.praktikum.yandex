import {User} from '../api/interfaces/auth-interfaces';
import {PasswordRequest} from '../api/interfaces/profile-interfaces';
import {ProfileAPI} from '../api/profile-api';
import {router} from '../services/Router';
import store from '../services/Store';

class ProfileController {
  private api: ProfileAPI;

  constructor() {
    this.api = new ProfileAPI();
  }

  async changeUserProfile(data: User) {
    store.set('isUserLoading', true);
    const res = await this.api.changeUserProfile(data);
    if (res.status === 200) {
      store.set('user', res.response);
    } else {
      store.set('error', {status: res.status, reason: res.response.reason});
      router.go('/error');
    }
    store.set('isUserLoading', false);
  }

  async changeUserAvatar(data: FormData) {
    store.set('isUserLoading', true);
    const res = await this.api.changeUserAvatar(data);
    if (res.status === 200) {
      store.set('user', res.response);
    } else {
      store.set('error', {status: res.status, reason: res.response.reason});
      router.go('/error');
    }
    store.set('isUserLoading', false);
  }

  async changeUserPassword(data: PasswordRequest) {
    const res = await this.api.changeUserPassword(data);
    if (res.status !== 200) {
      store.set('error', {status: res.status, reason: res.response.reason});
      router.go('/error');
    }
  }

  async getUserById(id: number) {
    const res = await this.api.getUserById(id);
    if (res.status !== 200) {
      store.set('error', {status: res.status, reason: res.response.reason});
      router.go('/error');
    }
  }

  async searchUserByLogin(data: string) {
    return await this.api.searchUserByLogin(data);
  }
}
export default new ProfileController();
