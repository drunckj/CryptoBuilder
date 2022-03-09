#!/bin/bash
spl-token create-token 2>&1  | tee account > /dev/null
cat account | grep -i Signature >>/dev/null
if [ $? -eq 0 ]; then
cat account | grep Creating | cut -d " " -f 3 >> accountscreated
echo $(cat account | grep Creating | cut -d " " -f 3)  
else
    sleep 4
    sh create-account.sh
fi
