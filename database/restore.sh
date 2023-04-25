#!/bin/bash
mongorestore --host localhost:27017 -u mongo -p mongo --authenticationDatabase admin --nsInclude=simple-api.* --archive=database/simple-api.archive --drop --noIndexRestore --numParallelCollections=4 --numInsertionWorkersPerCollection=2
