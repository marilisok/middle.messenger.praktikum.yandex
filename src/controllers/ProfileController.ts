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
    try {
      store.set('isUserLoading', true);
      const res = await this.api.changeUserProfile(data);
      if (res.status === 200) {
        store.set('user', res.response);
      } else {
        store.set('error', {status: res.status, reason: res.response.reason});
        router.go('/error');
      }
    } catch (e: any) {
      store.set('error', {reason: e?.reason});
    } finally {
      store.set('isUserLoading', false);
    }
  }

  async changeUserAvatar(data: FormData) {
    try {
      store.set('isUserLoading', true);
      const res = await this.api.changeUserAvatar(data);
      if (res.status === 200) {
        store.set('user', res.response);
      } else {
        store.set('error', {status: res.status, reason: res.response.reason});
        router.go('/error');
      }
    } catch (e: any) {
      store.set('error', {reason: e?.reason});
    } finally {
      store.set('isUserLoading', false);
    }
  }

  async changeUserPassword(data: PasswordRequest) {
    try {
      const res = await this.api.changeUserPassword(data);
      if (res.status !== 200) {
        store.set('error', {status: res.status, reason: res.response.reason});
        router.go('/error');
      }
    } catch (e: any) {
      store.set('error', {reason: e?.reason});
    }
  }

  async getUserById(id: number) {
    try {
      const res = await this.api.getUserById(id);
      if (res.status !== 200) {
        store.set('error', {status: res.status, reason: res.response.reason});
        router.go('/error');
      }
    } catch (e: any) {
      store.set('error', {reason: e?.reason});
    }
  }

  async searchUserByLogin(data: string) {
    let user;
    try {
      user = await this.api.searchUserByLogin(data);
    } catch (e: any) {
      store.set('error', {reason: e?.reason});
    }
    return user;
  }
}
export default new ProfileController();
