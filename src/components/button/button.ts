import template from './button.hbs';
import Block from '../../utils/Block';

interface ButtonProps {
  label?: string;
  className: string[] | string;
  img?: string;
  type?: string;
  events?: {
    click: (event?: any) => void;
  };
}

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super('button', props);
  }

  init() {
    const element = this.element;
    const className = this.props?.className;
    if (Array.isArray(className)) {
      className.forEach((item) => {
        element?.classList.add(item);
      });
    } else {
      this.element?.classList.add(this.props?.className);
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}
