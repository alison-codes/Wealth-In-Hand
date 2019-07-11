const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

let range = 'Editable Form!C9';
let valueInputOption = 'RAW';
let balance = 5000;
let apr = .3;
let payment = 500;

let values = [[balance, apr, payment]];
let resource = {
  values,
};

// export default {
//   retrieveSheetData,
// };

module.exports = {
  SSS,
}

function SSS() {
  console.log("ssssss")
}

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const TOKEN_PATH = 'token.json';
const spreadsheetId = '1IAClT5484iFG6ByNMRmjoSUXYByDlIIiOwKtJ5KIJq8'

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), updateSheetData);
  // authorize(JSON.parse(content), retrieveSheetData);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
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

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

function retrieveSheetData(auth) {
  console.log('Google API retrieve Is running');
  const sheets = google.sheets({ version: 'v4', auth });
  sheets.spreadsheets.values.get({
    spreadsheetId: spreadsheetId,
    range: 'Editable Form!D29:F29',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
      rows.map((row) => {
        console.log(`months to pay off = ${row[1]}`);
        console.log(`paid off by = ${row[2]}`);
        console.log(`total interest paid = ${row[0]}`);
      });
    } else {
      console.log('No data found.');
    }
  });
}

function updateSheetData(auth) {
  console.log('Google API update Is running');
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
      console.log('Cells updated.');
      retrieveSheetData(auth);
    }
  });
}

