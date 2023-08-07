const express = require('express');
const ethersController = require('./controllers/ethersController');
const ccxtController = require('./controllers/ccxtController');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Ethers.js routes
app.get('/ethers/validate/:address', ethersController.isValidWalletAddress);
app.get('/ethers/create-wallet', ethersController.createWallet);
app.get('/ethers/latest-transactions', ethersController.getLatestTransactions);

// CCXT routes
app.get('/ccxt/tradable-coins', ccxtController.getTradableCoins);
app.get('/ccxt/average-prices', ccxtController.getAveragePrices);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
