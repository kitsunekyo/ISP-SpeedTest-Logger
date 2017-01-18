# Automated Speedtest + Log Chart
This package allows you to log speedtests to prove how shitty your ISP really is and hopefully find a solution together with them.

## Requirements
* OS: Unix (I'm using a Synology NAS)
* nodejs
* npm packages: http-server, forever

## Installation
1. First install the required npm packages:
```npm install -g http-server forever```

2. Edit `speedtest.sh` and change the location of your log file to wherever you want to have it. Remember thatt this has to be an absolute URI.

3. Configure a cronjob for this script with `crontab -e` or `/etc/crontab`. My NAS has a feature to configure this via a "Task Scheduler" in the web interface.    
You can set it up however you like, log daily, weekly or per hour.    
Read more on crontab here. [https://wiki.ubuntuusers.de/Cron/](https://wiki.ubuntuusers.de/Cron/)


