# Automated Speedtest + Log Chart
This package allows you to automatically log speedtests to prove how shitty your ISP really is and hopefully find a solution together with them.

If you have a NAS this is as easy as 'setup and forget', as the NAS will most likely run all the time and thus allow you to do speedtests at your desired frequence without having to turn on your PC or Mac.

## ChangeLog

29.01.2017:
* Small UI changes
* Added details about test runtime and sample size

22.01.2017: 
* Chart library changed to [amCharts.com](https://www.amcharts.com/) <br>You can now scroll, pan and zoom in the charts.
* Put translatable copy and configuration in `config.json`
* Added min and max values to details cards
* Minor Layout fixes
* Cleaned up vuejs code

## Live Demo

[http://nas.dasblattwerk.at:8080/drei/](http://nas.dasblattwerk.at:8080/drei/)

![Screenshot](https://raw.githubusercontent.com/kitsunekyo/internet-speed-log/master/img/screenshot.jpg)

## Requirements
* OS: Unix (I'm using a Synology NAS)
* ssh access to your server if you're using a NAS
* nodejs installed
* npm packages globally installed: http-server, forever
* speedtest-cli
* jq (json helper utility) ´brew install jq´

## Installation
Clone the repository
```
git clone https://github.com/kitsunekyo/internet-speed-log
```
Install the required npm packages if you havent already
```
npm install -g http-server forever
```
Install speedtest-cli to any location on your server:   
[https://github.com/sivel/speedtest-cli](https://github.com/sivel/speedtest-cli)

Initialize your data file
```
echo '{"log": []}' > /LOCATION/TO/log.json
```
Edit `speedtest.sh` and change the value of `LOG_FILE` and `SPEEDTEST_CLI` to the appropriate values.
Remember that both paths have to be an absolute URI.
```
#!/bin/sh
## Configuration
LOG_FILE=/data/aspieslechner/www/drei/log.json
SPEEDTEST_CLI=/data/aspieslechner/speedtest-cli
##

SPEED_RESULT=[$(python $SPEEDTEST_CLI --json)]
TMP=$(jq '.log |= .+ '"$SPEED_RESULT" $LOG_FILE)
echo $TMP > $LOG_FILE
echo 'Last Speedtest:'
jq '.log[-1]' $LOG_FILE
```

Configure a cronjob for this script with `crontab -e` or `/etc/crontab`. My NAS has a feature to configure this via a "Task Scheduler" in the web interface.    
You can set it up however you like, log daily, weekly or per hour.

Read more on crontab here. [https://wiki.ubuntuusers.de/Cron/](https://wiki.ubuntuusers.de/Cron/)

## Usage
Start the http-server and let it run with forever, so the process doesn't close once you shut down your ssh session.

```
forever start /usr/local/lib/node_modules/http-server/bin/http-server /LOCATION/TO/YOUR/FILES -d false
```
This will start a http-server on port 8080 and host the files you have in that location.

You can then navigate to http://yourserver:8080 and view the index.html. You might need to use the ip instead of `yourserver` if you don't have a dns entry or host alias for that machine.
