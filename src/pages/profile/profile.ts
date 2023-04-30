import {Button} from '../../components/button/button';
import Block from '../../services/Block';
import template from './profile.hbs';
import {ProfileInfoItem} from './components/profile-info-item/profile-info-item';
import {Avatar} from '../../components/avatar/avatar';
import {ChangePassword} from './components/change-password/change-password';
import {Form} from '../../components/form/form';
import {connect} from '../../hocs/connect';
import {PopUp} from '../../components/popup/popup';
import {getAvatar} from '../../utils/getAvatar';
import AuthController from '../../controllers/AuthController';
import {InputContainer} from '../../components/input/inputContainer';
import {User} from '../../api/interfaces/auth-interfaces';

interface ProfilePageProps {
  avatar: Avatar;
  backToChatsButton: Button;
  isChangePassword?: boolean;
  isProfileInfo?: boolean;
  profileInfoItems?: ProfileInfoItem[];
  buttons?: Button[];
  profileForm?: Form | null;
  changePassword?: ChangePassword | null;
  changeAvatarPopup: PopUp;
  backToProfileButton: Button;
  user?: User;
  isUserLoading?: boolean;
  login?: string;
}

class ProfilePageBase extends Block<ProfilePageProps> {
  constructor(props: ProfilePageProps) {
    super('div', props);
  }

  init() {
    AuthController.fetchUser();
    this.element?.classList.add('flex-row');
  }

  show() {
    this.getContent()!.style.display = 'flex';
  }

  protected componentDidUpdate(newProps: ProfilePageProps): boolean {
    this.children.avatar.setProps({
      src: getAvatar(newProps.user?.avatar || ''),
    });
    if (this.props.isProfileInfo && newProps.user) {
      const profileInfoItems = this.props.profileInfoItems;
      profileInfoItems?.forEach((element: ProfileInfoItem) => {
        const field = element.getProps().field;
        element.setProps({value: newProps.user[field] || ''});
      });
    }

    if (this.children.profileForm && newProps.user) {
      const profileFormInputs = this.children.profileForm.children.inputs as unknown as InputContainer[];
      profileFormInputs.forEach((element: InputContainer) => {
        element.setProps({value: newProps.user[element.props.name] || ''});
      });
      kk
      undefined + u
    }
    return true;
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const ProfilePage = connect((state) => ({
  user: state.user,
  isUserLoading: state.isUserLoading,
  login: state.user?.login || '',
}))(ProfilePageBase as unknown as typeof Block);
