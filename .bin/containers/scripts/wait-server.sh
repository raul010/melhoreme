#!/bin/bash

# verifica se node (server.js) está rodando, para poder prosseguir
while [ `nc -z localhost 3000; echo $?` -eq 1 ]
do
    sleep 1
    echo 'Connecting 3000...'
done


