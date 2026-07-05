// Paste this into Extensions > Apps Script on the warranty spreadsheet, then
// Deploy > New deployment > Web app (Execute as: Me, Who has access: Anyone).
// Copy the deployment URL into WARRANTY_WEBHOOK_URL in .env.local.

var SPREADSHEET_ID = "1M2UHQUo5I4yx_wMp6ry7HJlY-0j-wrdw_C7vr43ilew";
var DRIVE_FOLDER_ID = "1gkgSQmRrDK4TIfJ60gHv6u9ZJkTtWlnT";
var SHEET_NAME = "Warranty Registrations";

var HEADERS = [
  "Timestamp",
  "Full Name",
  "Email",
  "Phone",
  "Shipping Address",
  "Product",
  "Model Number",
  "Serial Number",
  "Purchase Date",
  "Order ID",
  "Purchase Source",
  "Notes",
  "Invoice Link",
  "Product Image Link",
  "Application Folder",
];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    var sheet = getSheet_();
    var folder = createApplicationFolder_(data);

    var invoiceLink = saveFile_(folder, data.invoice);
    var imageLink = saveFile_(folder, data.productImage);

    sheet.appendRow([
      new Date(),
      data.fullName || "",
      data.email || "",
      data.phone || "",
      data.address || "",
      data.product || "",
      data.model || "",
      data.serial || "",
      data.purchaseDate || "",
      data.orderId || "",
      data.source || "",
      data.notes || "",
      invoiceLink,
      imageLink,
      folder.getUrl(),
    ]);

    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: err.message })).setMimeType(
      ContentService.MimeType.JSON
    );
  }
}

function getSheet_() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  }
  return sheet;
}

function createApplicationFolder_(data) {
  var root = DriveApp.getFolderById(DRIVE_FOLDER_ID);
  var stamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd HHmmss");
  var name = stamp + " - " + (data.fullName || "Unknown") + " - " + (data.orderId || "No Order ID");
  return root.createFolder(name);
}

function saveFile_(folder, fileData) {
  if (!fileData || !fileData.base64) return "";
  var blob = Utilities.newBlob(Utilities.base64Decode(fileData.base64), fileData.mimeType, fileData.name);
  var file = folder.createFile(blob);
  return file.getUrl();
}
