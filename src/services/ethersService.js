const ethers = require('ethers');
const ethersRepository = require('../repositories/ethersRepository');

const isValidWalletAddress = (address) => {
  return ethers.utils.isAddress(address);
};

const createWallet = () => {
  const wallet = ethers.Wallet.createRandom();
  // Save the wallet to database (ethersRepository) if needed
  return wallet;
};

const getLatestTransactions = async () => {
  const transactions = await ethersRepository.getLatestTransactions();
  // Process the transactions if needed
  return transactions;
};

module.exports = {
  isValidWalletAddress,
  createWallet,
  getLatestTransactions,
};
