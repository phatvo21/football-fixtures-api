# Service serves simple apis management.

- [Install](#install)
  - [Setup Environment](#setup-environment)
    - [Installation](#installation)
    - [Environment Configuration](#environment-configuration)
    - [Run database and seeding data](#run-database-and-seeding-data)
- [Commands](#commands)
- [API Endpoints](#api-endpoints)
  - [POST - /simple-apis](#post---simple-apis)
  - [GET - /health](#get---health)
- [Documents](#documents)
  - [API Document](#api-document)

## Install

### Setup Environment

#### Installation

Before starting to explore this application. You have to make sure your machine has a Node version >= 15.

- `Node verion >= 15` (Required)
- `Docker client` (Required)
- Run the command `npm i` to install all the dependencies of this application.

#### Environment Configuration

Following `apps/simple-api/.env.example` file, you have to create a new copy file called `apps/simple-api/.env`. This is where the environments variables are situated. The following variables below must be declared in the `.env` file.

- `NODE_ENV=development or NODE_ENV=production` (The running environment of the application)
- `APP_PORT=4000` (The running port of the application)
- `APP_HOST=0.0.0.0` (The address where hosted application)
- `DATABASE_URL=mongodb://mongo:mongo@localhost:27017/simple-api?authSource=admin` (The string hold all database's credentials)

#### Run database and seeding data

```bash
$ docker-compose up -d mongo mongo-express
$ npm run db:restore

You can check web dashboard (mongo-express) on http://localhost:8081
```

## Commands

By using the following commands you will make the application work in the proper way.

```bash
# format the code styles
$ npm run format

# lint, checking the coding rules
$ npm run lint

# lint, fix violents coding rules
$ npm run lint:fix

# build simple-api application
$ npm run build:simple-api

# start the application using Docker development
$ docker-compose up

# force the application running with Docker in the background
$ docker-compose up -d

# development
$ npm run start:simple-api:dev

# production mode
$ npm run start:simple-api:prod
```

## API Endpoints

### POST - /simple-apis

Endpoint allows create a simple api.

> Auth Type: NONE

#### Body Request<!-- omit in toc -->

| Property | Type   | Specificity  |
|----------|--------|--------------|
| owner    | number | **required** |
| name     | string | **required** |
| company  | string | **required** |

#### Response<!-- omit in toc -->

201

```jsonc
{
  "owner": 21,
  "name": "idCandate"
  "company" "Stesundby"
}
```

400

```jsonc
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": ["owner should be a integer", "name should not be a string."]
}
```

500

```jsonc
{
  "statusCode": 500,
  "error": "Internal Server Error",
  "message": "Database connection error"
}
```

### GET - /health

The default endpoint runs in the middleware when you start running the application. This serves to check the health status of this application.

> Auth Type: NONE

#### Response<!-- omit in toc -->

200 - OK

## Documents

### API Document

After starting the command `npm run start:simple-api:dev` or `npm run start:simple-api:prod`, you can land on API document page which is`http://${url}:${port}/ws-simple-api/documents/static/index.html` and all documents for the implemented endpoints are situated there.
