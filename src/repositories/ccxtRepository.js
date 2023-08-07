const ccxt = require('ccxt');
// Handle CCXT library related operations
// Example: Fetch tradable coins and average prices
const getTradableCoins = async () => {
    const exchange = new ccxt.binance();
    const markets = await exchange.load_markets();
    
    const tradableCoins = Object.keys(markets);
    return tradableCoins;
  };
  
  const getAveragePrices = async () => {
    const exchange = new ccxt.binance();
    const symbols = await exchange.fetch_tickers();
    
    
    // Calculate average prices for each coin based on recent transactions
    const averagePrices = {};
    for (const symbol in symbols) {
      const ticker = symbols[symbol];
      // Implement logic to calculate average prices based on ticker data
    
      const averagePrice = calculateAveragePrice(ticker);
      averagePrices[symbol] = averagePrice;
    }
  
    return averagePrices;
  };

  const calculateAveragePrice = (ticker) => ticker.info.weightedAvgPrice;
  
  module.exports = {
    getTradableCoins,
    getAveragePrices,
  };
  