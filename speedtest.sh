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