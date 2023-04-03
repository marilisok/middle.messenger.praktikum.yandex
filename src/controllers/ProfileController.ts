import {User} from '../api/interfaces/auth-interfaces';
import {PasswordRequest} from '../api/interfaces/profile-interfaces';
import {ProfileAPI} from '../api/profile-api';
import store from '../services/Store';

class ProfileController {
  private api: ProfileAPI;

  constructor() {
    this.api = new ProfileAPI();
  }

  async changeUserProfile(data: User) {
    store.set('isUserLoading', true);
    await this.api.changeUserProfile(data).then((res: XMLHttpRequest) => {
      if (res.status === 200) {
        store.set('user', res.response);
        store.set('isUserLoading', false);
      }
    });
  }

  async changeUserAvatar(data: FormData) {
    store.set('isUserLoading', true);
    await this.api.changeUserAvatar(data).then((res: XMLHttpRequest) => {
      if (res.status === 200) {
        store.set('user', res.response);
        store.set('isUserLoading', false);
      }
    });
  }

  async changeUserPassword(data: PasswordRequest) {
    await this.api.changeUserPassword(data);
  }

  async getUserById(id: number) {
    await this.api.getUserById(id);
  }

  async searchUserByLogin(data: string) {
    return await this.api.searchUserByLogin(data);
  }
}
export default new ProfileController();
