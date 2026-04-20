# BulletinBoard 專案規範

## 技術棧
- 前端：Vite + React + TypeScript
- 後端：Google Apps Script (GAS) Web App，資料存於 Google Sheets

## GAS 部署限制
- 本地修改 `.gs` 檔案不會影響線上環境
- 測試網址（`/dev`）：需執行 `clasp push` 後才生效
- 正式網址（`/exec`）：需到 GAS 編輯器重新部署才會更新

## GAS CORS workaround
- POST 請求必須使用 `Content-Type: text/plain`，不能用 `application/json`
- 原因：GAS 不支援 `application/json` 的 CORS preflight

## 開發流程
- 串接新 API 前，先討論 UI 方案與使用者對齊想法，確認後才開始實作
