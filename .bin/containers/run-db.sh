#!/bin/bash

# Initialize our own variables:
CI_ENV=false
DETTACHED_MOD=false

while getopts ":c:d:" opt; do
    case "$opt" in
        c)
            CI_ENV=true
            ;;
        d)
            DETTACHED_MOD=true
            ;;
    esac
done

shift $((OPTIND-1))

echo $CI_ENV
echo $DETTACHED_MOD

# Stopping qualquer 27017 que estiver rodando
nohup mongo --port 27017 --eval 'db.adminCommand("shutdown")' 2> /dev/null

# docker run -d -v "$(pwd)":/melhoreme --name w-db -p 27017:27017 -p 8080:8080 -p 3000:3000 -i -t raul010/w-db /bin/bash 
docker run -d -v "$(pwd)":/melhoreme --name w-db -p 27017:27017 -p 8080:8080 -p 3000:3000 -p 9876:9876 -p 5900:5900 -p 4444:4444 -i -t raul010/w-db /bin/bash 

# docker exec -it w-db mongod --shutdown 2> /dev/null
docker exec -d -it w-db mongod 
docker exec -it w-db /melhoreme/.bin/containers/scripts/wait-connection.sh

if [ $CI_ENV == true ]; then
    # if [ "$(ls -A .bin/db-backup)" ]; then
    #     rm -r .bin/db-backup/*
    # fi
    # docker exec -it chown -R $USER:$GROUP ~/.npm
    docker exec -it chown -R $USER:$GROUP chown -R $USER /usr/local/lib/node_modules/    
    docker exec -it w-db npm config set unsafe-perm true
    docker exec -it w-db npm config set strict-ssl false
    docker exec -it w-db npm install
    docker exec -it w-db npm config set unsafe-perm false
    docker exec -it w-db npm set strict-ssl true
    docker exec -it w-db mongodump --db "admin" -o .bin/db-backup/
    docker exec -it w-db mongodump --db "melhoreme-test" -o .bin/db-backup/
    docker exec -it w-db mongorestore --db admin /melhoreme/.bin/db-backup/admin
    docker exec -it w-db mongorestore --db melhoreme-test /melhoreme/.bin/db-backup/melhoreme-test
fi
#

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

if [ $DETTACHED_MOD == true ]; then
    docker exec -d -it w-db mongod --auth
else
    docker exec -it w-db mongod --auth
fi

