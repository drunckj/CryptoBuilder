#!/bin/bash
spl-token transfer --allow-unfunded-recipient --fund-recipient $1 $2 $3 >> /dev/null
if [ $? -eq 0 ]
then
echo "success"
else
sleep 5
spl-token transfer  --fund-recipient $1 $2 $3
fi
