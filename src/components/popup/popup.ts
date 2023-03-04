import Block from '../../utils/Block';
import {FieldsName} from '../../utils/FieldsName';
import {Button} from '../button/button';
import {Input} from '../input/input';
import template from './popup.hbs';

interface PopUpProps{
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
    this.children.login = new Input({
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
