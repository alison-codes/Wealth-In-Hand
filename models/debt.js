const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const debtSchema = new Schema({
  name: String,
  balance: Number,
}, {
  timestamps: true
});

module.exports = mongoose.model('Debts', debtSchema);