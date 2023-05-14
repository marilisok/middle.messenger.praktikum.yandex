import './static/styles/styles.scss';
import {logInContainer} from './src/pages/logIn/logInContainer';
import {signInContainer} from './src/pages/signIn/signInContainer';
import {chatsContainer} from './src/pages/chats/chatsContainer';
import {router} from './src/services/Router';
import {profileContainer} from './src/pages/profile/profileContainer';
import {ErrorPage} from './src/pages/error/error';
import AuthController from './src/controllers/AuthController';
import store from './src/services/Store';

document.addEventListener('DOMContentLoaded', async () => {
  router
      .use('/', logInContainer())
      .use('/sign-up', signInContainer())
      .use('/messenger', chatsContainer())
      .use('/settings', profileContainer())
      .use('/error', new ErrorPage({}));
  let isProtectedRoute;
  switch (window.location.pathname) {
    case '/':
    case '/sign-up':
      isProtectedRoute = false;
      break;
    default:
      isProtectedRoute = true;
      break;
  }
  try {
    await AuthController.fetchUser();
    if (!store.getState().user) {
      throw new Error('User does not sign in');
    }
    router.start();
    if (!isProtectedRoute) {
      router.go('/messenger');
    }
  } catch (e) {
    router.start();
    if (isProtectedRoute) {
      router.go('/');
    }
  }
});
