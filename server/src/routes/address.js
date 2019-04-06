const request = require('request-promise')
const util = require('util')
const queries = require('../database/queries')
const main_url = "https://api.blockcypher.com/v1/bcy/test" //Easily change between Blockcypher and Bitcoin Testnet

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
    
    var options = { //Define request option and json stringify
        method: 'POST',
        uri: url,
        json: true 
    }

    try {
        var response = await request(options)
        var success = await queries.insertAddress(response.address, response.private, response.public)
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
    
    var options = { //Define request option and json stringify
        method: 'POST',
        body: {
            "address": address,
            "amount": amount
        },
        uri: url,
        json: true 
    }

    var response = await request(options)
    var success = await queries.insertTransaction("Faucet", address, amount, response.tx_ref)
    return success;


}

module.exports.addTransaction  = async function (req, res){

    var url = util.format(main_url + "/faucet?token=%s", token)
    var address_send = req.body.address_send
    var address_receieve =  req.body.adrress_receive
    var amount = req.body.amount
    
    var options = { //Define request option and json stringify
        method: 'POST',
        body: {
            "inputs": [{"address":  address_send}],
            "outputs": [{"address":  address_receieve}],
            "value": amount
        },
        uri: url,
        json: true 
    }

    var response = await request(options)
    var success = await queries.insertTransaction(address_send, address_receieve, amount, response.hash)
    return success;

}
