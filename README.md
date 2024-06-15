# Node Practice

[![Node.js](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)

## 項目概述

這是一個使用 Node.js 構建的實踐項目，包括基本的服務器設置並整合了 LINE Bot
SDK、PostgreSQL 資料庫和其他 Node.js 庫。

## 系統要求

- **Node.js**: 建議使用 Node.js 的 LTS 版本（例如 v14.x 或更高）。
- **資料庫**: 本項目使用 PostgreSQL。確保你的開發環境中已安裝並運行 PostgreSQL。

## 安裝指南

要在本地安裝和運行這個項目，請按照以下步驟操作：

1. clone 存儲庫或下載並解壓縮這個項目。
2. cd 到資料夾中。
3. 運行 `npm install` 安裝套件。
4. 創建 `.env` 文件並根據 `.env.example`（如果有的話）設定環境變量。
5. 運行 `npm start` 啟動伺服器，這將使用 `nodemon` 來監控文件變化並重新加載。

## 如何使用

這個項目設定了基本的路由和 LINE Bot 的集成。你可以通過訪問以下端點來測試服務器功
能：

- `GET /api/example`：示範 API 調用。

請根據你的需要擴展和修改這些路由。

## 有使用的套件

- `express`: Web 框架
- `pg`: PostgreSQL 的 Node.js 客戶端
- `@line/bot-sdk`: LINE Bot SDK for Node.js
- `dotenv`: 管理環境變量
- `cors`: 啟用 CORS 跨網域支持
- `nodemon`: 在開發中自動重啟服務器

## 環境設定

這個項目在開發環境中使用 `.env` 文件來管理環境變量，當部署到 Heroku 時，請使用
Heroku 的 Config Vars 功能來設置環境變量。

### Heroku 環境變量設定

1. 登入 Heroku Dashboard。
2. 選擇你的應用並轉到「Settings」標籤。
3. 在「Config Vars」部分添加你的環境變量。

## 作者

- **陳威廷**
  - Email: [eazy_chen@icloud.com](mailto:eazy_chen@icloud.com)

## 貢獻指南

我們歡迎所有形式的貢獻，包括錯誤報告、功能請求或代碼提交。如果你想貢獻：

1. Fork 這個存儲庫。
2. 創建你的功能分支 (`git checkout -b feature/fooBar`)。
3. 提交你的更改 (`git commit -am 'Add some fooBar'`)。
4. 推送到分支 (`git push origin feature/fooBar`)。
5. 創建一個新的 Pull Request。

感謝你對這個項目的興趣和貢獻!
