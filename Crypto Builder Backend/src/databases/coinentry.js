const {MongoClient} = require('mongodb');
const {exec}=require('child_process')

async function appendCoins(nameOfListing,obj) {

    const uri = "mongodb+srv://cryptobuild:4PGkQcKCgYYG6iy4@cluster0.n2ojo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
   const client = new MongoClient(uri);
    try {
        // Connect to the MongoDB cluster
        await client.connect();
    const result =  await client.db("cryptobuilder").collection("cryptobuild").updateOne( 
        { _id: nameOfListing},
            { $push  : {Coins :  obj }} 
            )
            console.log(`${result.matchedCount} document(s) matched the query criteria.`);

            if (result.upsertedCount > 0) {
                console.log(`One document was inserted with the id ${result.upsertedId._id}`);
            } else {
                console.log(`${result.modifiedCount} document(s) was/were updated.`);
            }
            await client.close();
//await client.close();        
return (obj)

}
finally {
    //Close the connection to the MongoDB cluster
    //await client.close();
}

}
module.exports={
appendCoins
}
