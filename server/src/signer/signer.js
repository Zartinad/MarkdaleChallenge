const util = require('util')
const exec = util.promisify(require('child_process').exec);

var program = "./src/signer/signer"


//Returns the object needed to push transaction to blockcahin
module.exports.sign = async function (tosign, private_key) {
    var command = util.format("%s %s %s", program, tosign, private_key)

    const { stdout, stderr } = await exec(command);
  
    return stdout.slice(0, stdout.length - 1)
}

