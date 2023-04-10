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
    store.set('isUserLoading', true);
    const res = await this.api.signUp(data);
    if (res.status === 200) {
      this.fetchUser();
      router.go('/messenger');
    } else {
      store.set('error', {status: res.status, reason: res.response.reason});
      store.set('isUserLoading', false);
      router.go('/error');
    }
  }

  async signIn(data: SignInData) {
    store.set('isUserLoading', true);
    const res = await this.api.signIn(data);
    if (res.status === 200) {
      this.fetchUser();
      ChatsController.getChats();
      router.go('/messenger');
    } else {
      store.set('error', {status: res.status, reason: res.response.reason});
      store.set('isUserLoading', false);
      router.go('/error');
    }
  }

  async logOut() {
    const res = await this.api.logOut();
    if (res.status === 200) {
      store.set('user', {});
      store.set('chats', []);
      store.set('selectedChat', null);
      MessagesController.closeAll();
      router.go('/');
    } else {
      store.set('error', {status: res.status, reason: res.response.reason});
      router.go('/error');
    }
  }

  async fetchUser() {
    const res = await this.api.getUser();
    if (res.status === 200) {
      store.set('user', res.response);
    } else {
      router.go('/');
    }
    store.set('isUserLoading', false);
  }
}

export default new AuthController();
