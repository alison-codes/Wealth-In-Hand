const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const debtSchema = new Schema({
  name: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('Debts', debtSchema);