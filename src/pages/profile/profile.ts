import {Button} from '../../components/button/button';
import Block from '../../utils/Block';
import template from './profile.hbs';
import {ProfileInfoItem} from './components/profile-info-item/profile-info-item';
import {Avatar} from '../../components/avatar/avatar';
import {ChangePassword} from './components/change-password/change-password';
import {Form} from '../../components/form/form';

interface ProfilePageProps {
  avatar: Avatar;
  backToChatsButton: Button;
  isChangePassword?: boolean;
  isProfileInfo?: boolean;
  profileInfoItems?: ProfileInfoItem[];
  buttons?: Button[];
  profileForm?: Form | null;
  changePassword?: ChangePassword | null;
}

export class ProfilePage extends Block<ProfilePageProps> {
  constructor(props: ProfilePageProps) {
    super('div', props);
  }

  init() {
    this.element?.classList.add('flex-row');
  }

  render() {
    return this.compile(template, this.props);
  }
}
