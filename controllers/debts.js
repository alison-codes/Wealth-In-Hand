var Debt = require('../models/debt');

module.exports = {
  showDebts,
  create,
};

function showDebts(req, res) {
  Debt.find({}, function (err, debts) {
    if (err) console.log(err);
    res.status(200).json(debts);
  });
}

function create(req, res) {
  console.log('creating')
  postMessage.create(req.body, function (err, debt) {
    console.log(debt);
  })
}
