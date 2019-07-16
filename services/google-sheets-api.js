//This page contains the required Google Sheets API actions

const fs = require('fs');
const { google } = require('googleapis');
const spreadsheetId = '1IAClT5484iFG6ByNMRmjoSUXYByDlIIiOwKtJ5KIJq8';
const TOKEN_PATH = 'token.json';
const rows = {};

module.exports = {
    updateSheet,
    retrieveSheetData,
    rows,
};

function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getNewToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}

function updateSheet(formData) {
    let range = 'Editable Form!C9';
    let valueInputOption = 'RAW';
    // Divide annual apr to decimal format
    let apr = parseInt(formData.apr)/100;
    let payment = parseInt(formData.minimumPayment);
    let balance = parseInt(formData.balance);
    // Take user inputs from the form and send them to the spreadsheet
    let values = [[balance, apr, payment]];
    let resource = {
        values,
    };
    fs.readFile('credentials.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        authorize(JSON.parse(content), function (auth) {
            // If this line has executed, the Google API update function is running 
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
                    retrieveSheetData();
                }
            });
        });
    });
}

function retrieveSheetData() {
    fs.readFile('credentials.json', async (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        await authorize(JSON.parse(content), async (auth) => {
            const sheets = google.sheets({ version: 'v4', auth });
            await getRows(sheets);
        });
    });
}

//  Retrieve updated row data to be exported to controller directory 
const getRows = async (sheets) => {
    await sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: 'Editable Form!D29:F29',
    }, function (err, result) {
        if (err) {
            console.error(err);
        }
        rows.data = result.data.values;
    });
}