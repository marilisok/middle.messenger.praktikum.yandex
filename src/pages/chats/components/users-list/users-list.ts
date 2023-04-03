import Block from '../../../../services/Block';
import {UserListItem} from '../user-list-item/user-list-item';
import template from './users-list.hbs';

interface UsersListProps {
    usersList: UserListItem[];
}

export class UsersList extends Block<UsersListProps> {
  constructor(props: UsersListProps) {
    super('div', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
