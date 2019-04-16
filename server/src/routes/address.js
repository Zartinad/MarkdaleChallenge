const request = require('request-promise')
const util = require('util')
const queries = require('../database/queries')
const signer = require('../signer/signer.js')

const main_url = "https://api.blockcypher.com/v1/bcy/test" //Easily change between Blockcypher and Bitcoin Testnet
const token = "535ad0b8be24403fa51649b0a10948a6"

//Gets information and transactions of specific address
module.exports.getAddress = async function (req, res){

    var address = req.params.address;
    var url = util.format(main_url + "/addrs/%s/balance", address)
    
    var options = {
        method: 'GET',
        uri: url,
        json: true 
    }

    try {
        var response = await request(options) //Send GET request to Blockypher for address Balance

        if (response.statusCode == 404){ //Check if address exists
            throw Error("Address Not Found")
        }

        var transactions = await queries.selectTransactions(address) //Query any transaction history

        var result = {
            address: response,
            transactions: transactions
            };

        res.send(result)

    } catch (err) {
        res.send({error: err})
    }
   
}

//Generate a new public  address
module.exports.generateAddress = async function (req, res){

    var url = util.format(main_url + "/addrs?token=%s", token)
    var options = {
        method: 'POST',
        uri: url,
        json: true 
    }

    try {
        var response = await request(options) //Send POST request to Blockcypher to create new 

        //Log information in mysql database
        var success = await queries.insertAddress(response.address, response.private, response.public, response.wif)

        res.send(response)

        return success;

    } catch (err) {
        return false;
    }
  
}

//Adds Funds to Specified Address from Bitcoin Testnet Faucet
module.exports.addFaucetFunds  = async function (req, res){

    var url = util.format(main_url + "/faucet?token=%s", token)
    var address = req.body.address
    var amount = req.body.amount
    
    console.log(address)
    var options = { //Define request option and json stringify
        method: 'POST',
        body: {
            "address": address,
            "amount": amount
        },
        uri: url,
        json: true 
    }

    try {
        var response = await request(options)
        var success = await queries.insertTransaction("Faucet", address, amount, response.tx_ref)

        console.log("Transaction Successful")
        res.send({tx_ref: response})
        return success;

    } catch (error) {
        console.log("Transaction Unsuccessful")
        console.log(error)
        res.send({success: false})
        return success;
    }

}

//Transfer Funds Between 2 Addresses
module.exports.addTransaction  = async function (req, res){

    var url = util.format(main_url + "/txs/new")
    
    var address_from = req.body.address_from
    var address_to = req.body.address_to
    var amount = req.body.amount
 
    var options = {
        method: 'POST',
        body:  {
            "inputs": [{"addresses": [address_from]}], 
            "outputs": [{"addresses": [address_to], "value": amount}]},
        uri: url,
        json: true 
    }

    try {
        
        var response = await request(options) //Get transaction information from blockcypher
        if (response.statusCode == 400){//Something went wrong with the request
            throw Error("Check Address or Amount")
        }

        //Sign transaction with private key and append information to transaction information
        var {privatekey, publickey, found} = await queries.getKey(address_from)
        
       if (found) {//We have the private and public key
        var signature = await signer.sign(response.tosign, privatekey)
        response["signatures"] = signature
        
        var pubkeys = [] //sign all the signautures
        for (var i = 0; i < signature.length; i++){
            pubkeys.push(publickey)
        }
        response["pubkeys"] = pubkeys

        var url_send = util.format(main_url + "/txs/send?token=%s", token)
        var options_send = {
            method: 'POST',
            body:  response,
            uri: url_send,
            json: true 
        }

        console.log("Transaction Successfully Pushed")
        var push_transaction = await request(options_send)
        //Insert transaction information to mysql server
        await queries.insertTransaction(address_from, address_to, amount, response.tx.hash)
        res.send({isSuccessful: true})
       }
    
    } catch (err) {
        console.log("Transaction Unsucessful")
        console.log(err)
        res.send(err.error)

    }

}
