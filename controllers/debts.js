var Debt = require('../models/debt');
var googleSheets = require('../services/google-sheets-api');

module.exports = {
    showDebts,
    createDebt,
    updateGoogleSheet,
    deleteDebt,
};

//Display index of a user's created debts
async function showDebts(req, res) {
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
    googleSheets.updateSheet(req.body);
    req.body.user_id = req.user;
    // Wait for sheets to run calculations then return figures
    setTimeout(function () {
        // Use values from cells on sheet to create model instance
        req.body.monthPaidOff = googleSheets.rows.data[0][[2]] ? googleSheets.rows.data[0][[2]] : 'In the future';
        req.body.monthsremaining = parseFloat(googleSheets.rows.data[0][[1]].replace(',', ''));
        //If debt is not scheduled to be paid off within 30 years, set special value in instance equal to infinity
        req.body.totalInterest = parseFloat(googleSheets.rows.data[0][[0]].replace(',', '')) > 0 ? parseFloat(googleSheets.rows.data[0][[0]].replace(',', '')).toFixed( 2 ) : Infinity;
        Debt.create(
            req.body, function (err, debt) {
                if (err) throw err;
                res.json(debt);
            });
    }, 6000)
}

//Send req.body to Google sheets to replace cell  data 
function updateGoogleSheet(req, res) {
    googleSheets.updateSheet(req.body);
    res.json({ msg: 'Updated sheet' });
}

function deleteDebt(req, res) {
    Debt.findByIdAndRemove(req.body.id, function (err) {
        res.json({ deleted: true })
    })
}
