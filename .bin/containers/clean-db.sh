#!/bin/bash
# mongod --shutdown

nohup mongo --port 27017 --eval 'db.adminCommand("shutdown")' 2> /dev/null
echo 'Se algo der errado com a base, tirar "nohup * 2"> /dev/null do script '
nohup mongod &

# wait-for-mongo mongodb://127.0.0.1:27017/test 1000*60*1


# echo `ps -ef | grep mongod | grep -v grep | wc -l | tr -d ' '`
# echo `nc -z localhost 27017; echo $?`

# verifica se mongod está rodando, para poder prosseguir
while [ `nc -z localhost 27017; echo $?` -eq 1 ]
do
    sleep 1
    echo 'Waiting Connection...'
done

rm -r .bin/db-backup/*
mongodump --db "melhoreme-test" -o .bin/db-backup/
mongodump --db "admin" -o .bin/db-backup/

# mongod --shutdown
nohup mongo --port 27017 --eval 'db.adminCommand("shutdown")' 2> /dev/null
