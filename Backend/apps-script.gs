/**
 * Hackbuzz — registration backend.
 *
 * SETUP:
 * 1. Go to https://sheets.google.com and create a new spreadsheet.
 *    Rename Sheet1's first row with these headers, in this order:
 *    Timestamp | Name | Email | Phone | Team Size | College
 *
 * 2. In the spreadsheet, go to Extensions > Apps Script.
 * 3. Delete any starter code and paste this whole file in.
 * 4. Click Deploy > New deployment.
 *      - Type: "Web app"
 *      - Execute as: "Me"
 *      - Who has access: "Anyone"
 * 5. Copy the deployment URL it gives you (ends in /exec).
 * 6. Paste that URL into SCRIPT_URL in index.html.
 *
 * Every time you edit this script, you must create a NEW deployment
 * (or "Manage deployments" > edit > new version) for changes to go live.
 */

function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var totalRows = sheet.getLastRow();
  var count = Math.max(0, totalRows - 1);
  return jsonResponse({ count: count });
}

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

  var data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return jsonResponse({ status: 'error', message: 'Invalid JSON' });
  }

  // Basic server-side validation — never trust the client alone.
  var name = (data.name || '').toString().trim();
  var email = (data.email || '').toString().trim();
  var phone = (data.phone || '').toString().trim();
  var team = (data.team || '').toString().trim();
  var college = (data.college || '').toString().trim();

  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !phone || !team || !college) {
    return jsonResponse({ status: 'error', message: 'Missing required fields' });
  }
  if (!emailPattern.test(email)) {
    return jsonResponse({ status: 'error', message: 'Invalid email' });
  }

  // Prevent duplicate registrations by email.
  var existing = sheet.getRange(2, 3, Math.max(sheet.getLastRow() - 1, 0)).getValues().flat();
  if (existing.indexOf(email) !== -1) {
    return jsonResponse({ status: 'error', message: 'Email already registered' });
  }

  sheet.appendRow([new Date(), name, email, phone, team, college]);

  return jsonResponse({ status: 'ok' });
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
