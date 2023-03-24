import {User} from '../api/interfaces/auth-interfaces';
import {PasswordRequest} from '../api/interfaces/profile-interfaces';
import {ProfileAPI} from '../api/profile-api';

class ProfileController {
  private api: ProfileAPI;

  constructor() {
    this.api = new ProfileAPI();
  }

  async changeUserProfile(data: User) {
    await this.api.changeUserProfile(data);
  }

  async changeUserAvatar() {

  }

  async changeUserPassword(data: PasswordRequest) {
    await this.api.changeUserPassword(data);
  }

  async getUserById(id: number) {
    await this.api.getUserById(id);
  }

  async searchUserByLogin(data: string) {
    await this.api.searchUserByLogin(data);
  }
}
export default new ProfileController();
