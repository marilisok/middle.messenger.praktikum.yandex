import {Button} from '../../../../components/button/button';
import Block from '../../../../services/Block';
import template from './user-list-item.hbs';

interface UserListItemProps {
  login: string;
  button: Button;
}

export class UserListItem extends Block<UserListItemProps> {
  constructor(props: UserListItemProps) {
    super('div', props);
  }

  init() {
    this.element?.classList.add('user-item');
  }

  render() {
    return this.compile(template, this.props);
  }
}
