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

app.listen(process.env.PORT || 8891)

//Routing

const address = require('./routes/address');

app.get('/address/:address', address.getAddress); // Address Balance Page
app.get('/generateAddress', address.generateAddress)

app.post('/addFaucetFunds', address.addFaucetFunds)
app.post('/addTransaction', address.addTransaction)
