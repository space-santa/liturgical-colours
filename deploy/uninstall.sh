#!/bin/bash
sudo rm -rf /opt/liturgical-colours/

sudo systemctl stop liturgical-colours.service
sudo systemctl disable liturgical-colours.service

sudo rm  /etc/systemd/system/liturgical-colours.service

sudo systemctl daemon-reload
