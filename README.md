# MarkdaleChallenge

The application is is currently hosted on Heroku: https://markdalechallenge.herokuapp.com/#/

I created this using a fullstack comprimising of VueJS for frontend, Express+NodeJS for backend, and Mysql as the database. The application works on Blockcypher's Testchain as opposed to Bitcoin's Testnet3 as it is easier to test with Blockcypher's inhouse faucet. The home page features the option to either generate an address or search an address on the testchain. Either option will redirect you to a page detailing the address's balance and transaction on this platform. In this page you can either deposit funds from Blockypher's faucet or transfer funds to an existing address on the testchain. I have stored the address information and transaction details on a mysql server hosted on remotemysql.com.

## How To Run Locally:

Perform both the frontend and backend servers in two seperate terminal windows. The client runs on port 8080 and the backend runs on port 8081

###### Run frontend:
```
cd client
npm install
npm start
```

###### Run backend:
```
cd server
npm install
npm start
```


