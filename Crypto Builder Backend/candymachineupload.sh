
mint(){
    ts-node ./cli/src/candy-machine-v2-cli.ts mint_one_token -e devnet -k solana-wallet/wallet.json -c example 2>&1  | tee NFT > /dev/null
    if [ $? -eq 0 ] 
    then
        echo $(cat  NFT | grep token|  cut -f 2 -d ":" | sed -n 2p | tr -d "'")
    else
            sleep 5
            mint
    fi
}
ts-node ./cli/src/candy-machine-v2-cli.ts upload -e devnet -k solana-wallet/wallet.json -cp candy/config.json -c example uploads/ >> /dev/null
if [ $? -eq 0 ]
then
ts-node ./cli/src/candy-machine-v2-cli.ts verify_upload     -e devnet     -k solana-wallet/wallet.json     -c example >> /dev/null
    if [ $? -eq 0 ]
    then
    mint
    else
    sleep 5
    sh candymachineupload.sh 
    fi
else
sleep 5
sh candymachineupload.sh 
fi
