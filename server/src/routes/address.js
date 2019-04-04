// const firestoredb = require('../firebase') mysql init
const request = require('request-promise')
const util = require('util')


function getOptions(requestType, uri) {
    return options = { //Define request option and json stringify
        method: requestType,
        uri: uri,
        json: true 
    }

}

//Gets Balance of Specific TestNet Address
module.exports.getAddress = function (req, res){

    var address = req.params.address;
    var url = util.format("https://api.blockcypher.com/v1/btc/test3/addrs/%s/balance", address)

    var options = getOptions('GET', url)
    
    // var options = { //Define request option and json stringify
    //     method: 'GET',
    //     uri: url,
    //     json: true 
    // }

    // request(options)
    //     .then(function (response) {
    //         console.log(response)
    //         res.send(response)
    //     })
    //     .catch(function (err) {
    //         console.log(err)
    //     })
   
}

//Generate a new public Bitcoin testnet3 address
module.exports.generateAddress = function (req, res){

    var url = util.format("https://api.blockcypher.com/v1/btc/test3/addrs?token=%s", token)
    
    var options = { //Define request option and json stringify
        method: 'POST',
        uri: url,
        json: true 
    }

    request(options)
        .then(function (response) {
            console.log(response)
            res.send(response)
        })
        .catch(function (err) {
            console.log(err)
        })
   
}

//Adds Funds to Specified Address from Bitcoin Testnet Faucet
module.exports.addFaucetFunds  = function (req, res){




}


