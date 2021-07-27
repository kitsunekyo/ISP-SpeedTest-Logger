# ISP SpeedTest Logger

![NodeJS v12](https://img.shields.io/badge/node-v12-green?style=flat)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=flat&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=flat&logo=docker&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=flat&logo=mongodb&logoColor=white)

If you're on a LTE, 4G, 5G, ... connection, and want to review how (💩) it holds up over time, this should do the trick for you.
This webapp allows you to periodically run speedtests (node.js), store the results (mongodb), and review your network quality in a web ui.

> You can for example throw this container-set on a raspberry pi with docker-host, and leave it running.

## Features

-   Review Network performance over time in UI
-   Configure automated speedtests to run every 24/12/6 hours
-   Easily deploy and run through docker

![screenshot](screenshot.png)

## Requirements 📦

-   docker + docker-compose installed
-   shared drive in docker
-   host machine should have internet access

## Usage

Admin pw can be set in `.env` -> `ADMIN_PW`

### docker-compose

Run `docker-compose up -d` to build and start all docker containers (db, frontend, api). It will also automatically build frontend and backend on the first startup.

> docker-compose.yml has defaults for environment variables. should you want to use it without docker, create an `.env` file in `./server`, that holds your application config. (rename the example)

### development

During development you might want to run mongodb via docker, but run the api / frontend locally.

Install dependencies first with `npm install`, both in server and client.

You can then run `npm start`, to start the application in dev mode.

Frontend is available on `http://localhost:8080/speedtest`

API can be accessed directly via curl on port 3000 (default).
Use POST `localhost:3000/speedtest` to start a speedtest and log it to mongodb.

<a href="https://www.buymeacoffee.com/aspieslechner" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
