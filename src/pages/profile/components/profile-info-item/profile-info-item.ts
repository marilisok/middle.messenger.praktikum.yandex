import Block from '../../../../services/Block';
import store from '../../../../services/Store';
import template from './profile-info-item.hbs';

interface ProfileInfoItemProps {
  text: string;
  value: string;
  field: string;
}

export class ProfileInfoItem extends Block<ProfileInfoItemProps> {
  constructor(props: ProfileInfoItemProps) {
    super('div', props);
  }

  init() {
    this.element?.classList.add('profile-item');
  }

  render() {
    return this.compile(template, this.props);
  }
}
