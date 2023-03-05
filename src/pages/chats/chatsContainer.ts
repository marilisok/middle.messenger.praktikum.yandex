import {Button} from '../../components/button/button';
import {InputContainer} from '../../components/input/inputContainer';
import {ChatsPage} from './chats';
import {ChatItem} from './components/chat-item/chat-item';
import {Message} from './components/message/message';
import attachment from '../../../static/images/attachment.png';
import sendMessage from '../../../static/images/sendMessage.png';
import menu from '../../../static/images/menu.png';
import avatarImg from '../../../static/images/avatar.png';
import {dropDownMenuList} from './components/dropdown-list/dropdown-menu-list';
import {dropDownAttachList} from './components/dropdown-list/dropdown-attach-list';
import {Avatar} from '../../components/avatar/avatar';
import {FieldsName} from '../../utils/FieldsName';

export const chatsContainer = () => {
  const chatItem = new ChatItem();
  const menuList = dropDownMenuList();
  const attachList = dropDownAttachList();
  const avatar = new Avatar({
    className: 'small-avatar',
    src: avatarImg,
  });
  const searchInput = new InputContainer({
    className: 'gray-input',
    placeholder: 'Поиск',
    type: 'text',
    name: 'search',
  });
  const profileButton = new Button({
    label: 'Профиль >',
    className: ['gray-link', 'profile-button'],
    events: {
      click: () => window.location.replace('profile'),
    },
  });

  const menuButton = new Button({
    className: 'img-button',
    img: menu,
    events: {
      click: (event) => {
        if (menuList.styleDisplay === 'block') {
          menuList.hide();
        } else {
          menuList.show(event);
        }
      },
    },
  });

  const attachmentButton = new Button({
    className: 'img-button',
    img: attachment,
    events: {
      click: (event) => {
        if (attachList.styleDisplay === 'block') {
          attachList.hide();
        } else {
          attachList.show(event);
        }
      },
    },
  });

  const sendMessageButton = new Button({
    className: 'img-button',
    img: sendMessage,
    events: {
      click: () => console.log('send message'),
    },
  });

  const otherMessage = new Message({
    text: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну',
    time: '12.51',
    className: 'other-message',
  });

  const myMessage = new Message({
    text: 'Круто',
    time: '12.51',
    className: 'my-message',
  });

  const messageInput = new InputContainer({
    className: 'gray-input',
    placeholder: 'Введите сообщение',
    type: 'text',
    name: FieldsName.MESSAGE,
  });

  const chatsPage = new ChatsPage({
    chatItems: [chatItem],
    messages: [otherMessage, myMessage],
    searchInput,
    profileButton,
    menuButton,
    attachmentButton,
    sendMessageButton,
    dialogTime: '19 июня',
    menuList,
    attachList,
    avatar,
    name: 'Имя',
    messageInput,
  });
  return chatsPage;
};
