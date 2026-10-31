/**
 * Google Apps Script backend
 * Create a Google Sheet, open Extensions > Apps Script, and paste this code.
 */
const SHEET_NAME = "Form Responses";

function doPost(e) {
  try {
    const data = (e && e.parameter) ? e.parameter : {};

    // Ignore basic bot submissions caught by the website honeypot.
    if (data.website) {
      return jsonResponse({ success: false, message: "Invalid submission" });
    }

    const name = clean(data.name, 100);
    const email = clean(data.email, 150);
    const phone = clean(data.phone, 25);
    const subject = clean(data.subject, 100);
    const message = clean(data.message, 3000);

    if (!name || !email || !subject || !message) {
      return jsonResponse({ success: false, message: "Missing required fields" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse({ success: false, message: "Invalid email" });
    }

    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      sheet.appendRow(["Timestamp", "Full Name", "Email", "Phone", "Subject", "Message"]);
      sheet.setFrozenRows(1);
    } else if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Full Name", "Email", "Phone", "Subject", "Message"]);
      sheet.setFrozenRows(1);
    }

    // Prefix user-provided values beginning with formula characters to reduce
    // the risk of spreadsheet formula injection.
    sheet.appendRow([
      new Date(),
      safeCell(name),
      safeCell(email),
      safeCell(phone),
      safeCell(subject),
      safeCell(message)
    ]);

    return jsonResponse({ success: true, message: "Saved successfully" });
  } catch (error) {
    console.error(error);
    return jsonResponse({ success: false, message: "Server error" });
  }
}

function clean(value, maxLength) {
  return String(value || "").trim().slice(0, maxLength);
}

function safeCell(value) {
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function jsonResponse(object) {
  return ContentService
    .createTextOutput(JSON.stringify(object))
    .setMimeType(ContentService.MimeType.JSON);
}

// Optional: open the deployed web app URL in a browser to check deployment.
function doGet() {
  return ContentService
    .createTextOutput("Reach form endpoint is running.")
    .setMimeType(ContentService.MimeType.TEXT);
}
