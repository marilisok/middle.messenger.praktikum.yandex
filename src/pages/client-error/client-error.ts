import {Button} from '../../components/button/button';
import Block from '../../services/Block';
import {router} from '../../services/Router';
import template from './client-error.hbs';

export class ClientErrorPage extends Block<any> {
  constructor() {
    super('div');
  }

  init() {
    this.element?.classList.add('flex-wrapper');
    this.children.backToChatsButton = new Button({
      label: 'Назад к чатам',
      className: 'link',
      events: {
        click: () => router.go('/messenger'),
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
