# Service aggregates football fixtures and exposes the APIs to serves the expectations requests.

- [Introduction](#introduction)
- [Database](#database)
  - [Teams](#teams)
  - [Tournaments](#tournaments)
  - [Seasons](#seasons)
  - [Scores](#scores)
  - [Venues](#venues)
  - [Fixtures](#fixtures)
- [Install](#install)
  - [Setup Environment](#setup-environment)
    - [Installation](#installation)
    - [Environment Configuration](#environment-configuration)
    - [Start Mysql Using Docker](#start-mysql-using-docker)
    - [Run Database Migrations](#run-database-migrations)
    - [Run Database Seeds](#run-database-seeds)
- [Application Commands](#application-commands)
- [API Endpoints](#api-endpoints)
  - [GET - /api/v1/fixtures](#get---apiv1fixtures)
  - [GET - /api/v1/calendar](#get---apiv1calendar)
  - [GET - /health](#get---health)
- [Documents](#documents)
  - [API Document](#api-document)


## Introduction
Service aggregates football fixtures and exposes the APIs to serves the expectations requests


## Database
Mysql database serves as a storage in the application (Mysql required).

### Teams
- Table name: teams

| Column       | Type    | Description                                              | Attributes                        |
|--------------|---------|----------------------------------------------------------|-----------------------------------|
| id           | uuid    | This unique ID of team                                   | required (unique)                 |
| name         | varchar | Name of the football team (Ex: Everton)                  | required                          |
| code         | varchar | The shorten name of the team (Ex: Everton)               | required                          |
| logo         | varchar | Url which is link where team's logo stored (Ex: Everton) | required                          |
| tournamentId | uuid    | Foreign key referencing the Tournaments table            | required (foreign key constraint) |

### Tournaments
- Table name: tournaments

| Column  | Type     | Description                                               | Attributes                        |
|---------|----------|-----------------------------------------------------------|-----------------------------------|
| id      | uuid     | This unique ID of tournament                              | required (unique)                 |
| name    | varchar  | Name of the tournament (Ex: Premier League)               | required                          |
| country | varchar  | Country where the tournament happens (Ex: United Kingdom) | required                          |

### Seasons
- Table name: seasons

| Column  | Type    | Description                   | Attributes                        |
|---------|---------|-------------------------------|-----------------------------------|
| id      | uuid    | This unique ID of season      | required (unique)                 |
| name    | varchar | Name of the season (Ex: 2023) | required                          |

### Scores
- Table name: scores

| Column        | Type | Description                                                             | Attributes                        |
|---------------|------|-------------------------------------------------------------------------|-----------------------------------|
| id            | uuid | This unique ID of score                                                 | required (unique)                 |
| homeTeamScore | int  | The score of which is the team playing in their home venue (Ex: 7)      | required                          |
| awayTeamScore | int  | The score of which is the team playing in opponent's home venue (Ex: 0) | required                          |

### Venues
- Table name: venues

| Column  | Type    | Description                                               | Attributes                        |
|---------|---------|-----------------------------------------------------------|-----------------------------------|
| id      | uuid    | This unique ID of venue                                   | required (unique)                 |
| name    | varchar | Name of the venue (Ex: Stamford Bridge)                   | required                          |
| city    | varchar | The city where the venue situated (Ex: London)            | required                          |
| country | varchar | The country where the venue situated (Ex: United Kingdom) | required                          |

### Fixtures
- Table name: fixtures

| Column       | Type                              | Description                                                                                  | Attributes                        |
|--------------|-----------------------------------|----------------------------------------------------------------------------------------------|-----------------------------------|
| id           | uuid                              | This unique ID of fixture                                                                    | required (unique)                 |
| matchStatus  | enum("NEW", "IN-MATCH", "PLAYED") | Status of this match (Ex: NEW)                                                               | required                          |
| round        | int                               | Round of this match, which is belong a tournament (Ex: 35)                                   | required                          |
| matchDate    | varchar                           | The date that match happen (Ex: 2020-05-04 00:00:00.000)                                     | required                          |
| matchTime    | varchar                           | The time that match happen (Ex: 18:30)                                                       | required                          |
| seasonId     | uuid                              | Foreign key referencing the Seasons table                                                    | required (foreign key constraint) |
| tournamentId | uuid                              | Foreign key referencing the Tournaments table                                                | required (foreign key constraint) |
| venueId      | uuid                              | Foreign key referencing the Venue table                                                      | required (foreign key constraint) |
| scoreId      | uuid                              | Foreign key referencing the Score table                                                      | required (foreign key constraint) |
| homeTeamId   | uuid                              | Foreign key referencing the Team table (Which is the team who play in their home venue)      | required (foreign key constraint) |
| awayTeamId   | uuid                              | Foreign key referencing the Team table (Which is the team who play in opponent's home venue) | required (foreign key constraint) |


## Install

### Setup Environment

#### Installation

Before starting to explore this application. You have to make sure your machine has some following required services below:

- `Node verion >= 16` (Required)
- `Docker client` (Required)
- `Mysql Server` (Required)
- Run the command `npm i` to install all the dependencies of this application.

#### Environment Configuration

Following `apps/football-fixtures/.env.example` file, you have to create a new copy file called `apps/football-fixtures/.env`. This is where the environments variables are situated. The following variables below must be declared in the `.env` file.

```dotenv
# The running environment of the application
NODE_ENV=development
# The running port of the application
PORT=4000
# The address where hosted application
HOST=0.0.0.0

#The database type
DB_TYPE=mysql
# The database username
DB_USER=root
# The database password
DB_PASSWORD=root
# The database name
DB_NAME=football
# The database host
DB_HOST=127.0.0.1
# The database port
DB_PORT=3306
```

#### Start Mysql Using Docker
Following the command below to start the Mysql locally using docker.

```bash
$ docker run --name mysql -d -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=football -p 3306:3306 mysql:5.7
```

#### Run Database Migrations
Following the command below to migration all the designed database tables.

```bash
$ npm run football-fixtures:migration:run
```

#### Run Database Seeds
Following the command below to generate all the seeding data for these tables.

```bash
$ npm run football-fixtures:seed:run
```

## Application Commands

After setting up the required configuration and environment variables, run the following command below to make the application start

```bash
## Application starting ##
# build football-fixtures application
$ npm run build:football-fixtures

# start the application in development mode
$ npm run start:football-fixtures:dev

# start the application in production mode
$ npm run start:football-fixtures:prod

## Unit test and Integration test ##
# Run the test if using Mysql locally
$ npm run test

# Run the test if using Mysql locally with docker compose (This also supports for the CI/CD testing)
$ npm run test:compose

## Coding format and rules check ##
# format the code styles
$ npm run format

# Lint checking the coding rules
$ npm run lint

# Lint fix the violates coding rules
$ npm run lint:fix

## Using Docker container to start the whole application and other required service like Mysql ##
# Start the application using Docker development
$ docker-compose up

# Force the application running with Docker in the background
$ docker-compose up -d
```

---

## API Endpoints

### GET - /api/v1/fixtures

Endpoint allows fetch all the fixtures for non given filters or given filters.

> Auth Type: NONE

#### Query Params<!-- omit in toc -->

| Property   | Description                                                                           | Type                              | Specificity  |
|------------|---------------------------------------------------------------------------------------|-----------------------------------|--------------|
| id         | Id of the fixture                                                                     | uuid                              | **optional** |
| ids        | String ids of the fixtures, must be contain only 20 ids (Ex: "aa-dd-ff, jj-kk-dd")    | string                            | **optional** |
| tournament | Id of the tournament where the matches belong (Ex: "dhdhd-wuwuuw-dkdkd-sjsj")         | uuid                              | **optional** |
| season     | Id of the season where the matches belong (Ex: "dhdhd-wuwuuw-dkdkd-sjsj")             | uuid                              | **optional** |
| team       | Id of the home team or away team who play the matches (Ex: "dhdhd-wuwuuw-dkdkd-sjsj") | uuid                              | **optional** |
| venue      | Id of venue where matches happen (Ex: "dhdhd-wuwuuw-dkdkd-sjsj")                      | uuid                              | **optional** |
| score      | Id of score where stored the result of the matches (Ex: "dhdhd-wuwuuw-dkdkd-sjsj")    | uuid                              | **optional** |
| round      | Round of the matches (Ex: 35)                                                         | string                            | **optional** |
| status     | Status of the matches (EX: "PLAYED")                                                  | enum("NEW", "IN-MATCH", "PLAYED") | **optional** |
| matchDate  | Date of the matches when it happen (Ex: "2020-05-04 00:00:00.000")                    | string                            | **optional** |
| startDate  | Date of the matches when it happen (Ex: "2020-05-04 00:00:00.000")                    | string                            | **optional** |
| endDate    | Date of the matches when it happen (Ex: "2020-05-04 00:00:00.000")                    | string                            | **optional** |
| page       | Paging of the list fixture (Default: page=1)                                          | string                            | **optional** |
| size       | Size of the list fixture based on paging (Default: size=10)                           | string                            | **optional** |

#### Checks<!-- omit in toc -->
- Checks the validity of filter params type if there is any params presence
- Checks the validity of list filters ids, it must be maximum 20 ids
- Checks the validity of startDate and endDate if one entered then another one should be entered too

#### Response<!-- omit in toc -->

200

```jsonc
{
  "data": [
        {
            "id": "b01144e1-b74e-465a-a406-c62fc60f4550",
            "createdAt": "2023-05-06T21:59:36.000Z",
            "updatedAt": "2023-05-06T21:59:36.000Z",
            "matchStatus": "NEW",
            "round": 38,
            "matchDate": "2023-05-05T17:00:00.000Z",
            "matchTime": "20:04",
            "season": {
                "id": "19f6bcd5-e9ca-4d04-8281-e76a5152b9c4",
                "createdAt": "2023-05-06T21:59:36.000Z",
                "updatedAt": "2023-05-06T21:59:36.000Z",
                "name": 2023
            },
            "venue": {
                "id": "a2b9dd18-46db-4747-b7dd-6344f111c5f0",
                "createdAt": "2023-05-06T21:59:36.000Z",
                "updatedAt": "2023-05-06T21:59:36.000Z",
                "name": "City of Manchester Stadium",
                "city": "Manchester",
                "country": "United Kingdom"
            },
            "tournament": {
                "id": "3532d4de-7090-49e9-8785-b003cf17138a",
                "createdAt": "2023-05-06T21:59:36.000Z",
                "updatedAt": "2023-05-06T21:59:36.000Z",
                "name": "Premier League",
                "country": "United Kingdom"
            },
            "homeTeam": {
                "id": "bb3e24da-7278-4575-904c-af4ff842b4b6",
                "createdAt": "2023-05-06T21:59:36.000Z",
                "updatedAt": "2023-05-06T21:59:36.000Z",
                "name": "Liverpool",
                "code": "LIVER",
                "logo": "https://unequaled-favor.com"
            },
            "awayTeam": {
                "id": "4437c772-54e3-4183-bcf6-bbcd9cddb376",
                "createdAt": "2023-05-06T21:59:36.000Z",
                "updatedAt": "2023-05-06T21:59:36.000Z",
                "name": "Newcastle United",
                "code": "NEWCASTLE",
                "logo": "http://quaint-neuropathologist.com"
            },
            "score": {
                "id": "39a3a1c9-438c-483c-9863-ba6553e6ba77",
                "createdAt": "2023-05-06T21:59:36.000Z",
                "updatedAt": "2023-05-06T21:59:36.000Z",
                "homeTeamScore": 1,
                "awayTeamScore": 1
            }
        }
      ],
   "total": 1,
    "currentPage": 1,
    "size": 1,
    "lastPage": 1,
    "nextPage": null,
    "prevPage": null    
}
```

400

```jsonc
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": ["name should be a string"]
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

---

### GET - /api/v1/calendar

Endpoint allows fetch all the enabled matches for non given filters or given filters.

> Auth Type: NONE

#### Query Params<!-- omit in toc -->

| Property   | Description                                                                           | Type                              | Specificity  |
|------------|---------------------------------------------------------------------------------------|-----------------------------------|--------------|
| tournament | Id of the tournament where the matches belong (Ex: "dhdhd-wuwuuw-dkdkd-sjsj")         | uuid                              | **optional** |
| season     | Id of the season where the matches belong (Ex: "dhdhd-wuwuuw-dkdkd-sjsj")             | uuid                              | **optional** |
| venue      | Id of venue where matches happen (Ex: "dhdhd-wuwuuw-dkdkd-sjsj")                      | uuid                              | **optional** |
| matchDate  | Date of the matches when it happen (Ex: "2020-05-04 00:00:00.000")                    | string                            | **optional** |
| startDate  | Date of the matches when it happen (Ex: "2020-05-04 00:00:00.000")                    | string                            | **optional** |
| endDate    | Date of the matches when it happen (Ex: "2020-05-04 00:00:00.000")                    | string                            | **optional** |

#### Checks<!-- omit in toc -->
- Checks the validity of filter params type if there is any params presence
- Checks the validity of startDate and endDate if one entered then another one should be entered too

#### Response<!-- omit in toc -->

200

```jsonc
{
    "enabledMatchDates": [
        {
            "matchDate": "2020-05-04 00:00:00.000",
            "numberOfMatches": "6"
        },
        {
            "matchDate": "2019-05-06 00:00:00.000",
            "numberOfMatches": "6"
        }
    ]
}
```

400

```jsonc
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": ["name should be a string"]
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

---

### GET - /health

The default endpoint runs in the middleware when you start running the application. This serves to check the health status of this application.

> Auth Type: NONE

#### Response<!-- omit in toc -->

200 - OK

---

## Documents

### API Document

After starting the command `npm run start:football-fixtures:dev` or `npm run start:football-fixtures:prod`, you can land on API document page which is`http://${url}:${port}/ws-football-fixtures-api/documents/static/index.html` and all documents for the implemented endpoints are situated there.
