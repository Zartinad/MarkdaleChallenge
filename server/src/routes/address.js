const request = require('request-promise')
const util = require('util')
const queries = require('../database/queries')

const main_url = "https://api.blockcypher.com/v1/bcy/test" //Easily change between Blockcypher and Bitcoin Testnet
const token = "535ad0b8be24403fa51649b0a10948a6"

//Gets Balance of Specific TestNet Address
module.exports.getAddress = async function (req, res){

    var address = req.params.address;
    var url = util.format(main_url + "/addrs/%s/balance", address)
    
    var options = { //Define request option and json stringify
        method: 'GET',
        uri: url,
        json: true 
    }

    try {
        var response = await request(options)
        var transactions = await queries.selectTransactions(address)

        var result = {
            address: response,
            transactions: transactions
            };

        res.send(result)

        return true

    } catch (error) {
        console.log(error)
        return false
    }
   
}

//Generate a new public  address
module.exports.generateAddress = async function (req, res){

    var url = util.format(main_url + "/addrs?token=%s", token)
    console.log("DINGS")
    var options = {
        method: 'POST',
        uri: url,
        json: true 
    }

    try {
        var response = await request(options)
        var success = await queries.insertAddress(response.address, response.private, response.public)
        console.log("AWAITED")
        console.log(response)
        console.log(response.address)

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

    console.log(req.body)
    
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

    var url = util.format(main_url + "txs/new")
    
    var address_from = req.body.address_from
    var address_to = req.body.address_to
    var amount = req.body.amount
 
    var options = { //Define request option and json stringify
        method: 'POST',
        body:  {
            "inputs": [{"addresses": address_from}],
            "outputs": [{"addresses": address_to}],
            "value": amount
            },
        uri: url,
        json: true 
    }

    try {
        // var response = await request(options)

        console.log(address_from)
        console.log(address_to)
        console.log(amount)
        var success = await queries.insertTransaction(address_from, address_to, amount, "#123132")
        res.send(req.body)

    } catch (err) {
        console.log(err)
    }

   

}
