const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  transactionHash: String,
  senderAddress: String,
  receiverAddress: String,
  amount: Number,
  blockNumber: Number,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
