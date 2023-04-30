import Block from '../../services/Block';
import {Button} from '../button/button';
import {Form} from '../form/form';
import {InputContainer} from '../input/inputContainer';
import template from './popup.hbs';
import {Input} from '../input/input';
import {UsersList} from '../../pages/chats/components/users-list/users-list';

interface PopUpProps {
  button?: Button;
  text: string;
  closeButton: Button;
  item?: InputContainer | Form | Input;
  usersList?: UsersList;
}

export class PopUp extends Block<PopUpProps> {
  constructor(props: PopUpProps) {
    super('button', props);
  }

  init() {
    this.element?.classList.add('modal');
    this.hide();
  }

  protected componentDidUpdate(newProps: PopUpProps): boolean {
    this.children.usersList?.setProps({
      usersList: newProps.usersList,
    });
    return true;
  }

  render() {
    return this.compile(template, this.props);
  }
}
