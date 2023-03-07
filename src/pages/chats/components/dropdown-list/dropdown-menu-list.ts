import {Button} from '../../../../components/button/button';
import {PopUp} from '../../../../components/popup/popup';
import {DropDownList} from './dropdown-list';

export const dropDownMenuList = () => {
  const closeAddUser = new Button({
    label: '&times',
    className: 'close',
    events: {
      click: () => {
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
      click: () => deleteUserPopup.show(),
    },
  });

  const deleteUserPopUpButton = new Button({
    label: 'Удалить',
    className: 'primary',
    events: {
      click: () => console.log('deleteUser'),
    },
  });

  const addUserPopUpButton = new Button({
    label: 'Добавить',
    className: 'primary',
    events: {
      click: () => console.log('addUser'),
    },
  });

  const deleteUserPopup = new PopUp({
    button: deleteUserPopUpButton,
    text: 'Удалить пользователя',
    closeButton: closeDeleteUser,
  });

  const addUserPopup = new PopUp({
    button: addUserPopUpButton,
    text: 'Добавить пользователя',
    closeButton: closeAddUser,
  });

  const dropDownList = new DropDownList({
    buttons: [addUserButton, deleteUserButton],
    popups: [deleteUserPopup, addUserPopup],
  });

  return dropDownList;
};
