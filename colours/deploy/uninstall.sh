#!/bin/bash
rm /opt/bin/PLACEHOLDER.jar

sudo systemctl stop liturgical-colours.service
sudo systemctl disable liturgical-colours.service

rm  /etc/systemd/system/liturgical-colours.service

sudo systemctl daemon-reload
