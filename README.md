## Описание

Проектная работа представляет из себя чат, выполненный в рамках обучения на курсе "Яндекс Практикум. Мидл фронтенд-разработчик."

## Текущий этап

Спринт 4 из 4

## Ссылка на приложение

[Netlify](https://ubiquitous-semolina-b24042.netlify.app/)

## Спринт 1

- Свёрстан макет приложения чат в Figma. [Ссылка на макет](https://www.figma.com/file/DQjQTSdA6jVBhpXkuGjBkl/chat?node-id=0%3A1&t=3iFLkz13wK9Cdkph-0)
- Настроена сборка с использованием Parcel и раздача статики сервером на Express.
- Свёрстаны основные страницы приложения с использованием шаблонизатора Handlebars.
- Приложение автоматически деплоится на Netlify из ветки deploy. [Ссылка на приложение](https://deploy--ubiquitous-semolina-b24042.netlify.app/)

## Спринт 2

- Подключён TypeScript.
- Добавлен компонентный подход
- У всех форм есть валидация на focus, blur и submit.
- Добавлен класс для работы с запросами.
- Добавлен ESLint.

## Спринт 3

- Добавлен роутинг.
- Добавлена HTTP-часть API.
- Внедрены лайв-сообщения.

## Спринт 4

- Написаны тесты для компонента Input, роунтинга, утилиты helpers, модуля отправки запросов с использованием Mocha и Chai.
- Настроен Webpack.
- Настроена Docker-сборка.
- Настроен precommit на проект.
- Проведен аудит пакетов.

## Установка и запуск

### Установка

Установка зависимостей проекта:

```bash
npm i
```

### Сборка и запуск

```bash
npm run build
```

Выполняется сборка и запуск статического сервера на Express, на порту 3000. http://localhost:3000:

```bash
npm run start
```

