#!/bin/bash

spl-token create-account $1 2>&1  | tee authority > /dev/null
if [ $? -eq 0 ]; then
cat authority | grep Creating | cut -d " " -f 3 >> authoritycreated
echo $(cat authority | grep Creating | cut -d " " -f 3)  
else
    sleep 4
    sh create-coins.sh $1
fi
