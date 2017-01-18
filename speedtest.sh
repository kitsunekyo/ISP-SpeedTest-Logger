#!/bin/sh
SPEED_RESULT=[$(python /data/aspieslechner/speedtest-cli --json)]
TMP=$(jq '.log |= .+ '"$SPEED_RESULT" /data/aspieslechner/www/drei/log.json)
echo $TMP > /data/aspieslechner/www/drei/log.json
echo 'Last Speedtest:'
jq '.log[-1]' /data/aspieslechner/www/drei/log.json