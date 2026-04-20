// Database.gs
// Google Sheets 讀寫，通常不需要修改這裡
//
// 工作表格式（sheet 名稱："posts"）：
// | A: id | B: title | C: message | D: author | E: time |

const SHEET_NAME = "posts";
const TIMEZONE   = "Asia/Taipei";

function getSheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
}

function getAllPosts() {
  const rows = getSheet().getDataRange().getValues();
  return rows.slice(1).map(function(row) {
    return { id: row[0], title: row[1], message: row[2], author: row[3], time: row[4] };
  }).reverse();
}

function savePost(title, message, author) {
  const id   = Utilities.getUuid();
  const time = new Date().toLocaleString("zh-TW", { timeZone: TIMEZONE });
  getSheet().appendRow([id, title, message, author, time]);
  return { id: id, title: title, message: message, author: author, time: time };
}

function respond(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
