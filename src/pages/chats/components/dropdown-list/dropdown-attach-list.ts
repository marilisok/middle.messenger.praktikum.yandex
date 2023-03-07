import {Button} from '../../../../components/button/button';
import {DropDownList} from './dropdown-list';

export const dropDownAttachList = () => {
  const mediaButton = new Button({
    label: 'Фото или видео',
    className: 'link',
    events: {
      click: () => console.log('mediaButton'),
    },
  });

  const fileButton = new Button({
    label: 'Файл',
    className: 'link',
    events: {
      click: () => console.log('fileButton'),
    },
  });

  const locationButton = new Button({
    label: 'Локация',
    className: 'link',
    events: {
      click: () => console.log('locationButton'),
    },
  });

  const dropDownList = new DropDownList({
    buttons: [mediaButton, fileButton, locationButton],
  });

  return dropDownList;
};
