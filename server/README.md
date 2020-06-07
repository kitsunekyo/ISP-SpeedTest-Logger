# Server / Application
This app will allow you to run [speedtests](https://github.com/ddsol/speedtest.net#readme) on nodejs, and persist the results with lowdb. The results are exposed as CR(UD) via an expressjs api.

## Installation
Install dependencies with `npm i`.

## Usage

### Schedule Speedtest
To schedule the speedtest, setup a cronjob on your unix system, or scheduled task on windows to run `node ./schedule.js`. This will execute a speedtest and persist it via [lowdb](https://github.com/typicode/lowdb).

For example, to run a speedtest every 12 hours (cron): 

`0 */12 * * * /usr/local/bin/node /home/username/code/internet-speed-log/server/schedule.js`

### Run API (optional)

Run the API by running `node .` in this directory. This will allow you to perform http requests to read test results on `localhost:3000/speedtest`

GET `/speedtest`: lists results as array

POST `/speedtest/`: manually triggers a speedtest and persists it in lowdb

GET `/speedtest/:resultId`: returns specific result


## Requirements
- NodeJs > 8

## Stack
- [ExpressJs](https://expressjs.com/de/)
- [lowdb](https://github.com/typicode/lowdb)
- [speedtest-net](https://github.com/ddsol/speedtest.net#readme)