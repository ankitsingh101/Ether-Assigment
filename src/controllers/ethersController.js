const ethersService = require('../services/ethersService');

const isValidWalletAddress = (req, res) => {
  const { address } = req.params;
  const isValid = ethersService.isValidWalletAddress(address);
  res.json({ isValid });
};

const createWallet = (req, res) => {
  const wallet = ethersService.createWallet();
  res.json({ wallet });
};

const getLatestTransactions = async (req, res) => {
  const transactions = await ethersService.getLatestTransactions();
 
  res.json({ transactions });
};

module.exports = {
  isValidWalletAddress,
  createWallet,
  getLatestTransactions,
};
