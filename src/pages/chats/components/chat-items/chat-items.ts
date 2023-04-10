import Block from '../../../../services/Block';
import {ChatItem} from '../chat-item/chat-item';
import template from './chat-items.hbs';

interface ChatItemsProps {
  chatItemsList: ChatItem[];
}

export class ChatItems extends Block<ChatItemsProps> {
  constructor(props: ChatItemsProps) {
    super('div', props);
  }
  init() {
    this.element?.classList.add('chat-items');
  }
  render() {
    return this.compile(template, this.props);
  }
}
