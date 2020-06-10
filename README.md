# ISP SpeedTest Logger 
If you're on a LTE, 4G, 5G, ... connection, and want to review how (💩) it holds up over time, this should do the trick for you. 
This webapp allows you to periodically run speedtests (node.js), store the results (mongodb), and review your network quality in a web ui.

![screenshot](screenshot.png)

## Requirements 📦
- docker + docker-compose installed
- shared drive in docker
- host machine should have internet access

## Usage
1. Create an `.env` file in `./server`, that holds your application config. (rename the example)
2. Run `docker-compose up -d` to build and start all docker containers (db, frontend, api). It will also automatically build frontend and backend on the first startup.

Frontend is available on `http://localhost:8080/speedtest`

API can be accessed directly via curl on port 3000 (default).
Use POST `localhost:3000/speedtest` to start a speedtest and log it to mongodb.

### Automated Speedtests ⌚

If you're on unix (raspberry pi, ...) you can now schedule a **cronjob** to automatically hit this endpoint every 12 hours.
> Technically, you could also schedule the cronjob on one of the containers, and keep them running forever.

```
// run speedtest every 12 hours
0 */12 * * *  /usr/bin/curl --silent --request POST http://localhost:3000/speedtest &>/dev/null
```
