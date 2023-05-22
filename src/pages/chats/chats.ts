import {ChatModel} from '../../api/interfaces/chat-interfaces';
import {Avatar} from '../../components/avatar/avatar';
import {Button} from '../../components/button/button';
import {InputContainer} from '../../components/input/inputContainer';
import {PopUp} from '../../components/popup/popup';
import ChatsController from '../../controllers/ChatsController';
import {Message} from '../../controllers/MessagesController';
import {connect} from '../../hocs/connect';
import Block from '../../services/Block';
import {deepCopy} from '../../utils/deepCopy';
import {formatDate, formatDateWithTime} from '../../utils/formatDate';
import {getAvatar} from '../../utils/getAvatar';
import template from './chats.hbs';
import {ChatItem} from './components/chat-item/chat-item';
import {ChatItems} from './components/chat-items/chat-items';
import {DropDownList} from './components/dropdown-list/dropdown-list';
import {MessageItem} from './components/message/message';
import {MessageWrapper} from './components/messages-wrapper/messages-wrapper';

interface ChatsPageProps {
  messages?: Message[];
  messageWrapper: MessageWrapper;
  profileButton: Button;
  menuButton: Button;
  sendMessageButton: Button;
  menuList: DropDownList;
  avatar?: Avatar;
  messageInput: InputContainer;
  createChatButton: Button;
  createChatPopup: PopUp;
  chatItems: ChatItems;
  isChatSideShown: boolean;
  isChatsLoading?: boolean;
  name?: string;
  chats?: ChatModel[],
  selectedChat?: ChatModel,
  userId?: number;
}

class ChatsPageBase extends Block<ChatsPageProps> {
  constructor(props: ChatsPageProps) {
    super('div', props);
  }

  init() {
    ChatsController.getChats();
    this.element?.classList.add('flex-row');
  }

  show() {
    this.getContent()!.style.display = 'flex';
  }

  protected componentDidUpdate(newProps: ChatsPageProps): boolean {
    if (!newProps.isChatsLoading) {
      const newChatItems = newProps.chats?.map((chat: ChatModel) => new ChatItem({
        avatar: new Avatar({
          src: getAvatar(chat.avatar),
          className: 'small-avatar',
        }),
        title: chat.title,
        content: chat.last_message?.content || '',
        unread_count: chat.unread_count,
        time: chat.last_message?.time? formatDate(chat.last_message.time): '',
        events: {
          click: () => {
            ChatsController.setSelectedChat(deepCopy(chat) as unknown as ChatModel);
          },
        },
      })) || [];
      this.children.chatItems.setProps({chatItemsList: newChatItems});
    }

    if (newProps.selectedChat && newProps.userId && newProps.messages) {
      newProps.messages.sort(function compare(a, b) {
        const dateA = new Date(a.time);
        const dateB = new Date(b.time);
        return dateA.getTime() - dateB.getTime();
      });
      const messageItems = newProps.messages.map((message) => {
        return new MessageItem({
          content: message.content,
          time: formatDateWithTime(message.time),
          className: message.user_id === newProps.userId? 'my-message': 'other-message',
        });
      });
      this.children.messageWrapper.setProps({messageItems: messageItems});
    }
    return true;
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const ChatsPage = connect((state) => {
  const selectedChat = state.selectedChat;
  const selectedChatId = selectedChat?.id;

  if (!selectedChatId) {
    return {
      name: '',
      isChatSideShown: false,
      selectedChat: null,
      chats: [...(state.chats || [])],
      isChatsLoading: state.isChatsLoading,
      userId: state.user?.id,
      messages: [],
    };
  }
  const chats = state.chats.map((chat: ChatModel) => deepCopy(chat));
  return {
    avatar: new Avatar({
      src: getAvatar(selectedChat.avatar),
      className: 'small-avatar',
    }),
    isChatSideShown: true,
    name: selectedChat.title,
    chats,
    isChatsLoading: state.isChatsLoading,
    selectedChat: state.selectedChat,
    userId: state.user?.id,
    messages: state.messages[selectedChatId],
  };
})(ChatsPageBase as unknown as typeof Block);
