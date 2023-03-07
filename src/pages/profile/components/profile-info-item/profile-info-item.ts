import Block from '../../../../utils/Block';
import template from './profile-info-item.hbs';

interface ProfileInfoItemProps {
  text: string;
  value: string;
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
