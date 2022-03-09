
const { MongoClient, MongoDriverError } = require('mongodb');
/**
 * Print an Airbnb listing with the given name
 * Note: If more than one listing has the same name, only the first listing the database finds will be printed.
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
 * @param {String} nameOfListing The name of the listing you want to find
 */

async function findOneListingByName(nameOfListing) {
    const uri = "mongodb+srv://cryptobuild:4PGkQcKCgYYG6iy4@cluster0.n2ojo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
        // Connect to the MongoDB cluster
        await client.connect();
    const result =  await client.db("cryptobuilder").collection("cryptobuild").findOne( { _id: nameOfListing})
//if result exists return all values as json
    if (result !== null) {
        console.log(`Found a wallet in the collection with the name '${nameOfListing}':`);
            var obj={
             'Wallet':nameOfListing,
             'Coins':[],
             'NFT':[]
            }
        if(result.Coins)
        {
            for(var i=0;i<result.Coins.length;i++){
            console.log(result.Coins[i])
            obj.Coins.push(result.Coins[i])
        }}
        if(result.NFT)
        {
            for(var i=0;i<result.NFT.length;i++){
            console.log(result.NFT[i])
            obj.NFT.push(result.NFT[i])
        }}
   
console.log(`the entry is ${obj}`)
return (obj)

}

        //send a new request to create object
     else {
        await client.connect();
        console.log(`No wallet found with the name '${nameOfListing}'`);
        var obj={
            '_id' : nameOfListing,
            'Wallet': nameOfListing,
            'Coins':[],
            'NFT':[]
        }
        const result = await client.db("cryptobuilder").collection("cryptobuild").insertOne(obj);
        console.log(result)
    console.log(`New listing created with the following id: ${result.insertedId}`);
    return (obj)
         
    }

    await client.close()
}


module.exports={
findOneListingByName
}
