import {Input} from '../../components/input/input';
import {FieldsName} from '../../utils/FieldsName';

export const profileItemInputs = () => {
  const emailInput = new Input({
    text: 'Почта',
    className: 'color-input-base',
    isProfileMode: true,
    placeholder: 'Почта',
    type: 'email',
    name: FieldsName.EMAIL,
  });


  const loginInput = new Input({
    text: 'Логин',
    className: 'color-input-base',
    isProfileMode: true,
    placeholder: 'Логин',
    type: 'text',
    name: FieldsName.LOGIN,

  });


  const nameInput = new Input({
    text: 'Имя',
    isProfileMode: true,
    className: 'color-input-base',
    placeholder: 'Имя',
    type: 'text',
    name: FieldsName.FIRST_NAME,

  });


  const surnameInput = new Input({
    text: 'Фамилия',
    isProfileMode: true,
    className: 'color-input-base',
    placeholder: 'Фамилия',
    type: 'text',
    name: FieldsName.SECOND_NAME,

  });


  const displayNameInput = new Input({
    text: 'Имя в чате',
    isProfileMode: true,
    className: 'color-input-base',
    placeholder: 'Имя в чате',
    type: 'text',
    name: FieldsName.DISPLAY_NAME,

  });


  const phoneInput = new Input({
    text: 'Телефон',
    isProfileMode: true,
    className: 'color-input-base',
    placeholder: 'Телефон',
    type: 'tel',
    name: FieldsName.PHONE,
  });

  return [emailInput, loginInput, nameInput, surnameInput, displayNameInput, phoneInput];
};
