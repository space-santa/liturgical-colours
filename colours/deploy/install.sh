#!/bin/bash
mkdir -p /opt/bin
cp PLACEHOLDER.jar /opt/bin/

cp liturgical-colours.service /etc/systemd/system/

sudo systemctl daemon-reload
sudo systemctl enable liturgical-colours.service

sudo systemctl start liturgical-colours.service
