#!/bin/bash

# Stopping qualquer 27018 que estiver rodando
mongo --port 27017 --eval 'db.adminCommand("shutdown")'

docker run -d -v "$(pwd)"/.bin/db-backup:/db-backup --name w-db --expose 27017 -p 27017:27017 -i -t raul010/w-db /bin/bash 
docker exec -d -it w-db mongod 
sleep 5
docker exec -it w-db  mongorestore --db admin /db-backup/admin; mongorestore --db melhoreme-test /db-backup/melhoreme-test

docker exec -it w-db mongod --shutdown; 
docker exec -it w-db chown -R `id -u` /data/db 
docker exec -it w-db mongod --auth
