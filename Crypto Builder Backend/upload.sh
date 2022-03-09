#!/bin/bash

echo "me work"
ts-node ~/metaplex/js/packages/cli/src/candy-machine-v2-cli.ts upload -e devnet -k solana-wallet/wallet.json -cp candy/config.json -c example uploads/ >> /dev/null
if [ $? -eq 0 ]
then
echo "me work"
ts-node ~/metaplex/js/packages/cli/src/candy-machine-v2-cli.ts verify_upload     -e devnet     -k solana-wallet/wallet.json     -c example >>/dev/null
    if [ $? -eq 0]
    then
    ts-node ~/metaplex/js/packages/cli/src/candy-machine-v2-cli.ts mint_one_token -e devnet -k solana-wallet/wallet.json -c example | grep token 
    if[ $? -eq 0]
    else
    sleep 5
    sh candymachineupload.sh 
    fi
else
sleep 5
sh candymachineupload.sh 
fi
