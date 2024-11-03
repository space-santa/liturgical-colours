#!/bin/bash
cp PLACEHOLDER.jar /opt/liturgical-colours/bin/

sudo systemctl stop liturgical-colours.service
sudo systemctl start liturgical-colours.service
