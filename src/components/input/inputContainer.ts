import template from './inputContainer.hbs';
import Block from '../../services/Block';
import {validationForm} from '../../utils/ValidationForm';
import {Input} from './input';

export interface InputContainerProps {
  placeholder?: string;
  className: string;
  type: string;
  name?: string;
  value?: string;
  isProfileMode?: boolean;
  text?: string;
  accept?: string;
  inputField?: Input;
}

export class InputContainer extends Block<InputContainerProps> {
  constructor(props: InputContainerProps) {
    super('div', props);
  }

  init() {
    this.element?.classList.add('input-wrapper');
    const inputField = new Input({
      attr: {
        placeholder: this.props?.placeholder || '',
        class: this.props.className,
        type: this.props.type,
        name: this.props?.name,
        value: this.props?.value || '',
        accept: this.props?.accept || '',
      },
      events: {
        blur: () => this.validateInput(),
        focus: () => this.validateInput(),
      },
    });
    this.setProps({inputField});
  }

  get value() {
    return (this.children.inputField as unknown as Input).value;
  }

  protected componentDidUpdate(newProps: InputContainerProps): boolean {
    this.children.inputField.setProps({
      attr: {
        value: newProps?.value || '',
      },
    });
    return true;
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
