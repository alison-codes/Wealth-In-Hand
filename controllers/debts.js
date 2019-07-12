var Debt = require('../models/debt');
var googleSheets = require('../services/google-sheets-api');
const User = require("../models/user");

module.exports = {
  showDebts,
  createDebt,
  updateGoogleSheet,
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
//   User.findById(req.user._id).then(async user => {
    
    
//   });
// }

  console.log('creating');
  console.log('user: ', req.user);
  Debt.create(req.body, function (err, debt) {
    console.log(debt);
    if (err) throw err;
    res.status(200).json(debt);
  })
  // googleSheets.retrieveSheetData(req.body);
   googleSheets.updateSheet(req.body);
}

function updateGoogleSheet(req, res) {
  console.log('updating sheet online');
  googleSheets.updateSheet(req.body);
  res.json({msg: 'Updated sheet'});
}


function editDebt (req, res) {
  return;
}

function deleteDebt (req, res) {
  return;
}
