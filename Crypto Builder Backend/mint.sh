#!/bin/bash
spl-token mint $1 $2 2>&1  | tee -a coinsminted > /dev/null
if [ $? -eq 1 ]
then
sleep 5
sh mint.sh  $1 $2
else
echo "coins minted"
fi
