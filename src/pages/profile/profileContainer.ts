import {Avatar} from '../../components/avatar/avatar';
import {Button} from '../../components/button/button';
import {ChangePassword} from './components/change-password/change-password';
import avatarSrc from '../../../static/images/avatar.png';
import {ProfilePage} from './profile';
import {Form} from '../../components/form/form';
import {profileInfoItems} from './profile-info-items';
import {profileItemInputs} from './profile-item-inputs';
import {router} from '../../services/Router';
import AuthController from '../../controllers/AuthController';
import ProfileController from '../../controllers/ProfileController';
import {PopUp} from '../../components/popup/popup';
import {InputContainer} from '../../components/input/inputContainer';
import {User} from '../../api/interfaces/auth-interfaces';

export const profileContainer = () => {
  const buttons = [];
  const profileInputs = profileItemInputs();
  const profileItems = profileInfoItems();

  const backToChatsButton = new Button({
    className: 'dot',
    label: '<<',
    events: {
      click: () => router.go('/messenger'),
    },
  });

  const changeAvatarPopUpButton = new Button({
    label: 'Изменить',
    className: 'primary',
    attr: {
      type: 'submit',
    },
  });

  const chooseAvatar = new InputContainer({
    type: 'file',
    name: 'avatar',
    className: 'avatarInput',
    accept: 'image/*',
  });

  const changeAvatarForm = new Form({
    inputs: [chooseAvatar],
    buttons: [changeAvatarPopUpButton],
    events: {
      submit: (event) => {
        event.preventDefault();
        const form = changeAvatarForm.getContent() as HTMLFormElement;
        const formData = new FormData(form);
        const avatarInput = (form.querySelector('.avatarInput') as HTMLInputElement);
        if (avatarInput.value) {
          ProfileController.changeUserAvatar(formData);
          avatarInput.value = '';
          changeAvatarPopup.hide();
        }
      },
    },
  });

  const closeAvatarPopUp = new Button({
    label: '&times',
    className: 'close',
    events: {
      click: () => {
        changeAvatarPopup.hide();
      },
    },
  });

  const changeAvatarPopup = new PopUp({
    text: 'Изменить аватар',
    closeButton: closeAvatarPopUp,
    item: changeAvatarForm,
  });

  const avatar = new Avatar({
    className: 'big-avatar',
    src: avatarSrc,
    events: {
      click: () => {
        changeAvatarPopup.show();
      },
    },
  });

  const changePassword = new ChangePassword();

  const saveButton = new Button({
    label: 'Сохранить',
    className: 'primary',
    attr: {
      type: 'submit',
    },
  });

  const backToProfileButton = new Button({
    label: 'Назад',
    className: 'link',
    events: {
      click: () => {
        profile.setProps({
          isProfileInfo: true,
        });
      },
    },
  });

  const profileForm = new Form({
    inputs: profileInputs,
    buttons: [saveButton],
    events: {
      submit: (event) => {
        event.preventDefault();
        const formObj = profileForm.getForm();
        const isFormInValid = profileForm.isFormInValid();
        if (!isFormInValid) {
          ProfileController.changeUserProfile(formObj as unknown as User);
          profile.setProps({
            isProfileInfo: true,
          });
        }
      },
    },
  });

  const changeDataButton = new Button({
    label: 'Изменить данные',
    className: 'link',
    events: {
      click: () => {
        profile.setProps({
          isProfileInfo: false,
          profileForm: profileForm,
        });
      },
    },
  });

  const changePasswordButton = new Button({
    label: 'Изменить пароль',
    className: 'link',
    events: {
      click: () => {
        profile.setProps({
          isChangePassword: true,
          isProfileInfo: false,
          changePassword: changePassword,
        });
      },
    },
  });

  const exitButton = new Button({
    label: 'Выйти',
    className: 'red-link',
    events: {
      click: () => AuthController.logOut(),
    },
  });
  buttons.push(changeDataButton, changePasswordButton, exitButton);

  const profile = new ProfilePage({
    avatar: avatar,
    backToChatsButton: backToChatsButton,
    isProfileInfo: true,
    profileInfoItems: profileItems,
    buttons: buttons,
    changeAvatarPopup: changeAvatarPopup,
    backToProfileButton,
  });

  return profile;
};
