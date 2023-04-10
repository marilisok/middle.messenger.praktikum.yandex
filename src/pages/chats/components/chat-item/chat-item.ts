import {Avatar} from '../../../../components/avatar/avatar';
import Block from '../../../../services/Block';
import template from './chat-item.hbs';

interface ChatItemProps {
  avatar: Avatar;
  title: string;
  unread_count: number;
  time: string;
  content: string;
  events?: {
    click: () => void;
  };
}
export class ChatItem extends Block<ChatItemProps> {
  constructor(props: ChatItemProps) {
    super('div', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
