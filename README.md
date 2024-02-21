# Stay Book

<p align="center"> 
    <img width="400" src="https://github.com/emanuelly-b-s/Reservation-Systems-Hotel/blob/main/frontend/assets/logo.png" alt="Logo">
</p>

## Description

Stay Book is a mobile application designed to book hotel rooms in an easy and intuitive way.
The application is made using react native for the frontend and nodejs for the backend, mongodb is also used as a database for the project and jwt for data validation and encryption.

## Documentation

#### Install Dependencies

```
    npm install
```

#### Start Project

Frontend
```
    npx expo start
```
Backend
```
    npm start run
```

## API Reference

#### Retorna um jwt do usuário e se esse usuário foi validado

```http
  http://localhost:8080/api/auth/login
```

| Parameter | Type     | 
| :-------- | :------- | 
| `email` | `string` | 
| `password` | `string` | 

#### Cadastra o usuário no banco de dados

```http
  http://localhost:8080/api/auth/register
```

| Parameter | Type     | 
| :-------- | :------- | 
| `username` | `string` | 
| `email` | `string` | 
| `password` | `string` |

#### Cria um token de validação de email para o usuário e envia o código para seu respectivo email

```http
  http://localhost:8080/api/token/new
```

| Parameter | Type     | 
| :-------- | :------- | 
| `jwtUser` | `string` | 


#### Compara o token do usuário e atualiza o banco de dados, validando o usuário

```http
  http://localhost:8080/api/token/compare
```

| Parameter | Type     | 
| :-------- | :------- | 
| `code` | `string` | 
| `jwtUser` | `string` | 

#### Cria um quarto

```http
  http://localhost:8080/api/room/
```

| Parameter | Type     | 
| :-------- | :------- | 
| `title` | `string` | 
| `capacity` | `number` | 
| `doubleBed` | `number` | 
| `singleBed` | `number` | 
| `price` | `number` | 
| `rate` | `number` | 
| `hotel` | `string` |
| `description` | `string` | 
| `category` | `[string]` |
| `image` | `[string]` |
| `available` | `boolean` |

#### Retorna todos os quartos

```http
  http://localhost:8080/api/room/getAll
```

#### Retorna os quartos dentro de um range específico

```http
  http://localhost:8080/api/room/get 
```

| Parameter | Type     | 
| :-------- | :------- | 
| `start` | `number` | 
| `end` | `number` | 

#### Retorna o quarto que corresponde ao código enviado

```http
  http://localhost:8080/api/room/getRoom
```

| Parameter | Type     | 
| :-------- | :------- | 
| `code` | `string` | 

#### Cria um hotel

```http
  http://localhost:8080/api/hotel/
```

| Parameter | Type     | 
| :-------- | :------- | 
| `title` | `string` | 
| `description` | `string` | 
| `rate` | `number` | 
| `tags` | `[string]` | 
| `contact` | `[string]` | 
| `image` | `[string]` | 
| `location` | `[string]` | 

#### Retorna todos os hoteis

```http
  http://localhost:8080/api/hotel/getAll
```

#### Retorna os hoteis dentro de um range específico

```http
  http://localhost:8080/api/hotel/get 
```

| Parameter | Type     | 
| :-------- | :------- | 
| `start` | `number` | 
| `end` | `number` |

#### Cria uma reserva

```http
  http://localhost:8080/api/booking/
```

| Parameter | Type     | 
| :-------- | :------- | 
| `startDate` | `string` | 
| `endDate` | `string` | 
| `user` | `string` | 
| `numberAdults` | `number` | 
| `numberChildren` | `number` | 
| `roooms` | `[string]` |

## References

 - [Figma](https://www.figma.com/file/C1tbOsJ6RkFcd9IiVwERDq/StayBook?type=design&node-id=0%3A1&mode=design&t=EENO6ANqgxMt6kt1-1)


## Authors

- [@emanuelly-b-s](https://github.com/emanuelly-b-s)
- [@NycollasSobolevski](https://github.com/NycollasSobolevski)
- [@Hemershow](https://github.com/Hemershow)
- [@FelipeTakiguchi](https://github.com/FelipeTakiguchi)
