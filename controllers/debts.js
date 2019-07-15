var Debt = require('../models/debt');
var googleSheets = require('../services/google-sheets-api');

module.exports = {
    showDebts,
    createDebt,
    updateGoogleSheet,
    deleteDebt,
};

async function showDebts(req, res) {
    // console.log('showDebts user: ', req.user);
    // Debt.find({
    //     user_id: req.user._id
    // }, function (err, debts) {
    //     if (err) res.status(400).json(err);
    //     // console.log(`showing debts`, debts[debts.length - 1]);
    //     res.status(200).json(debts);
    // });
    try {
        let debts = await Debt.find({
            user_id: req.user._id
        });
        res.status(200).json(debts);
    } catch (err) {
        return res.status(400).json(err);
    }
}

async function createDebt(req, res) {
    // const debt = new Debt(req.body);
    googleSheets.updateSheet(req.body);
    req.body.user_id = req.user;
    setTimeout(function () {
        req.body.monthPaidOff = googleSheets.rows.data[0][[2]];
        req.body.monthsremaining = parseFloat(googleSheets.rows.data[0][[1]].replace(',', ''));
        req.body.totalInterest = parseFloat(googleSheets.rows.data[0][[0]].replace(',', ''))>0 ? parseFloat(googleSheets.rows.data[0][[0]].replace(',', '')) : Infinity;
        // TODO handle negative amortized debts console.log(googleSheets.rows.data[0][[0]]>0)
        Debt.create(
            req.body, function (err, debt) {
                console.log(debt);
                if (err) throw err;
                res.json(debt);
            });
    }, 4000)
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

function deleteDebt(req, res) {
    Debt.findByIdAndRemove(req.body.id, function(err){
        res.json({deleted:true})
    })
}
