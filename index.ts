import Block from './src/utils/Block';
import {MainPage} from './src/pages/main/main';
import {ClientErrorPage} from './src/pages/client-error/client-error';
import {ServerErrorPage} from './src/pages/server-error/server-error';
import {logInContainer} from './src/pages/logIn/logInContainer';
import {signInContainer} from './src/pages/signIn/signInContainer';
import {profileContainer} from './src/pages/profile/profileContainer';
import {chatsContainer} from './src/pages/chats/chatsContainer';

const renderDOM = (block: Block<object>) => {
  const app = document.querySelector('#app');
  app!.append(block.getContent()!);
};

document.addEventListener('DOMContentLoaded', () => {
  switch (window.location.pathname) {
    case '/': {
      const page = new MainPage();
      renderDOM(page);
      break;
    }
    case '/signIn': {
      const page = signInContainer();
      renderDOM(page);
      break;
    }
    case '/logIn': {
      const page = logInContainer();
      renderDOM(page);
      break;
    }
    case '/chats': {
      const page = chatsContainer();
      renderDOM(page);
      break;
    }
    case '/profile': {
      const page = profileContainer();
      renderDOM(page);
      break;
    }
    case '/serverError': {
      const page = new ServerErrorPage();
      renderDOM(page);
      break;
    }
    case '/clientError': {
      const page = new ClientErrorPage();
      renderDOM(page);
      break;
    }
  }
});
