import {Avatar} from '../../components/avatar/avatar';
import {Button} from '../../components/button/button';
import {InputContainer} from '../../components/input/inputContainer';
import Block from '../../utils/Block';
import template from './chats.hbs';
import {ChatItem} from './components/chat-item/chat-item';
import {DropDownList} from './components/dropdown-list/dropdown-list';
import {Message} from './components/message/message';

interface ChatsPageProps {
  chatItems: ChatItem[];
  messages: Message[];
  searchInput: InputContainer;
  profileButton: Button;
  menuButton: Button;
  attachmentButton: Button;
  dialogTime: string;
  sendMessageButton: Button;
  menuList: DropDownList;
  attachList: DropDownList;
  avatar: Avatar;
  name: string;
  messageInput: InputContainer;
}

export class ChatsPage extends Block<ChatsPageProps> {
  constructor(props: ChatsPageProps) {
    super('div', props);
  }

  init() {
    this.element?.classList.add('flex-row');
  }

  render() {
    return this.compile(template, this.props);
  }
}
