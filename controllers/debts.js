var Debt = require('../models/debt');
var googleSheets = require('../services/google-sheets-api');

module.exports = {
  showDebts,
  createDebt,
  editDebt,
  deleteDebt,
};

function showDebts(req, res) {
  Debt.find({}, function (err, debts) {
    if (err) console.log(err);
    res.status(200).json(debts);
  });
}

function createDebt(req, res) {
  console.log('creating');
  console.log('user: ', req.user);
  googleSheets.updateSheet(req.body);
  res.json({msg: 'Updated sheet'});
}
//   Debt.create(req.body, function (err, debt) {
//     console.log(debt);
//     if (err) throw err;
//     res.status(200).json(post)
//   })
// }

function editDebt (req, res) {
  return;
}

function deleteDebt (req, res) {
  return;
}
