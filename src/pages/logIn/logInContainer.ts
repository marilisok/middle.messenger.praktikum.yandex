import {Button} from '../../components/button/button';
import {Form} from '../../components/form/form';
import {InputContainer} from '../../components/input/inputContainer';
import {LogInPage} from './logIn';
import {FieldsName} from '../../utils/FieldsName';
import {router} from '../../services/Router';
import {SignInData} from '../../api/interfaces/auth-interfaces';
import AuthController from '../../controllers/AuthController';

export const logInContainer = () => {
  const loginInput = new InputContainer({
    className: 'form-input',
    placeholder: 'Логин',
    type: 'text',
    name: FieldsName.LOGIN,
  });

  const passwordInput = new InputContainer({
    className: 'form-input',
    placeholder: 'Пароль',
    type: 'password',
    name: FieldsName.PASSWORD,
  });

  const signInButton = new Button({
    label: 'Авторизоваться',
    className: 'primary',
    attr: {
      type: 'submit',
    },
  });

  const logInButton = new Button({
    label: 'Нет аккаунта?',
    className: 'link',
    events: {
      click: () => router.go('/sign-up'),
    },
  });

  const form = new Form({
    inputs: [loginInput, passwordInput],
    buttons: [signInButton, logInButton],
    events: {
      submit: (event) => {
        event.preventDefault();
        const formObj = form.getForm() as unknown as SignInData;
        const isFormInValid = form.isFormInValid();
        if (!isFormInValid) {
          AuthController.signIn(formObj);
        }
      },
    },
  });

  const logIn = new LogInPage({
    form,
    title: 'Вход',
  });
  return logIn;
};
