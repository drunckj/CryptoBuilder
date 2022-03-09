const { ObjectID } = require('bson');
const { MongoClient, MongoDriverError } = require('mongodb');
async function findCoins(nameOfListing) {
    console.log(nameOfListing)
    const uri = "mongodb+srv://cryptobuild:4PGkQcKCgYYG6iy4@cluster0.n2ojo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
        // Connect to the MongoDB cluster
        await client.connect();
    const result =  await client.db("cryptobuilder").collection("cryptobuild").findOne({"Coins.Token":nameOfListing})
    await client.close()
    return result
// var i;
// //if result exists return all values as json
//     if (result !== null) {
//         for( i=0;i<result.Coins.length;i++){
//         { 
//             if(result.Coins[i].Token===nameOfListing)
//             {
//                 break;
//             }
//         }
//         var obj={
//             "Token": nameOfListing,
//             "Account":result.Coins[i].Account,
//             "Coinname":result.Coins[i].Coinname,
//             "CoinSymbol":result.Coins[i].CoinSymbol,
//             "Amount":result.Coins[i].Amount
//             }
//         console.log(`Found a coin in the collection with the name '${nameOfListing}':`);
// console.log(obj)

//return(obj)
    }
module.exports={
    findCoins
    }
    
