#!/bin/bash

# Source environment variables
source /opt/liturgical-colours/db.conf

# Run the application with the prod profile
java -jar /opt/liturgical-colours/bin/PLACEHOLDER.jar --spring.profiles.active=prod
