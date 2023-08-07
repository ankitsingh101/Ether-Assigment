const ccxt = require('ccxt');
const ccxtRepository = require('../repositories/ccxtRepository');

const getTradableCoins = async (req,res) => {
  const tradableCoins = await ccxtRepository.getTradableCoins();
  res.json({ tradableCoins });
};

const getAveragePrices = async (req,res) => {
  const averagePrices = await ccxtRepository.getAveragePrices();
  res.json({ averagePrices });
};

module.exports = {
  getTradableCoins,
  getAveragePrices,
};
