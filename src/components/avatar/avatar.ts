import template from './avatar.hbs';
import Block from '../../services/Block';

interface AvatarProps {
  src: string;
  className: string;
}

export class Avatar extends Block<AvatarProps> {
  constructor(props: AvatarProps) {
    super('div', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
