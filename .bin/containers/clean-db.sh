#!/bin/bash
# mongod --shutdown

mongo --port 27017 --eval 'db.adminCommand("shutdown")' >/dev/null 2>&1
echo 'INFO: Este script possui alguns "nohup > /dev/null"'
chown $USER.$USER /data/db/mongod.lock 
# mongod
nohup mongod >/dev/null 2>&1 &

# echo `nc -z localhost 27017; echo $?`

# verifica se mongod está rodando, para poder prosseguir
while [ `nc -z localhost 27017; echo $?` -eq 1 ]
do
    sleep 1
    echo 'Waiting Connection...'
done

if [ "$(ls -A .bin/db-backup)" ]; then
    rm -r .bin/db-backup/*
fi
# docker rm -f `docker ps -aq`
mongodump --db "melhoreme-test" -o .bin/db-backup/
mongodump --db "admin" -o .bin/db-backup/

# mongod --shutdown
nohup mongo --port 27017 --eval 'db.adminCommand("shutdown")' >/dev/null 2>&1 
