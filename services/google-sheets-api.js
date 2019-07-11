const fs = require('fs');
const { google } = require('googleapis');
const spreadsheetId = '1IAClT5484iFG6ByNMRmjoSUXYByDlIIiOwKtJ5KIJq8';

let range = 'Editable Form!C9';
let valueInputOption = 'RAW';
let balance = 5000;
let apr = .3;
let payment = 500;
let values = [[balance, apr, payment]];
let resource = {
    values,
};

module.exports = {
    updateSheet,
};

function updateSheet(formData) {
    fs.readFile('../credentials.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        authorize(JSON.parse(content), function (auth) {
            console.log('Google API update Is running from google-sheets-api');
            const sheets = google.sheets({ version: 'v4', auth });
            sheets.spreadsheets.values.update({
                spreadsheetId,
                range,
                valueInputOption,
                resource
            }, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Cells updated!!!!');
                }
            });
        });
    });
    return;
}