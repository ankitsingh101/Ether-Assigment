const ethers = require('ethers');

// Connect to the Ethereum network using Infura or any other provider
const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/6660e89647e947fa94288ced235afb2a');

const getLatestTransactions = async () => {

  const latestBlockNumber = await provider.getBlockNumber();
  const blockRange = 1000;
  
  const transactions = [];

  // Fetch transactions from the latest block and previous blocks
  for (let i = latestBlockNumber; i > latestBlockNumber - blockRange; i--) {
    const block = await provider.getBlockWithTransactions(i);
    transactions.push(...block.transactions);
  }

  // Process and sort transactions based on ether amount
  const sortedTransactions = transactions
    .filter(tx => tx.value.gt(0)) // Filter out zero value transactions
    .map(tx => ({
      hash: tx.hash,
      sender: tx.from,
      receiver: tx.to,
      amount: ethers.utils.formatEther(tx.value), // Convert wei to ether
      blockNumber: tx.blockNumber,
    }))
    .sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount)); // Sort by descending ether amount

  return sortedTransactions;
};

module.exports = {
  getLatestTransactions,
};
