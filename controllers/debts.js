var Debt = require('../models/debt');
var googleSheets = require('../services/google-sheets-api');

module.exports = {
    showDebts,
    createDebt,
    updateGoogleSheet,
    editDebt,
    deleteDebt,
};

function showDebts(req, res) {
    // console.log('showDebts user: ', req.user);
    Debt.find({
        user_id: req.user._id
    }, function (err, debts) {
        if (err) res.status(400).json(err);
        console.log(`showing debts`, debts[debts.length - 1]);
        res.status(200).json(debts);
    });
}

async function createDebt(req, res) {
    googleSheets.updateSheet(req.body);
    req.body.user_id = req.user;
    setTimeout(function () {
        console.log(googleSheets.rows);
        req.body.monthPaidOff = googleSheets.rows.data[0][[2]];
        //TODO add additional data points from sheet to model and parse int as necessary
        Debt.create(
            req.body, function (err, debt) {
                console.log(debt);
                if (err) throw err;
                // check on line below
                // res.status(200).json(debt);
            });
    }, 2000);
    // console.log(googleSheets.rows)
    // // Wait for sheets to run calculations then return figures
    // // setTimeout(() => console.log(hello), 3000);
    // // console.log('row2 ', googleSheets.rows);
    // // req.body.monthPaidOff = googleSheets.rows.data[0][[2]];
    // Debt.create(
    //     req.body, function (err, debt) {
    //         console.log(debt);
    //         if (err) throw err;
    //         // check on line below
    //         res.status(200).json(debt);
    //     })
    // send req.body to Google sheets
}

function updateGoogleSheet(req, res) {
    console.log('updating sheet online');
    googleSheets.updateSheet(req.body);
    res.json({ msg: 'Updated sheet' });
}

function editDebt(req, res) {
    return;
}

function deleteDebt(req, res) {
    return;
}
