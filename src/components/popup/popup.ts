import Block from '../../services/Block';
import {FieldsName} from '../../utils/FieldsName';
import {Button} from '../button/button';
import {InputContainer} from '../input/inputContainer';
import template from './popup.hbs';

interface PopUpProps {
  button: Button;
  text: string;
  closeButton: Button;
}

export class PopUp extends Block<PopUpProps> {
  constructor(props: PopUpProps) {
    super('button', props);
  }

  init() {
    this.element?.classList.add('modal');
    this.hide();
    this.children.login = new InputContainer({
      className: 'form-input',
      placeholder: 'Логин',
      type: 'text',
      name: FieldsName.LOGIN,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
