# Server / Application
This app will allow you to run [speedtests](https://github.com/ddsol/speedtest.net#readme) on nodejs, and persist the results with lowdb. The results are exposed as CR(UD) via an expressjs api.

## Use
Install dependencies with `npm i`.

Run the API by running `node .` in this directory.

## Schedule Speedtest
To schedule the speedtest, setup a cronjob on your unix system, or scheduled task on windows to run `node ./schedule.js`. This will execute a speedtest and persist it via [lowdb](https://github.com/typicode/lowdb).

## Requirements
- NodeJs > 8

## Stack
- [ExpressJs](https://expressjs.com/de/)
- [lowdb](https://github.com/typicode/lowdb)
- [speedtest-net](https://github.com/ddsol/speedtest.net#readme)