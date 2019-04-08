const db = require('./database')
const util = require('util')

//Insert address into mysql server along with is private and public key
module.exports.insertAddress  = async function (address, private_key, public_key, wif){

    var query = "INSERT INTO `Addresses`  (`Address`, `Private_Key`, `Public_Key`, `WIF`) VALUES  (?, ?, ?, ?) "

    try {
        var result = await db.query(query, [address, private_key, public_key, wif])
        console.log("Successfully Inserted Address")
        return true;

    } catch (err) {
        throw Error("Unsuccessful Address Insert")
    }
}

//Get a list of address that were generated from this app
module.exports.getAddresses  = async function (){
   
    var query = "SELECT * FROM `Addresses`"

    try {
        var result = await db.query(query)
        return result;
    } catch(err) {
        throw new Error(err)
    }
}

//Insert transaction information ** need to check for success
module.exports.insertTransaction  = async function (address_send, address_receieve, amount, tosign){

    //Data automatically set as current time
    var query = "INSERT INTO `Transactions` (`Sent By`, `Received By`, `Amount`, `tosign`) VALUES (?,?,?,?)"

    try{
        var result = await db.query(query, [address_send, address_receieve, amount, tosign])
        console.log("Successfully Inserted Transaction into SQL")
        return true

    } catch (err) {
        console.log(err)
    
    }

}

//Return a list of transactions that includes the specified address
module.exports.selectTransactions  = async function (address){

    if (address) {
        var query = "SELECT * from `Transactions` WHERE `Sent By` = ? OR `Received By` = ? ORDER BY `Date`"
        var result = await db.query(query, [address, address])

        return result

    } else { //address not specified, so return all transactions

        query = "SELECT * FROM `Transactions`"

        var result = await db.query(query)
        return result
    }
}

//Return the private and public keys of a given address
module.exports.getKey  = async function (address){

    try {
        var query = "SELECT `Private_Key`, `Public_Key` FROM `Addresses` WHERE `Address` = ?"
        var response = await db.query(query, [address])

        if (response.length == 0) {//We do not have information about this public address
            return {
                found: false
            }

        } else {//Return the address key information from server
            return {
                privatekey: response[0].Private_Key,
                publickey: response[0].Public_Key,
                found: true
            }   
        }

    } catch (error) {
        console.log(error)
    }
    
}