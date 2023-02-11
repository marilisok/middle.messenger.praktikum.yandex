## Описание

Проектная работа представляет из себя чат, выполненный в рамках обучения на курсе "Яндекс Практикум. Мидл фронтенд-разработчик."

## Текущий этап

Спринт 1 из 4

## Спринт 1

- Свёрстан макет приложения чат в Figma. [Ссылка на макет](https://www.figma.com/file/DQjQTSdA6jVBhpXkuGjBkl/chat?node-id=0%3A1&t=3iFLkz13wK9Cdkph-0)
- Настроена сборка с использованием Parcel и раздача статики сервером на Express.
- Свёрстаны основные страницы приложения с использованием шаблонизатора Handlebars.
- Приложение автоматически деплоится на Netlify из ветки deploy. [Ссылка на приложение](https://deploy--ubiquitous-semolina-b24042.netlify.app/)

## Установка и запуск

### Установка

Установка зависимостей проекта:

```bash
npm i
```

### Сборка и запуск

Сборка проекта. Используемый сборщик [Parcel](https://parceljs.org/):

```bash
npm run build
```

Выполняется сборка и запуск статического сервера на Express, на порту 3000. http://localhost:3000:

```bash
npm run start
```
