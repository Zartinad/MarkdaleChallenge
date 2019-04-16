const util = require('util')
const exec = util.promisify(require('child_process').exec);

var program = "./src/signer/signer"


//Returns the object needed to push transaction to blockcahin
module.exports.sign = async function (tosign, private_key) {

    var signatures = []

    for (var i = 0; i < tosign.length; i++){
        var command = util.format("%s %s %s", program, tosign[i], private_key)
        const { stdout, stderr } = await exec(command);
        signatures.push(stdout.slice(0, stdout.length - 1))
    }

    
  
    return signatures
}

