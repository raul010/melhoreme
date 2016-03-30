#!/bin/bash

# verifica se mongod está rodando, para poder prosseguir
while [ `nc -z localhost 27017; echo $?` -eq 1 ]
do
    sleep 1
    echo 'Connecting...'
done


