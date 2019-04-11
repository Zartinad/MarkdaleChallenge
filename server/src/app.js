//Basic Initialization
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

var port = process.env.PORT || 9001;
app.listen(port)
console.log('server started '+ port);


//Routing

const address = require('./routes/address');

app.get('/address/:address', address.getAddress); // Address Balance Page
app.get('/generateAddress', address.generateAddress)

app.post('/addFaucetFunds', address.addFaucetFunds)
app.post('/addTransaction', address.addTransaction)
