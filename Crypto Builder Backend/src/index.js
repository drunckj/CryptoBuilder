// ./src/index.js

// importing the dependencies
const express = require('express');
const fetch = require("node-fetch")


var fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const {findOneListingByName} =require('./databases/find_mongo');
const {findCoins}=require('./databases/find_coin')
const {exec}=require('child_process')
const {appendCoins} =require('./databases/coinentry.js');
const {appendNFTs}=require('./databases/NFTentry.js')
const {findNFT}=require('./databases/find_NFT.js')
  var multer = require('multer');
const path = require('path');
const { type } = require('os');
//var upload = multer({ dest: 'uploads/' });

// defining the Express app
const app = express();
var walletadd="CemJmKkWkGw6vnjseAg8mz2kqQp3zXYDcBGEcxCxA8qX"
var wallet
var coinname
var amount
var coinsymbol
var limit
var Token
// defining an array to work as the database (temporary solution)
const ads = [
  {title: 'Hello, world (again)!'}
];

// adding Helmet to enhance your API's security
app.use(helmet());
//for form data


// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));
//functions

// defining an endpoint to return all ads
app.get('/', (req, res) => {
  res.send(ads);
});
app.post('/authenticate', async (req,res) => {
console.log(req.body)
var result=await findOneListingByName(req.body.wallet)
console.log(`returned value ${result}`)
wallet=req.body.wallet;
res.json(result)

});
app.post('/create',(req,res) => {
  coinname=req.body.coinname;
  amount=req.body.amount;
  coinsymbol=req.body.coinsymbol;
  res.send(walletadd)

});
app.post('/createcoin',(req,res) =>{
  var command='sh ./create-account.sh';
  exec(command, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        console.log(typeof(stderr));
        return;
    }
    console.log(`Number of files ${stdout}`)
     Token=stdout.replace(/^\n|\n$/g, '')
    var command="sh create-coins.sh"+" "+Token+" ";
    console.log(command)
     exec(command, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`Account: ${stdout}`)
     var Account=(stdout.replace(/^\n|\n$/g, ''))
     var obj={
       'Token': Token,
       'Account':Account,
       'Coinname':coinname,
       'CoinSymbol':coinsymbol,
       'Amount':amount
     }
     console.log(obj)
     let result=  appendCoins(wallet,obj)
     var command="sh mint.sh"+" "+Token+" "+amount;
    console.log(command)
     exec(command, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
        }})
      res.json(obj)
}
)
  })
});


app.post('/move',(req,res)=>{
  if(req.body.wallet === wallet && req.body.account===Token && req.body.amount===amount){
  var command='sh ./move.sh'+" "+Token+" "+amount+" "+wallet;
  exec(command, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        console.log(typeof(stderr));
        return;
    }
    console.log(stdout)
    res.send("1")
})}})

app.post('/moveNFT',(req,res)=>{
  if(req.body.wallet === wallet && req.body.amount==1){
  var command='sh ./move.sh'+" "+req.body.account+" "+req.body.amount+" "+wallet;
  console.log(command)
  exec(command, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        console.log(typeof(stderr));
        return;
    }
    console.log(stdout)
    res.send("1")
})}})
app.post('/findcoin',async(req,res)=>{
let obj=await findCoins(req.body.Token)
res.json(obj)
})
app.post('/findNFT',async(req,res)=>{
  let obj=await findNFT(req.body.Token)
  res.json(obj)
  })

app.get('/balance',(req,res)=>{

  var command='solana -k solana-wallet/wallet.json balance | cut -d " " -f 1';
     exec(command, (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
      }
      var amount=parseFloat(stdout)
  console.log(`${typeof(amount)} : ${amount}`);
      if(amount>0.0014){
  console.log(`stdout: ${stdout}`);
      res.send("1");
      }
      else{
  console.log("Transfer sol first")
      res.send("0");
  }})});
  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, "0"+ path.extname(file.originalname));
    }
});
var upload = multer({ storage: storage })


app.post('/createNFT',upload.single('pic'),async(req,res)=>{
var NFTaccount
var imagehost
var imagelink
  const array=(req.body.NFTattributes).split(",")
  var obj2={
    'NFTname': req.body.NFTname,
    'NFTSymbol':req.body.NFTsymbol,
    "description": req.body.NFTdescription,
    "attributes": req.body.NFTattributes
  }
  var obj={
    "name": req.body.NFTname,
    "symbol": req.body.NFTsymbol,
    "description": req.body.NFTdescription,
    "seller_fee_basis_points": 250,
    "image": "image.png",
    "attributes": [
    ],
    "properties": {
        "creators": [{"address": wallet, "share": 100}],
        "files": [{"uri": "image.png", "type": req.file.mimetype}]
    },
    "collection": {"name": "Collection", "family": "collection"}
  }
  for(var i=0;i<array.length;i++)
  {
    var att={
      "trait_type": `Layer-${i+1}`,
      "value": array[i]
    }
    obj.attributes.push(att)
  }
  var json = JSON.stringify(obj);
  fs.writeFile('uploads/0.json', json, 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("The file was saved!");
  var command='sh ./candymachineupload.sh';
    exec(command, (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }
      console.log(`Number of files ${stdout}`)
       NFTaccount=stdout.replace(/^\n|\n$/g, '')
       console.log(NFTaccount)
       console.log(typeof(NFTaccount))
       
       fs.readFile(".cache/devnet-example.json", function (error, content) {
        var data = JSON.parse(content);
         imagehost=data.items[0].link
         console.log(imagehost)
         let settings = { method: "Get" };
         
         fetch(imagehost, settings)
             .then(res => res.json())
             .then((json) => {
                 // do something with JSON
                 imagelink=json.image
                 obj2.Account=NFTaccount
                 
                 obj2.image=imagelink

                 console.log(obj2)
                 console.log(NFTaccount)
                 let result=  appendNFTs(wallet,obj2)
                 const file = '.cache/devnet-example.json'
                try {
                fs.unlinkSync(file)
                  //file removed
                } catch(err) {
                  console.error(err)
}
                 res.json(obj2)
             });
         
       })
      });})
      
})

// starting the server
app.listen(5000, () => {
  console.log('listening on port 5000');
});

