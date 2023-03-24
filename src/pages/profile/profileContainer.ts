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

  const avatar = new Avatar({
    className: 'big-avatar',
    src: avatarSrc,
  });

  const changePassword = new ChangePassword();

  const saveButton = new Button({
    label: 'Сохранить',
    className: 'primary',
    attr: {
      type: 'submit',
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
        console.log(formObj);
        console.log(isFormInValid);
        if (!isFormInValid) {
          console.log(formObj);
          // ProfileController.changeUserProfile(formObj);
          router.go('/settings');
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
          saveButton,
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
  });

  return profile;
};
