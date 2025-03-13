# Hello

## seed database

```
# To load data using gradle:
./gradlew bootRun -Pargs="load-data"

# The same thing using the final jar would be
java -jar liturgical-colours.jar load-data
```

## run with prod profile

```
./gradlew bootRun -Dspringl.profiles.active=prod
```
