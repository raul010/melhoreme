#!/bin/bash
mongod --shutdown

nohup mongod &
sleep 5
rm -r .bin/db-backup/*
mongodump --db "melhoreme-test" -o .bin/db-backup/
mongodump --db "admin" -o .bin/db-backup/

mongod --shutdown
