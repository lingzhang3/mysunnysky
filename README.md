# 公屋查詢 · Public Housing Search

一個純前端的公共／公營房屋（公屋）查詢示範應用。輸入條件即可即時篩選屋邨資料，毋須後端或建置工具，直接用瀏覽器開啟即可使用。

## 功能

- 🔍 **關鍵字搜尋**：按屋邨名稱模糊搜尋
- 📍 **地區篩選**：香港島／九龍／新界
- 🏠 **戶型篩選**：一人單位至六人或以上單位
- 💰 **租金上限**：以滑桿設定最高月租
- ⚡ 即時更新結果，無需重新整理

## 使用方法

直接在瀏覽器開啟 `index.html` 即可，例如：

```bash
# 任選其一
open index.html            # macOS
xdg-open index.html        # Linux

# 或啟動簡易本機伺服器
python3 -m http.server 8000
# 然後瀏覽 http://localhost:8000
```

## 檔案結構

| 檔案 | 說明 |
| --- | --- |
| `index.html` | 頁面結構與搜尋表單 |
| `styles.css` | 樣式 |
| `data.js` | 示範用屋邨資料 |
| `app.js` | 篩選與渲染邏輯 |

## 資料來源

`data.js` 內為**示範資料**，並非官方即時數據。如需接入真實資料，可將 `HOUSING_DATA` 替換為：

- 政府公開數據平台（[data.gov.hk](https://data.gov.hk)）的房屋資料 API
- 房屋委員會／房屋協會公開資料
- 自建後端 API

只要回傳的物件保持相同欄位（`name`、`region`、`district`、`flatTypes`、`rentFrom`、`rentTo`、`units`、`completed`），前端無需改動即可運作。
