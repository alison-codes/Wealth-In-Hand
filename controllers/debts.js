var Debt = require('../models/debt');

module.exports = {
  showDebts,
};
  
async function showDebts(req, res) {
  const debts = await Debt.find({})
  res.json(debts);
}
