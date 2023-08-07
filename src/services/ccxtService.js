const ccxt = require('ccxt');
const ccxtRepository = require('../repositories/ccxtRepository');

const getTradableCoins = () => {
  return ccxtRepository.getTradableCoins();
};

const getAveragePrices = async () => {
  const averagePrices = await ccxtRepository.getAveragePrices();
  return averagePrices;
};

module.exports = {
  getTradableCoins,
  getAveragePrices,
};
