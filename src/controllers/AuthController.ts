import {AuthAPI} from '../api/auth-api';
import {SignInData, SignUpData} from '../api/interfaces/auth-interfaces';
import {router} from '../services/Router';
import store from '../services/Store';
import ChatsController from './ChatsController';
import MessagesController from './MessagesController';

class AuthController {
  private api: AuthAPI;

  constructor() {
    this.api = new AuthAPI();
  }

  async signUp(data: SignUpData) {
    try {
      store.set('isUserLoading', true);
      await this.api.signUp(data).then((res: XMLHttpRequest) => {
        if (res.status === 200) {
          this.fetchUser();
          router.go('/messenger');
        }
      });
    } catch (e) {}
  }

  async signIn(data: SignInData) {
    try {
      store.set('isUserLoading', true);
      await this.api.signIn(data).then((res: XMLHttpRequest) => {
        if (res.status === 200) {
          this.fetchUser();
          ChatsController.getChats();
          router.go('/messenger');
        } else {
          console.log(res);
        }
      });
    } catch (e) {
      console.error(e);
    }
  }

  async logOut() {
    try {
      await this.api.logOut();
      store.set('user', {});
      store.set('chats', []);
      store.set('selectedChat', null);
      MessagesController.closeAll();
      router.go('/');
    } catch (e) {}
  }

  async fetchUser() {
    try {
      await this.api.getUser().then((res: any) => {
        if (res.status === 200) {
          store.set('user', res.response);
          store.set('isUserLoading', false);
        } else {
          router.go('/');
        }
      });
    } catch (e) {}
  }
}

export default new AuthController();
