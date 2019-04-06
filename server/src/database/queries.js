const db = require('./database')
const util = require('util')

//need to escape provided value //

//Insert address into mysql server along with is private and public key
module.exports.insertAddress  = async function (address, private_key, public_key){

    var query = "INSERT INTO `Addresses`  (`Address`, `Private_Key`, `Public_Key`) VALUES  (?, ?, ?) "

    try {
        var result = await db.query(query, [address, private_key, public_key])
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
module.exports.insertTransaction  = async function (address_send, address_receieve, amount, hash){

    //Data automatically set as current time
    var query = "INSERT INTO `Transactions` (`Sent By`, `Received By`, `Amount`, `Hash #`) VALUES (?,?,?,?)"

    try{
        var result = await db.query(query, [address_send, address_receieve, amount, hash])
        console.log("Successfully Inserted Transaction")
        return true

    } catch (err) {
        throw Error("Unsuccessful Address Insert")
    
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


