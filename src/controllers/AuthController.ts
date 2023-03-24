import {AuthAPI} from '../api/auth-api';
import {SignInData, SignUpData} from '../api/interfaces/auth-interfaces';
import {router} from '../services/Router';
import store from '../services/Store';

class AuthController {
  private api: AuthAPI;

  constructor() {
    this.api = new AuthAPI();
  }

  async signUp(data: SignUpData) {
    try {
      await this.api.signUp(data).then( ( res: any ) => {
        if ( res.status === 200 ) {
          this.fetchUser();
        }
      });
    } catch (e) {

    }
  }

  async signIn(data: SignInData) {
    try {
      await this.api.signIn(data).then( ( res: any ) => {
        if ( res.status === 200 ) {
          this.fetchUser();
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
      router.go('/');
    } catch (e) {

    }
  }

  async fetchUser() {
    try {
      await this.api.getUser().then((res: any) => {
        if (res.status === 200) {
          store.set('user', res.response);
          router.go('/messenger');
        }
      });
    } catch (e) {

    }
  }
}

export default new AuthController();
