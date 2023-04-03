import {ClientErrorPage} from './src/pages/client-error/client-error';
import {ServerErrorPage} from './src/pages/server-error/server-error';
import {logInContainer} from './src/pages/logIn/logInContainer';
import {signInContainer} from './src/pages/signIn/signInContainer';
import {chatsContainer} from './src/pages/chats/chatsContainer';
import {router} from './src/services/Router';
import {profileContainer} from './src/pages/profile/profileContainer';

document.addEventListener('DOMContentLoaded', async () => {
  router
      .use('/', logInContainer())
      .use('/sign-up', signInContainer())
      .use('/messenger', chatsContainer())
      .use('/settings', profileContainer())
      .use('/server-error', new ServerErrorPage())
      .use('/client-error', new ClientErrorPage());
  router.start();
});
