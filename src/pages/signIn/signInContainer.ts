import {Button} from '../../components/button/button';
import {Form} from '../../components/form/form';
import {Input} from '../../components/input/input';
import {SignInPage} from './signIn';
import {FieldsName} from '../../utils/FieldsName';

export const signInContainer = () => {
  const emailInput = new Input({
    className: 'form-input',
    placeholder: 'Почта',
    type: 'email',
    name: FieldsName.EMAIL,
  });

  const loginInput = new Input({
    className: 'form-input',
    placeholder: 'Логин',
    type: 'text',
    name: FieldsName.LOGIN,
  });

  const nameInput = new Input({
    className: 'form-input',
    placeholder: 'Имя',
    type: 'text',
    name: FieldsName.FIRST_NAME,
  });

  const surnameInput = new Input({
    className: 'form-input',
    placeholder: 'Фамилия',
    type: 'text',
    name: FieldsName.SECOND_NAME,
  });

  const phoneInput = new Input({
    className: 'form-input',
    placeholder: 'Телефон',
    type: 'tel',
    name: FieldsName.PHONE,
  });

  const passwordInput = new Input({
    className: 'form-input',
    placeholder: 'Пароль',
    type: 'password',
    name: FieldsName.PASSWORD,
  });

  const passwordRepeatInput = new Input({
    className: 'form-input',
    placeholder: 'Пароль (ещё раз)',
    type: 'password',
    name: FieldsName.PASSWORD_REPEAT,
  });

  const signInButton = new Button({
    label: 'Зарегистрироваться',
    className: 'primary',
    type: 'submit',
  });
  const logInButton = new Button({
    label: 'Войти',
    className: 'link',
    events: {
      click: () => window.location.replace('logIn'),
    },
  });

  const form = new Form({
    inputs: [emailInput, loginInput, nameInput, surnameInput, phoneInput, passwordInput, passwordRepeatInput],
    buttons: [signInButton, logInButton],
    events: {
      submit: (event) => {
        event.preventDefault();
        const formObj = form.getForm();
        console.log(formObj);
        const isFormInValid = form.isFormInValid();
        if (!isFormInValid) {
          window.location.replace('chats');
        }
      },
    },
  });

  const signIn = new SignInPage({
    form,
    title: 'Регистрация',
  });
  return signIn;
};
