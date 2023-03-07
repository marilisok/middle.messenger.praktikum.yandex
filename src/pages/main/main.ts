import template from './main.hbs';
import {Button} from '../../components/button/button';
import Block from '../../utils/Block';

export class MainPage extends Block<any> {
  constructor() {
    super('nav');
  }

  init() {
    this.element?.classList.add('flex-wrapper');
    this.children.logInButton = new Button({
      label: 'Вход',
      className: 'link',
      events: {
        click: () => window.location.replace('logIn'),
      },
    });
    this.children.signInButton = new Button({
      label: 'Авторизация',
      className: 'link',
      events: {
        click: () => window.location.replace('signIn'),
      },
    });
    this.children.chatButton = new Button({
      label: 'Чат',
      className: 'link',
      events: {
        click: () => window.location.replace('chats'),
      },
    });
    this.children.profileButton = new Button({
      label: 'Профиль',
      className: 'link',
      events: {
        click: () => window.location.replace('profile'),
      },
    });
    this.children.serverErrorButton = new Button({
      label: '500',
      className: 'link',
      events: {
        click: () => window.location.replace('serverError'),
      },
    });
    this.children.clientErrorButton = new Button({
      label: '400',
      className: 'link',
      events: {
        click: () => window.location.replace('clientError'),
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
