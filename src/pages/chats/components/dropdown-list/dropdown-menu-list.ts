import {User} from '../../../../api/interfaces/auth-interfaces';
import {Button} from '../../../../components/button/button';
import {Input} from '../../../../components/input/input';
import {PopUp} from '../../../../components/popup/popup';
import ChatsController from '../../../../controllers/ChatsController';
import ProfileController from '../../../../controllers/ProfileController';
import store from '../../../../services/Store';
import {FieldsName} from '../../../../utils/FieldsName';
import {debounce} from '../../../../utils/debounce';
import {UserListItem} from '../user-list-item/user-list-item';
import {UsersList} from '../users-list/users-list';
import {DropDownList} from './dropdown-list';

export const dropDownMenuList = () => {
  const closeAddUser = new Button({
    label: '&times',
    className: 'close',
    events: {
      click: () => {
        addUserByLogin.setValue('');
        const newUsersList = new UsersList({usersList: []});
        addUserPopup.setProps({usersList: newUsersList});
        addUserPopup.hide();
      },
    },
  });

  const closeDeleteUser = new Button({
    label: '&times',
    className: 'close',
    events: {
      click: () => {
        deleteUserPopup.hide();
      },
    },
  });

  const addUserButton = new Button({
    label: 'Добавить пользователя',
    className: 'link',
    events: {
      click: () => addUserPopup.show(),
    },
  });

  const deleteUserButton = new Button({
    label: 'Удалить пользователя',
    className: 'link',
    events: {
      click: () => {
        const chatId = store.getState().selectedChat?.id;
        if (chatId) {
          ChatsController.getUsersByChat(chatId).then((res: XMLHttpRequest) => {
            const users = res.response;
            if (users) {
              const currentUserId = store.getState().user?.id;
              const usersWithoutCurrent = users.filter((user: User) => user.id !== currentUserId);
              const userItems = usersWithoutCurrent.map((user: User) => {
                const button = new Button({
                  label: 'Удалить',
                  className: 'link',
                  events: {
                    click: () => {
                      if (chatId) {
                        ChatsController.deleteUsersFromChat(chatId, user.id);
                        deleteUserPopup.hide();
                      }
                    },
                  },
                });
                const login = user.login;
                return new UserListItem({
                  login,
                  button,
                });
              });
              const newUsersList = new UsersList({usersList: userItems});
              deleteUserPopup.setProps({usersList: newUsersList});
              deleteUserPopup.show();
            }
          });
        }
      },
    },
  });

  const deleteChatButton = new Button({
    label: 'Удалить чат',
    className: 'link',
    events: {
      click: () => {
        const chatId = store.getState().selectedChat?.id;
        if (chatId) {
          ChatsController.deleteChat(chatId);
          dropDownList.hide();
        }
      },
    },
  });

  const addUserByLogin = new Input({
    attr: {
      placeholder: 'Логин',
      class: 'form-input',
      type: 'text',
      name: FieldsName.LOGIN,
    },
    events: {
      keyup: () => {
        const value = addUserByLogin.value;
        if (!value) {
          const newUsersList = new UsersList({usersList: []});
          addUserPopup.setProps({usersList: newUsersList});
        } else {
          debounce(searchUsers(value), 1000);
        }
      },
    },
  });

  const searchUsers = (login: string) => {
    ProfileController.searchUserByLogin(login).then((res: XMLHttpRequest) => {
      const users = res.response;
      if (users) {
        const userItems = users.map((user: User) => {
          const button = new Button({
            label: 'Добавить',
            className: 'link',
            events: {
              click: () => {
                const chatId = store.getState().selectedChat?.id;
                if (chatId) {
                  ChatsController.addUsersToChat(chatId, user.id);
                  addUserPopup.hide();
                }
              },
            },
          });
          const login = user.login;
          return new UserListItem({
            login,
            button,
          });
        });
        const newUsersList = new UsersList({usersList: userItems});
        addUserPopup.setProps({usersList: newUsersList});
      }
    });
  };

  const deleteUserPopup = new PopUp({
    text: 'Удалить пользователя',
    closeButton: closeDeleteUser,
    usersList: new UsersList({usersList: []}),
  });

  const addUserPopup = new PopUp({
    text: 'Добавить пользователя',
    closeButton: closeAddUser,
    item: addUserByLogin,
    usersList: new UsersList({usersList: []}),
  });

  const dropDownList = new DropDownList({
    buttons: [addUserButton, deleteUserButton, deleteChatButton],
    popups: [deleteUserPopup, addUserPopup],
  });

  return dropDownList;
};
