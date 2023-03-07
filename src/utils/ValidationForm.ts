import {FieldsName} from './FieldsName';

const REG_NAME = /([^А-ЯЁA-Z\-])/gi;
const REG_LOGIN = /[^A-Z\-_0-9]/gi;
const REG_LATIN = /[a-z]/i;
const REG_EMAIL = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
const REG_PASSWORD = /(?=.*[0-9])(?=.*[A-Z])/g;
const REG_PHONE = /(?:\+|\d)[\d]/g;

const MIN_LOGIN_LENGTH = 3;
const MAX_LOGIN_LENGTH = 20;

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 40;

const MIN_PHONE_LENGTH = 10;
const MAX_PHONE_LENGTH = 15;

export const validationForm = ( key: string, value: string ) => {
  if (value.length === 0 && Object.values(FieldsName).includes(key)) {
    return `Заполните поле ${key}`;
  }

  switch (key) {
    case FieldsName.EMAIL: {
      if (!REG_EMAIL.test(value)) {
        return 'Почта должна быть на латинице, должна быть @ и точка после неё, но до точки должны быть буквы';
      }
      return '';
    }
    case FieldsName.FIRST_NAME:
    case FieldsName.SECOND_NAME: {
      const field = key === FieldsName.FIRST_NAME? 'Имя': 'Фамилия';
      if (REG_NAME.test(value)) {
        return `Поле ${field} должно быть на латиница или кирилице, допустим -`;
      }

      if (value[0] !== value[0].toUpperCase()) {
        return `${field} не с заглавной буквы`;
      }
      return '';
    }
    case FieldsName.PHONE: {
      if (!REG_PHONE.test(value)) {
        return 'Телефон должен состоять только из цифр';
      }

      if (value.length < MIN_PHONE_LENGTH || value.length > MAX_PHONE_LENGTH) {
        return `Длина телефона должна быть от ${MIN_PHONE_LENGTH} до ${MAX_PHONE_LENGTH} символов`;
      }
      return '';
    }
    case FieldsName.OLD_PASSWORD:
    case FieldsName.PASSWORD_REPEAT:
    case FieldsName.PASSWORD:
    case FieldsName.PASSWORD_REPEAT: {
      if (!REG_PASSWORD.test(value)) {
        return 'В пароле должны быть обязательно хотя бы одна заглавная буква и цифра';
      }

      if (value.length < MIN_PASSWORD_LENGTH || value.length > MAX_PASSWORD_LENGTH) {
        return `Длина пароля должна быть от ${MIN_PASSWORD_LENGTH} до ${MAX_PASSWORD_LENGTH} символов`;
      }
      return '';
    }
    case FieldsName.LOGIN: {
      if (!REG_LATIN.test(value) || REG_LOGIN.test(value)) {
        return 'Логин должен быть только на латинице, не состоять только из цифр, допустимы - и _';
      }

      if (value.length < MIN_LOGIN_LENGTH || value.length > MAX_LOGIN_LENGTH) {
        return `Длина логина должна быть от ${MIN_LOGIN_LENGTH} до ${MAX_LOGIN_LENGTH} символов`;
      }
      return '';
    }
    default:
      return '';
  }
};
