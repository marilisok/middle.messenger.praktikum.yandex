import {Button} from '../../components/button/button';
import Block from '../../services/Block';
import template from './profile.hbs';
import {ProfileInfoItem} from './components/profile-info-item/profile-info-item';
import {Avatar} from '../../components/avatar/avatar';
import {ChangePassword} from './components/change-password/change-password';
import {Form} from '../../components/form/form';
import {connect} from '../../hocs/connect';
import {State} from '../../services/Store';
import {InputContainer} from '../../components/input/inputContainer';

interface ProfilePageProps {
  avatar: Avatar;
  backToChatsButton: Button;
  isChangePassword?: boolean;
  isProfileInfo?: boolean;
  profileInfoItems?: ProfileInfoItem[];
  buttons?: Button[];
  profileForm?: Form | null;
  changePassword?: ChangePassword | null;
  test?: ProfileInfoItem;
}

class ProfilePageBase extends Block<ProfilePageProps> {
  constructor(props: ProfilePageProps) {
    super('div', props);
  }

  init() {
    this.element?.classList.add('flex-row');
  }

  show() {
    this.getContent()!.style.display = 'flex';
  }

  protected componentDidUpdate(oldProps: ProfilePageProps, newProps: ProfilePageProps): boolean {
    if (this.children.profileInfoItems) {
      this.children.profileInfoItems = this.children.profileInfoItems.map((element) => {
        const fieldName = element.props.field;
        return new ProfileInfoItem({
          ...element.props,
          value: newProps[fieldName],
        });
      });
    }

    if (this.children.profileForm) {
      debugger;
      const inputs = this.children.profileForm.children.inputs.map((element) => {
        const fieldName = element.props.name;
        return new InputContainer({
          ...element.props,
          value: newProps[fieldName],
        });
      });
      // this.children.profileForm.children.inputs = inputs
      this.children.profileForm = new Form({
        inputs: inputs,
        buttons: this.children.profileForm.children.buttons,
        events: this.children.profileForm.props.events,
      });
    }
    return true;
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const ProfilePage = connect((state: State) => {
  return state.user || {};
})(ProfilePageBase);
