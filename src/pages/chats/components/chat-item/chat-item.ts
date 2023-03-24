import {Avatar} from '../../../../components/avatar/avatar';
import Block from '../../../../services/Block';
import template from './chat-item.hbs';
import avatar from '../../../../../static/images/avatar.png';

export class ChatItem extends Block<any> {
  constructor() {
    super('div');
  }

  init() {
    this.children.avatar = new Avatar({
      className: 'small-avatar',
      src: avatar,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
