var Debt = require('../models/debt');

module.exports = {
  showDebts,
  createDebt,
  editDebt,
  deleteDebt
};

function showDebts(req, res) {
  Debt.find({}, function (err, debts) {
    if (err) console.log(err);
    res.status(200).json(debts);
  });
}

function createDebt(req, res) {
  console.log('creating')
  postMessage.create(req.body, function (err, debt) {
    console.log(debt);
  })
}

function editDebt (req, res) {
  return;
}

function deleteDebt (req, res) {
  return;
}
