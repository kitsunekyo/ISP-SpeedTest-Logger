# ISP SpeedTest Logger 
If you're on a LTE, 4G, 5G, ... connection, and want to review how (💩) it holds up over time, this should do the trick for you. 
This webapp allows you to periodically run speedtests (node.js), store the results (mongodb), and review your network quality in a web ui.

> You can for example throw this container-set on a raspberry pi with docker-host, and leave it running.

## Features
- Review Network performance over time in UI
- Configure automated speedtests to run every 24/12/6 hours
- Easily deploy and run through docker

![screenshot](screenshot.png)

## Requirements 📦
- docker + docker-compose installed
- shared drive in docker
- host machine should have internet access

## Usage
Run `docker-compose up -d` to build and start all docker containers (db, frontend, api). It will also automatically build frontend and backend on the first startup.

> docker-compose.yml has defaults for environment variables. should you want to use it without docker, create an `.env` file in `./server`, that holds your application config. (rename the example)

Frontend is available on `http://localhost:8080/speedtest`

API can be accessed directly via curl on port 3000 (default).
Use POST `localhost:3000/speedtest` to start a speedtest and log it to mongodb.

<a href="https://www.buymeacoffee.com/aspieslechner" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
