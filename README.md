## Description

[TTT app](https://github.com/viwnu/test-task-tracker) Test Task Tracker app.

## Installation

```bash
$ npm install
```

## DB Setup

first create DB in Postgres with name `test_task_tracker`
than:

```bash
$ npm run db:migrate-prod #or dev
$ npm run db:seed-prod #or dev
```

## Running the app

```bash
# development
# start api server:
$ npm run start:api

# start web ui:
$ npm run start:web

#start both together:
$ npm run dev
#or on Windows:
$ npm run dev:cmd

# production
$ docker compose up -d --build
```
