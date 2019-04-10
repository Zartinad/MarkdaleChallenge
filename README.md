# MarkdaleChallenge

The application works on Blockcypher's Testchain as opposed to Bitcoin's Testnet3 as it is easier to test with blockcypher's inhouse faucet. When you first launch it, the home page features the option to either generate an address or search an address on the testchain. Either option will redirect you to a page detailing the address's balance and transaction on this platform. I have stored the address information and transaction details on a mysql server hosted on remotemysql.com.

The application is is currently hosted on Heroku:

How To Run Locally:

Run the client folder:
cd client
npm run build

Run the server:
cd server
npm run build

