import {Button} from '../../components/button/button';
import {InputContainer} from '../../components/input/inputContainer';
import {ChatsPage} from './chats';
import sendMessage from '../../../static/images/sendMessage.png';
import menu from '../../../static/images/menu.png';
import {dropDownMenuList} from './components/dropdown-list/dropdown-menu-list';
import {FieldsName} from '../../utils/FieldsName';
import {router} from '../../services/Router';
import {PopUp} from '../../components/popup/popup';
import ChatsController from '../../controllers/ChatsController';
import {ChatItems} from './components/chat-items/chat-items';
import {MessageWrapper} from './components/messages-wrapper/messages-wrapper';
import MessagesController from '../../controllers/MessagesController';
import store from '../../services/Store';

export const chatsContainer = () => {
  const menuList = dropDownMenuList();

  const createChatButton = new Button({
    label: 'Создать чат',
    className: 'link',
    events: {
      click: () => createChatPopup.show(),
    },
  });
  const createChatPopUpButton = new Button({
    label: 'Создать',
    className: 'primary',
    events: {
      click: () => {
        const value = chatInput.value;
        if (value) {
          ChatsController.createChat(value);
          createChatPopup.hide();
        }
      },
    },
  });
  const closeCreateChatPopUp = new Button({
    label: '&times',
    className: 'close',
    events: {
      click: () => {
        createChatPopup.hide();
      },
    },
  });

  const chatInput = new InputContainer({
    className: 'form-input',
    placeholder: 'Название чата',
    type: 'text',
  });

  const createChatPopup = new PopUp({
    button: createChatPopUpButton,
    text: 'Создать чат',
    closeButton: closeCreateChatPopUp,
    item: chatInput,
  });

  const profileButton = new Button({
    label: 'Профиль >',
    className: ['gray-link', 'profile-button'],
    events: {
      click: () => router.go('/settings'),
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

  const sendMessageButton = new Button({
    className: 'img-button',
    img: sendMessage,
    events: {
      click: () => {
        const chatId = store.getState().selectedChat?.id;
        if (chatId) {
          const value = messageInput.value;
          MessagesController.sendMessage(chatId, value);
        }
      },
    },
  });

  const messageInput = new InputContainer({
    className: 'gray-input',
    placeholder: 'Введите сообщение',
    type: 'text',
    name: FieldsName.MESSAGE,
  });

  const chatsPage = new ChatsPage({
    chatItems: new ChatItems({chatItemsList: []}),
    messageWrapper: new MessageWrapper({messageItems: []}),
    profileButton,
    menuButton,
    sendMessageButton,
    menuList,
    messageInput,
    createChatButton,
    createChatPopup,
    isChatSideShown: false,
  });
  return chatsPage;
};
