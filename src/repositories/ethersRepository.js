const ethers = require('ethers');

const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/6660e89647e947fa94288ced235afb2a');

const getLatestTransactions = async () => {
  const latestBlockNumber = await provider.getBlockNumber();
  const blockRange = 1000;
  const chunkSize = 10;
  const numChunks = Math.ceil(blockRange / chunkSize);

  const transactionsPromises = [];

  for (let chunkIndex = 0; chunkIndex < numChunks; chunkIndex++) {
    const startBlock = latestBlockNumber - chunkIndex * chunkSize;
    const endBlock = Math.max(startBlock - chunkSize + 1, 0);

    transactionsPromises.push(getTransactionsForChunk(startBlock, endBlock));
  }

  const chunkResults = await Promise.all(transactionsPromises);

  const sortedTransactions = chunkResults
    .flat()
    .filter(tx => tx.value.gt(0))
    .map(tx => ({
      hash: tx.hash,
      sender: tx.from,
      receiver: tx.to,
      amount: ethers.utils.formatEther(tx.value),
      blockNumber: tx.blockNumber,
    }))
    .sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));

  return sortedTransactions;
};

const getTransactionsForChunk = async (startBlock, endBlock) => {
  const transactionsPromises = [];

  // Fetch transactions for each block in the chunk
  for (let i = startBlock; i >= endBlock; i--) {
    transactionsPromises.push(getTransactionsForBlock(i));
  }

  const transactionsArrays = await Promise.all(transactionsPromises);

  return transactionsArrays.flat();
};

const getTransactionsForBlock = async (blockNumber) => {
  const block = await provider.getBlockWithTransactions(blockNumber);
  return block.transactions;
};

module.exports = {
  getLatestTransactions,
};
