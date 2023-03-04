import {Button} from '../../../../components/button/button';
import {PopUp} from '../../../../components/popup/popup';
import Block from '../../../../utils/Block';
import template from './dropdown-list.hbs';

interface DropDownListeProps{
  buttons: Button[];
  popups?: PopUp[];
}

export class DropDownList extends Block<DropDownListeProps> {
  constructor(props: DropDownListeProps) {
    super('div', props);
  }

  init() {
    this.element?.classList.add('dropdown-list-wrapper');
    this.hide();
  }

  show(event?: any) {
    const target = event.target;
    if (target) {
      const coords = target.getBoundingClientRect();
      const elementWidth = parseInt(getComputedStyle(this.element!).width);
      let left = coords.left + coords.width/2 - elementWidth;
      if (left < 0) left = 0;
      let top = coords.top - coords.height*2;
      if (top < 0) {
        top = coords.top + coords.height;
      }
      this.element!.style.left = left + 'px';
      this.element!.style.top = top + 'px';
      this.element!.style.display = 'block';
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}
