import template from './inputContainer.hbs';
import Block from '../../utils/Block';
import {validationForm} from '../../utils/ValidationForm';
import {Input} from './input';

export interface InputContainerProps {
  placeholder: string;
  className: string;
  type: string;
  name?: string;
  value?: string;
  isProfileMode?: boolean;
  text?: string;
}

export class InputContainer extends Block<InputContainerProps> {
  constructor(props: InputContainerProps) {
    super('div', props);
  }

  init() {
    this.element?.classList.add('input-wrapper');
    this.children.input = new Input({
      attr: {
        placeholder: this.props.placeholder,
        class: this.props.className,
        type: this.props.type,
        name: this.props?.name,
        value: this.props?.value || '',
      },
      events: {
        blur: () => this.validateInput(),
        focus: () => this.validateInput(),
      },
    });
  }

  validateInput() {
    const input = this.element?.querySelector('input');
    const key = input?.name;
    const value = input?.value || '';
    if (key) {
      const result = validationForm(key, value);
      const divForError = this.element?.querySelector('.validation-error');
      divForError!.textContent = result;
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}
