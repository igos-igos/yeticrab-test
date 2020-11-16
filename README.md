# Yeticrab Test

## Стек
express.js, mongodb, react.js

## Установка
`npm install` - устанавливает зависимости в корне проекта

`npm run client:install` - устанавливает зависимости в диретктории `client`

## Скрипты
`npm run dev` - запускает режим разработки(бэкенд, фронтенд)

## API

`GET` `/api/applications/` - получить список заявок

`GET` `/api/applications/:number` - получить заявку по номеру

`POST` `/api/applications/create` - создать заявку

`PATCH` `/api/applications/change/:number` - изменить заявку по номеру

`DELETE` `/api/applications/delete/:number` - удалить заявку по номеру
