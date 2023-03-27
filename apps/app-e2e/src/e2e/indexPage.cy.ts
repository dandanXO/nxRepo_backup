// NOTICE: refactor me
import {IndexServiceResponse} from "../../../app/src/app/flow/IndexFlow";
import {indexPagePo} from "../support/indexPage.po";

const APP_IDENTIFICATION = "[apps/app][e2e]";
const infoLog = (message, rest) => {
  if(!rest) {
    console.info(`${APP_IDENTIFICATION} ${message}`);
  } else {
    console.info(`${APP_IDENTIFICATION} ${message}`, rest);
  }
}

infoLog("env", Cypress.env());


// NOTE:
//  describe, it, GIVEN, WHEN, THEN

// describe("IndexPage-用戶相關", () => {
//
// });

describe('IndexPage', () => {
  beforeEach(() => {
    cy.viewport("iphone-3")
    cy.visit("/?token=6baecb1bf4fe4c85aecc0d85b30c8dfd")
  })

  afterEach(() => {
    //
  })

  it.only("status: 用戶未認證", () => {
    // NOTE: Given
    // const userServiceResponse = User
    const indexServiceResponse: IndexServiceResponse = {
      "totalAmount": 15000,
      "usedAmount": 15000,
      "availableAmount": 0,
      "quotaBar": {
        "min": 0,
        "max": 0,
        "current": 0,
        "serial": 1000
      },
      "chargeFeeDetails": [
        {
          "title": "Processing Fee",
          "counting": 0.4,
          "key": "PROCESSING_FEE"
        },
        {
          "title": "Service Fee",
          "counting": 0.5,
          "key": "SERVICE_FEE"
        },
        {
          "title": "Interest Fee",
          "counting": 0.1,
          "key": "LOAN_INTEREST"
        }
      ],
      "products": [
        {
          "productId": 1,
          "productName": "AA LOAN",
          "logoUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/icon_logo/8285099.png",
          "min": 2000,
          "max": 5000,
          "terms": 7,
          "platformChargeFeeRate": 0.4
        },
        {
          "productId": 2,
          "productName": "BB LOAN",
          "logoUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/icon_logo/8285141.png",
          "min": 3000,
          "max": 5000,
          "terms": 7,
          "platformChargeFeeRate": 0.4
        },
        {
          "productId": 3,
          "productName": "CC LOAN",
          "logoUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/icon_logo/8285186.png",
          "min": 4000,
          "max": 6000,
          "terms": 7,
          "platformChargeFeeRate": 0.4
        }
      ],
      "needRiskKycUpdate": false,
      "riskReject": false,
      "refreshable": true,
      "refreshOverRetry": false,
      "orderUnderReview": false,
      "refreshableUntil": "2023-03-28T08:10:24",
      "offerExpireTime": "2023-03-28T08:10:24",
      "oldUserForceApply": false,
      "payableRecords": [
        {
          "productLogo": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
          "productName": "AA LOAN",
          "payableAmount": 1000,
          "dueDate": "2023-03-29",
          "overdue": false,
          "repayUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png"
        }
      ],
      "marquee": "我是跑馬燈...",
      "popupUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
      "customerServiceUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-7523112347980214.png",
      "bankBindH5url": "https://frontend.india-api-dev.com/bank-bind?token=d7f9d8262cb34bc3ac709c85582a7188&cardholderName=gp"
    }
    cy.intercept("/index", indexServiceResponse);

    // NOTE: When
    // NOTE: then
    // 看到跑馬燈
    indexPagePo.marquee().contains(indexServiceResponse.marquee);
    // 看到 welcome 包含姓名、客服 Button
    // indexPagePo.welcome().contains()
    // 看到可借款額度區間
    // 看到廣告利息與借貸天數
    // NOTE: important 可點選按鈕去認證
    // 看到廣告區塊
  })

  it("status: 用戶認證中", () => {
    // NOTE: then
    // 看到跑馬燈
    // 看到 welcome 包含姓名、客服 Button
    // NOTE: important 看到反灰無法使用的可借款額度拉霸、歸零的倒數計計時
    // NOTE: important 看到文字顯示最低與最高範圍為 ****、拉霸按鈕在最右邊
    // NOTE: important 看到用戶認證中訊息
    // NOTE: important 看不到 Apply Button 、可點選 View Application Progress
  })

  it("status: 用戶認證被拒絕", () => {
    // NOTE: then
    // 看到跑馬燈
    // 看到 welcome 包含姓名、客服 Button
    // NOTE: important 看到反灰無法使用的可借款額度拉霸、歸零的倒數計計時
    // NOTE: important 看到文字顯示最低與最高範圍為 ****、拉霸按鈕在最右邊
    // NOTE: important 看到用戶認證被拒絕訊息
    // NOTE: important 看不到 Apply Button 、可點選 View Application Progress
  })

  // NOTICE: 訂單相關


  // NOTICE: 先不測試此情境
  // it("status: 用戶已認證、無任何的訂單", () => {
  //
  // })

  // NOTE: 但申請後還沒成功額度會扣嗎?使用者點擊Apply，才知道訂單審核中
  // it("status: 用戶已認證、使用者點擊Apply，才知道訂單審核中", () => {
  //   //
  // })

  it("status: 用戶已認證、有3天即將到期的訂單", () => {
    // NOTE: then
    // 看到跑馬燈
    // 看到 welcome 包含姓名、客服 Button
    // NOTE: important 看到逾期的訊息資訊
    // NOTE: important 能點擊 repay button 跳轉到借款記錄頁面
    // NOTE: important 看到不反灰但無法使用的可借款額度拉霸、無法倒數計計時
    // NOTE: important 看到文字顯示最低與最高範圍為 ****、拉霸歸零到最左邊
    // NOTE: important 倒數計時歸零
    // 正常隨意顯示 Loan Over View
    // NOTE: important 看到下方 tips 優先還款訊息
    // NOTE: important 看到反灰無法點擊的 Apply Now Button
  })

  it("status: 用戶已認證、有逾期的訂單", () => {
    // NOTE: then
    // 看到跑馬燈
    // 看到 welcome 包含姓名、客服 Button
    // NOTE: important 看到逾期的訊息資訊、提醒您需要優先還清逾期款項才能再借款
    // NOTE: important 能點擊 repay button 跳轉到借款記錄頁面
    // NOTE: important 看到反灰但無法使用的可借款額度拉霸、無法倒數計計時
    // NOTE: important 看到文字顯示最低與最高範圍為 ****、拉霸歸零到最左邊
    // NOTE: important 倒數計時歸零
    // 正常隨意顯示 Loan Over View
    // NOTE: important 看到下方 tips 優先還款訊息
    // NOTE: important 看到反灰無法點擊的 Apply Now Button
    // NOTE: important 看到下方 Tab 的 Payment 有紅點提示
  })

  // NOTICE: 情境：之前有訂單，最近一次訂單被拒 ???
  it("status: 用戶已認證、有訂單被拒絕。情境：之前有訂單，最近一次訂單被拒。", () => {
    // NOTE: then
    // 看到跑馬燈
    // 看到 welcome 包含姓名、客服 Button
    // NOTE: important 看到反灰無法使用的可借款額度拉霸、歸零的倒數計計時
    // NOTE: important 看到文字顯示最低與最高範圍為 ****、拉霸按鈕在最右邊
    // NOTE: important 看到訂單被拒絕訊息，可返回借款天數，新客為 90 天、老客為 7 天。
    // NOTE: important 根據可返回借款天數顯示倒數計時器
  })


  // NOTICE: 風控相關
  it("status: 用戶已認證、風控額度時間無效，需要重新獲取信用額度。", () => {
    // NOTE: then
    // 看到跑馬燈
    // 看到 welcome 包含姓名、客服 Button
    // NOTE: important 看到不反灰但無法使用的可借款額度拉霸、無法倒數計計時
    // NOTE: important 看到文字顯示最低與最高範圍為 ****、拉霸歸零到最中間
    // 正常隨意顯示 Loan Over View
    // NOTE: important 顯示文案：我們建議您在重新申請更高的信用額度之前優先還款。
    // NOTE: important 看到 Reacquire Credit Limit Button 可以點選。
    // NOTE: important 點選後 Reacquire Credit Limit Button 出現動畫
    // NOTE: important 會看到可關閉的 popup 顯示額度刷心中相關訊息。
    // NOTE: important 等待 20 秒 會取得結果，沒結果繼續等待 20秒，以此類推。
    it("refresh 回來有風控時間有效、但額度不足", () => {
      //
    })
    it("refresh 回來有風控時間有效、額度足夠", () => {
      //
    })

  })

  it("status: 用戶已認證、風控額度時間無效，已經重新獲取信用額度過一次。", () => {
    // NOTE: then
    // 看到跑馬燈
    // 看到 welcome 包含姓名、客服 Button
    // NOTE: important 看到不反灰但無法使用的可借款額度拉霸、無法倒數計計時
    // NOTE: important 看到文字顯示最低與最高範圍為 ****、拉霸歸零到最右邊
    // 正常隨意顯示 Loan Over View
    // NOTE: important 看到下方 tips 額度相關訊息
    // NOTE: important 看到反灰無法點擊的 Apply Now Button
  })

  it("status: 用戶已認證、風控額度時間有效，但額度不足", () => {
    // NOTE: then
    // 看到跑馬燈
    // 看到 welcome 包含姓名、客服 Button
    // NOTE: important 看到不反灰但可借款額度拉霸最低與最高都是0、繼續倒數計計時
    // 正常隨意顯示 Loan Over View
    // NOTE: important 看到下方 tips 額度不足相關訊息
    // NOTE: important 看到反灰無法點擊的 Apply Now Button

  })

  it("status: 用戶已認證、風控額度時間有效，額度足夠。", () => {
    // NOTE: then
    // 看到跑馬燈
    // 看到 welcome 包含姓名、客服 Button
    // NOTE: important 看到不反灰，可借款額度拉霸最低與最高都是正常值、繼續倒數計計時
    // NOTE: important 看到推薦的產品列表
    // 正常隨意顯示 Loan Over View
    // NOTE: important 可以點擊 Apply Now Button
  })

  // NOTICE: 用戶已認證、風控有效，額度足夠下。開始 Apply 的流程
  it("status: 用戶已認證、風控額度時間有效，額度足夠。點擊 Apply 後，再次確認後，完成 Apply", () => {
    // NOTE: important 看到已選擇的推薦商品項目、可點選展開單一商品了解更詳細的資訊
    // NOTE: important 顯示全部商品計算後的總結
    // NOTE: important 顯示銀行卡
    // NOTE: important 可切換銀行卡
    // NOTE: important 可點選按鈕觀看 Loan Agreement
    // NOTE: important 點絢 confirm 可看到可關閉 Popup 顯示借貸已申請畫面
  })

});
