#!/bin/bash

# Stopping qualquer 27017 que estiver rodando
nohup mongo --port 27017 --eval 'db.adminCommand("shutdown")' 2> /dev/null

docker run -d -v "$(pwd)":/melhoreme --name w-db -p 27017:27017 -p 8080:8080 -p 3000:3000 -i -t raul010/w-db /bin/bash 
# docker run -d -v "$(pwd)":/melhoreme --name w-db --expose 27017 -p 27017:27017 -i -t raul010/w-db /bin/bash 

# docker exec -it w-db mongod --shutdown 2> /dev/null
docker exec -d -it w-db mongod 
docker exec -it w-db /melhoreme/.bin/containers/scripts/wait-connection.sh

# verifica se mongod está rodando, para poder prosseguir
# while [ `nc -z localhost 27017; echo $?` -eq 1 ]
# do
#     sleep 1
#     echo 'Waiting Connection...'
# done

# sh .bin/containers/scripts/wait-connection.sh

docker exec -it w-db mongorestore --db admin /melhoreme/.bin/db-backup/admin
docker exec -it w-db mongorestore --db melhoreme-test /melhoreme/.bin/db-backup/melhoreme-test

docker exec -it w-db mongod --shutdown  >/dev/null 2>&1
docker exec -it w-db chown -R `id -u` /data/db 

# while  : 
# do
#     case "$1" in
#         -b | --background)
#             echo "whileee"
#             isBG=true
#             shift
#             ;;
#     esac
# done

if [ $1 ]; then
    if [ $1 == -d ]; then
        docker exec -d -it w-db mongod --auth
    else
        docker exec -it w-db mongod --auth
    fi
fi

