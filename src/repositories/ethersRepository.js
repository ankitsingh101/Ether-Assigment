const ethers = require('ethers');

// Connect to the Ethereum network using Infura or any other provider
const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/6660e89647e947fa94288ced235afb2a');

const getLatestTransactions = async () => {
  const latestBlockNumber = await provider.getBlockNumber();
  const blockRange = 20;
  const batchSize = 10; // Number of blocks to fetch transactions in parallel

  const transactions = [];

  // Create an array of promises to fetch transactions for each block
  const fetchPromises = [];
  for (let i = latestBlockNumber; i > latestBlockNumber - blockRange; i -= batchSize) {
    const batchPromises = [];

    // Fetch transactions for each block in the batch
    for (let j = i; j > Math.max(i - batchSize + 1, 0); j--) {
      batchPromises.push(provider.getBlockWithTransactions(j));
    }

    // Push the promise array of blocks into the batchPromises array
    fetchPromises.push(Promise.all(batchPromises));
  }

  // Await all promises for batched block arrays
  const batchBlocksArrays = await Promise.all(fetchPromises);

  // Process transactions from the batched block arrays
  batchBlocksArrays.forEach(batchBlocks => {
    batchBlocks.forEach(block => {
      transactions.push(...block.transactions);
    });
  });

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
