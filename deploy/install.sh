#!/bin/bash
sudo mkdir -p /opt/liturgical-colours/
sudo chown -R $(whoami):$(whoami) /opt/liturgical-colours/

mkdir -p /opt/liturgical-colours/bin
mkdir -p /opt/liturgical-colours/data

cp PLACEHOLDER.jar /opt/liturgical-colours/bin/
cp *.sh /opt/liturgical-colours/bin/
cp db.conf /opt/liturgical-colours/

sudo cp liturgical-colours.service /etc/systemd/system/

sudo systemctl daemon-reload
sudo systemctl enable liturgical-colours.service
