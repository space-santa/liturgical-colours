#!/bin/bash

# Source environment variables
source /opt/liturgical-colours/db.conf

# Run the application with the prod profile
java -jar PLACEHOLDER.jar load-data --spring.profiles.active=prod
