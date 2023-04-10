import {logInContainer} from './src/pages/logIn/logInContainer';
import {signInContainer} from './src/pages/signIn/signInContainer';
import {chatsContainer} from './src/pages/chats/chatsContainer';
import {router} from './src/services/Router';
import {profileContainer} from './src/pages/profile/profileContainer';
import {ErrorPage} from './src/pages/error/error';

document.addEventListener('DOMContentLoaded', async () => {
  router
      .use('/', logInContainer())
      .use('/sign-up', signInContainer())
      .use('/messenger', chatsContainer())
      .use('/settings', profileContainer())
      .use('/error', new ErrorPage({}));
  router.start();
});
