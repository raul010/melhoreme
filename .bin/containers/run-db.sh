#!/bin/bash

# Initialize our own variables:
CI_ENV=false
AWS_ENV=false
DETTACHED_MOD=false

while getopts ":a:c:d:" opt; do
    case "$opt" in
        a)
            AWS_ENV=true
            ;; 
        c)
            CI_ENV=true
            ;;
        d)
            DETTACHED_MOD=true
            ;;
    esac
done

shift $((OPTIND-1))

echo "CI_ENV $CI_ENV"
echo "AWS_ENV $AWS_ENV"
echo "DETTACHED_MOD $DETTACHED_MOD"

# Stopping qualquer 27017 que estiver rodando
nohup mongo --port 27017 --eval 'db.adminCommand("shutdown")' 2> /dev/null

# docker run -d -v "$(pwd)":/melhoreme --name melhoreme/db -p 27017:27017 -p 8080:8080 -p 3000:3000 -i -t raul010/melhoreme/db /bin/bash 
docker run -d -v "$(pwd)":/melhoreme --name db -p 27017:27017 -p 8080:8080 -p 3000:3000 -p 9876:9876 -p 5900:5900 -p 4444:4444 -i -t melhoreme/db /bin/bash 

# docker exec -it db mongod --shutdown 2> /dev/null
docker exec -d -it db mongod 
docker exec -it db /melhoreme/.bin/containers/scripts/wait-connection.sh

if [ $CI_ENV == true ]; then
    # if [ "$(ls -A .bin/db-backup)" ]; then
    #     rm -r .bin/db-backup/*
    # fi
    # docker exec -it chown -R $USER:$GROUP ~/.npm
    # docker exec -it chown -R $USER:$GROUP chown -R $USER /usr/local/lib/node_modules/    

    # ssl false, to install Selenium
    docker exec -it db npm config set unsafe-perm true
    docker exec -it db npm config set strict-ssl false
    docker exec -it db npm install
    docker exec -it db npm config set unsafe-perm false
    docker exec -it db npm set strict-ssl true
    docker exec -it db bower install --allow-root
    docker exec -it db mongodump --db "admin" -o .bin/db-backup/
    docker exec -it db mongodump --db "melhoreme-test" -o .bin/db-backup/
    docker exec -it db mongorestore --db admin /melhoreme/.bin/db-backup/admin
    docker exec -it db mongorestore --db melhoreme-test /melhoreme/.bin/db-backup/melhoreme-test
     
    # chown -R $USER:$GROUP chown -R $USER /usr/local/lib/node_modules/    
    # # ssl false, to Selenium
    # npm config set unsafe-perm true
    # npm config set strict-ssl false
    # npm install
    # npm config set unsafe-perm false
    # npm set strict-ssl true
    # bower install --allow-root
    # docker exec -it db mongodump --db "admin" -o .bin/db-backup/
    # docker exec -it db mongodump --db "melhoreme-test" -o .bin/db-backup/
    # docker exec -it db mongorestore --db admin /melhoreme/.bin/db-backup/admin
    # docker exec -it db mongorestore --db melhoreme-test /melhoreme/.bin/db-backup/melhoreme-test

fi
#
if [ $AWS_ENV == true ]; then
    # docker exec -it db echo "export NODE_ENV=production" >> ~/.bashrc
    docker exec -it db /bin/bash -c "echo 'export NODE_ENV=production' >> ~/.bashrc && exit 0"
    docker exec -it db /bin/bash -c "echo $NODE_ENV"
    docker exec -it db npm install --production
    docker exec -it db bower install --allow-root --production 
fi
# if [ $AWS_ENV == true ]; then
#     
#     docker exec -it db npm install 
#     docker exec -it db bower install 
# fi

docker exec -it db mongod --shutdown  >/dev/null 2>&1
docker exec -it db chown -R `id -u` /data/db 

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
    docker exec -d -it db mongod --auth
else
    docker exec -it db mongod --auth
fi

