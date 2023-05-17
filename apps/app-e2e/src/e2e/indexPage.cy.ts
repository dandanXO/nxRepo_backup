// NOTICE: refactor me
import {IndexServiceResponse} from "../../../app/src/app/api/service";

import {indexPagePo} from "../support/indexPage.po";
import moment from "moment-timezone"
import {USER_AUTH_STATE} from "../../../app/src/app/domain/user/USER_AUTH_STATE";
import {LoanServiceResponse} from "../../../app/src/app/api/loanService/service/postApplyLoanService";
import {GetBankCardListResponse} from "../../../app/src/app/api/userService/GetBankCardListResponse";
import {GetInitServiceResponse} from "../../../app/src/app/api/appService/GetInitServiceResponse";
import {SDKidCardOcr} from "../../../app/src/app/api/appService/SDKidCardOcr";
import {SDKliveDetect} from "../../../app/src/app/api/appService/SDKliveDetect";
import {SDKtaxCardOcr} from "../../../app/src/app/api/appService/SDKtaxCardOcr";
import {GetQuotaModelStatusResponse} from "../../../app/src/app/api/loanService/GetQuotaModelStatusResponse";
import {GetUserInfoServiceResponse} from "../../../app/src/app/api/userService/GetUserInfoServiceResponse";
import {GetOpenIndexResponse} from "../../../app/src/app/api/indexService/GetOpenIndexResponse";
import {Simulate} from "react-dom/test-utils";
import waiting = Simulate.waiting;

const INDIA_TIME_ZONE = "Asia/Kolkata";
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

function visitIndexPage() {
  // cy.visit("/?token=6baecb1bf4fe4c85aecc0d85b30c8dfd")
  // cy.visit("/?pageNumber=0&pageSize=500&status=UNPAID&token=ada8c62f24844155877b8af343d5ce1f")
  cy.visit("/v2?token=246b4469e1004505a5a45f29b4a569a1", {
    onBeforeLoad(win: Cypress.AUTWindow) {
      // @ts-ignore
      // cy.stub(win, "onUploadKycBackgroundData", function () {
        // appStore.dispatch(SystemCaseActions.SystemKycBackgroundDataUploadedSaga(true));
      // })
      // Stub your functions here
      // cy.stub(win, 'prompt').returns('my custom message')
    }
  })
}
describe('IndexPage', () => {

  beforeEach(() => {
    // cy.viewport("iphone-5")
    // NOTE: figma 360, 640
    cy.viewport(360, 640);
    // NOTICE: 不能在這邊放 visit ，不然 other each 會 intercept 不到 request

    const initResponse: GetInitServiceResponse = {
      "nbfc":false,
      "showPermission":true,
      "showTermAndCondition":true,
      "partnership":false,
      "partnershipUrl":"",
      "i18nLastUpdateTime":1678711946,
      "csEmail":"123@gmail.com",
      "csContactNumber":"1234567890",
      "sdkProvider":
        {
          "taxCardOcr": SDKtaxCardOcr.NONE,
          "idCardOcr": SDKidCardOcr.NONE,
          "liveDetect": SDKliveDetect.NONE,
        },
      "crossRegionIp":false,
      "loginFirst":false,
      "kycFirst":false,
      "indexH5Url":null,
      "couponH5Url":null
    }
    cy.intercept("/api/v2/init?packageId**", initResponse)
  })

  afterEach(() => {
    // cy.screenshot();
  })

  // TODO: 得與後端即時取得訪客帳號
  it.skip("status: 用戶未認證", () => {
    // NOTE: Given - 訪客
    const userServiceResponse: GetUserInfoServiceResponse = {
      "userName": "9013452123",
      "status": USER_AUTH_STATE.ready,
      "demoAccount": false,
      "oldUser": false,
      "needUpdateKyc": false,
      "organic": false
    }
    cy.intercept("get", "/api/v2/login/info", {
      statusCode: 200,
      body: userServiceResponse,
    }).as("getInfo").then(() => {
      console.log("info");
    })

    // NOTE: Given
    const openIndexServiceResponse: GetOpenIndexResponse = {
      "popupUrl": null,
      "marquee": "Borrow now for discounts, get certified immediately to earn the discounts.",
      "loanQuotaAmount": "160-9000",
      "interestRate": "15 - 40% / day",
      "loanTerms": "10-50 Days",
      "banners": [
        {
          "imageUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/ad_logo/2471912.jpg",
          "jumpUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/dummy/popup.html"
        }
      ],
      "customerServiceUrl": null,
      "forceApplyForNew": false
    }
    cy.intercept("get", "/api/v3/open-index**", {
      statusCode: 200,
      body: openIndexServiceResponse,
    }).as("getIndex").then(() => {
      console.log("index");
    })

    visitIndexPage();

    cy.wait(["@getInfo", "@getIndex"]).then(() => {
      // NOTE: When
      // NOTE: then
      // 看到跑馬燈
      indexPagePo.marquee().contains(openIndexServiceResponse.marquee)
      // 看到 welcome 包含姓名、客服 Button
      // indexPagePo.welcome().contains(userServiceResponse.userName)
      // 看到可借款額度區間
      indexPagePo.loanableAmount().contains(openIndexServiceResponse.loanQuotaAmount)
      // 看到廣告利息與借貸天數
      // indexPagePo.adProductInfo()
      // NOTE: important 可點選按鈕去認證
      indexPagePo.getMyLimitButton().should("be.visible")
      // 看到廣告區塊
      indexPagePo.adBanner().should("be.visible")
    })

  })

  // FIGMA: User In progress (Android: Level 2)
  it("status: 用戶認證中", () => {
    // NOTE: Given
    const userServiceResponse: GetUserInfoServiceResponse = {
      "userName": "9013452123",
      "status": USER_AUTH_STATE.authing,
      "demoAccount": false,
      "oldUser": false,
      "needUpdateKyc": false,
      "organic": false
    }
    cy.intercept("get", "/api/v2/login/info", {
      statusCode: 200,
      body: userServiceResponse,
    }).as("getInfo").then(() => {
      console.log("info");
    })

    // NOTE: Given
    const indexServiceResponse: IndexServiceResponse = {


      "refreshable": false,
      "noQuotaByRetryFewTimes": false,


      "riskReject": false,
      "refreshableUntil": "2023-03-28T08:10:24",

      "offerExpireTime": moment().tz(INDIA_TIME_ZONE).add(-1, "days"),

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
      "orderUnderReview": false,
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
    cy.intercept("get", "/api/v3/index", {
      statusCode: 200,
      body: indexServiceResponse,
    }).as("getIndex").then(() => {
      console.log("index");
    })

    visitIndexPage();

    // NOTE: then
    // 看到跑馬燈
    indexPagePo.marquee().should("be.visible");
    // 看到 welcome 包含姓名、客服 Button
    // indexPagePo.welcome().contains(userServiceResponse.userName)

    // NOTE: important 看到反灰無法使用的可借款額度拉霸、歸零的倒數計計時
    // NOTE: important 看到文字顯示最低與最高範圍為 ****、拉霸按鈕在最右邊
    // NOTE: important 看到用戶認證中訊息
    // NOTE: important 看不到 Apply Button 、可點選 View Application Progress
  })

  // User reject (Android: Level 1)
  it("status: 用戶認證被拒絕", () => {
    // NOTE: Given
    const userServiceResponse: GetUserInfoServiceResponse = {
      "userName": "9013452123",
      "status": USER_AUTH_STATE.reject,
      "demoAccount": false,
      "oldUser": false,
      "needUpdateKyc": false,
      "organic": false
    }
    cy.intercept("get", "/api/v2/login/info", {
      statusCode: 200,
      body: userServiceResponse,
    }).as("getInfo").then(() => {
      console.log("info");
    })
    visitIndexPage();

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


  // FIGMA: 首頁-認證完成-訂單成立-有即將到期單 (Android: Level 6)
  it("status: 用戶已認證、有3天即將到期的訂單", () => {
    // NOTE: Given
    const userServiceResponse: GetUserInfoServiceResponse = {
      "userName": "9013452123",
      "status": USER_AUTH_STATE.success,
      "demoAccount": false,
      "oldUser": false,
      "needUpdateKyc": false,
      "organic": false
    }
    cy.intercept("get", "/api/v2/login/info", {
      statusCode: 200,
      body: userServiceResponse,
    }).as("getInfo").then(() => {
      console.log("info");
    })

    // NOTE: Given
    const indexServiceResponse: IndexServiceResponse = {
      "totalAmount": 15000,
      "usedAmount": 15000,
      "availableAmount": 900,
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
      "noQuotaByRetryFewTimes": false,
      "orderUnderReview": false,
      "refreshableUntil": "2023-03-28T08:10:24",
      "offerExpireTime": moment().tz(INDIA_TIME_ZONE).add(-1, "days"),
      "oldUserForceApply": false,
      "payableRecords": [
        {
          "productLogo": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
          "productName": "AA LOAN",
          "payableAmount": 1000,
          "dueDate": moment().tz(INDIA_TIME_ZONE).add(2, "days").add("1", "minutes"),
          "overdue": false,
          "repayUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png"
        }
      ],
      "marquee": "我是跑馬燈...",
      "popupUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
      "customerServiceUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-7523112347980214.png",
      "bankBindH5url": "https://frontend.india-api-dev.com/bank-bind?token=d7f9d8262cb34bc3ac709c85582a7188&cardholderName=gp"
    }
    cy.intercept("get", "/api/v3/index", {
      statusCode: 200,
      body: indexServiceResponse,
    }).as("getIndex").then(() => {
      console.log("index");
    })

    visitIndexPage();
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

  // FIGMA: 首頁-認證完成-訂單逾期 (Android: Level 5)
  it("status: 用戶已認證、有逾期的訂單", () => {
    // NOTE: Given
    const userServiceResponse: GetUserInfoServiceResponse = {
      "userName": "9013452123",
      "status": USER_AUTH_STATE.success,
      "demoAccount": false,
      "oldUser": false,
      "needUpdateKyc": false,
      "organic": false
    }
    cy.intercept("get", "/api/v2/login/info", {
      statusCode: 200,
      body: userServiceResponse,
    }).as("getInfo").then(() => {
      console.log("info");
    })

    // NOTE: Given
    const indexServiceResponse: IndexServiceResponse = {
      "totalAmount": 15000,
      "usedAmount": 15000,
      "availableAmount": 900,
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
      "offerExpireTime": moment().tz(INDIA_TIME_ZONE).add(-1, "seconds"),
      "oldUserForceApply": false,
      "payableRecords": [
        {
          "productLogo": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
          "productName": "AA LOAN",
          "payableAmount": 1000,
          "dueDate": moment().tz(INDIA_TIME_ZONE).add(-1, "second"),
          "overdue": true,
          "repayUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png"
        }
      ],
      "marquee": "我是跑馬燈...",
      "popupUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
      "customerServiceUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-7523112347980214.png",
      "bankBindH5url": "https://frontend.india-api-dev.com/bank-bind?token=d7f9d8262cb34bc3ac709c85582a7188&cardholderName=gp"
    }
    cy.intercept("get", "/api/v3/index", {
      statusCode: 200,
      body: indexServiceResponse,
    }).as("getIndex").then(() => {
      console.log("index");
    })

    visitIndexPage();
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
  // FIGMA: 首頁-認證完成-新客訂單被拒/老客獲取額度被拒 (Android: Level 3)
  it("status: 用戶已認證、新訂單被拒絕。老客情境：之前有訂單，最近一次訂單被拒。", () => {

    // NOTE: Given
    const userServiceResponse: GetUserInfoServiceResponse = {
      "userName": "9013452123",
      "status": USER_AUTH_STATE.success,
      "demoAccount": false,
      "oldUser": false,
      "needUpdateKyc": false,
      "organic": false
    }
    cy.intercept("get", "/api/v2/login/info", {
      statusCode: 200,
      body: userServiceResponse,
    }).as("getInfo").then(() => {
      console.log("info");
    })




    // NOTE: Given
    const indexServiceResponse: IndexServiceResponse = () => ({
      // NOTICE: 是否直接表明要不顯示按鈕? 但還有商品沒有選擇的條件
      "refreshable": false,
      // NOTICE: 當 refreshable true, 但是 noQuotaByRetryFewTimes true 一樣不能重刷?
      "noQuotaByRetryFewTimes": false,
      // NOTICE: 情境1: 當 refreshable true, noQuotaByRetryFewTimes false 顯示能夠重刷的倒數計時。
      // NOTICE: 情境2:  riskReject 為 true, 也是看下面的參數
      "riskReject": true,
      "refreshableUntil": moment().tz(INDIA_TIME_ZONE).add(5, "seconds"),

      // NOTICE:
      "offerExpireTime": moment().tz(INDIA_TIME_ZONE).add(-1, "days"),

      "oldUserForceApply": false,
      "needRiskKycUpdate": false,
      "orderUnderReview": false,

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



      "payableRecords": [
        {
          "productLogo": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
          "productName": "AA LOAN",
          "payableAmount": 1000,
          "dueDate": moment().tz(INDIA_TIME_ZONE).add(-1, "second"),
          "overdue": true,
          "repayUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png"
        }
      ],
      "marquee": "我是跑馬燈...",
      "popupUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
      "customerServiceUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-7523112347980214.png",
      "bankBindH5url": "https://frontend.india-api-dev.com/bank-bind?token=d7f9d8262cb34bc3ac709c85582a7188&cardholderName=gp"
    })
    // cy.intercept("get", "/api/v3/index", {
    //   statusCode: 200,
    //   body: indexServiceResponse,
    // }).as("getIndex").then(() => {
    //   console.log("index");
    // })

    let indexCount = 0;
    cy.intercept("get", "/api/v3/index", (req) => {
        indexCount = indexCount + 1;
        req.continue((res) => {
        res.send({
            statusCode: 200,
            body: {
              ...indexServiceResponse(),
              indexCount,
            },
          })
      })
    })


    visitIndexPage();
    // NOTE: then
    // 看到跑馬燈
    // 看到 welcome 包含姓名、客服 Button
    // NOTE: important 看到反灰無法使用的可借款額度拉霸、歸零的倒數計計時
    // NOTE: important 看到文字顯示最低與最高範圍為 ****、拉霸按鈕在最右邊
    // NOTE: important 看到訂單被拒絕訊息，可返回借款天數，新客為 90 天、老客為 7 天。
    // NOTE: important 根據可返回借款天數顯示倒數計時器
  })


  // NOTICE: 風控相關
  // NOTICE: 沒有應還訂單
  // FIGMA: 首頁-認證完成-額度時間到期-需重新取得信用額度 (Android: Level 8)
  it("status: 用戶已認證、風控額度時間無效，需要重新獲取信用額度。沒有應還訂單。這時需要取得權限授權，沒有授權會回到首頁，不能重新獲取額度。需要有授權才能重新獲取額度", () => {
    // NOTE: Given
    const userServiceResponse: GetUserInfoServiceResponse = {
      "userName": "9013452123",
      // NOTICE: GIVEN: 用戶已認證
      "status": USER_AUTH_STATE.success,
      "demoAccount": false,
      "oldUser": false,
      "needUpdateKyc": false,
      "organic": false
    }
    cy.intercept("get", "/api/v2/login/info", {
      statusCode: 200,
      body: userServiceResponse,
    }).as("getInfo").then(() => {
      console.log("info");
    })

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
          "min": 1000,
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
      // NOTE: 優先權最高
      "riskReject": false,
      "refreshable": true,
      "noQuotaByRetryFewTimes": false,
      "orderUnderReview": false,
      "refreshableUntil": "2023-03-28T08:10:24",
      // NOTICE: GIVEN: 風控額度時間無效
      "offerExpireTime": moment().tz(INDIA_TIME_ZONE).add("-1", "seconds"),
      "oldUserForceApply": false,
      // NOTICE: GIVEN: 沒有應還訂單
      "payableRecords": [],
      "marquee": "我是跑馬燈...",
      "popupUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
      "customerServiceUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-7523112347980214.png",
      "bankBindH5url": "https://frontend.india-api-dev.com/bank-bind?token=d7f9d8262cb34bc3ac709c85582a7188&cardholderName=gp"
    }

    const validIndexServiceResponse: IndexServiceResponse = {
      "totalAmount": 15000,
      "usedAmount": 13000,
      "availableAmount": 2000,
      "quotaBar": {
        "min": 1000,
        "max": 2000,
        "current": 1000,
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
          "min": 1000,
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
      // NOTICE: 優先權最高
      "riskReject": false,
      "refreshable": true,
      "noQuotaByRetryFewTimes": false,
      "orderUnderReview": false,
      "refreshableUntil": "2023-03-28T08:10:24",
      "offerExpireTime": moment().tz(INDIA_TIME_ZONE).add("1", "days"),
      "oldUserForceApply": false,
      "payableRecords": [],
      "marquee": "我是跑馬燈...",
      "popupUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
      "customerServiceUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-7523112347980214.png",
      "bankBindH5url": "https://frontend.india-api-dev.com/bank-bind?token=d7f9d8262cb34bc3ac709c85582a7188&cardholderName=gp"
    }


    let indexCount = 0;
    cy.intercept("get", "/api/v3/index", (res) => {
      res.continue((req) => {
        if(indexCount === 0) {
          console.log("[首頁]1")
          req.send({
            statusCode: 200,
            body: indexServiceResponse,
          })
        } else {
          console.log("[首頁]2")
          req.send({
            statusCode: 200,
            body: validIndexServiceResponse,
          })
        }
        indexCount++;
      })
    }).as("getIndex").then(() => {
      console.log("index");
    })


    // const getQuotaModelStatus: GetQuotaModelStatusResponse = {
    //   calculating: true,
    //   effective: false,
    //   offerExpireTime: ""
    // }
    // cy.intercept("get", "/api/v3/loan/quota-model-status", {
    //   statusCode: 200,
    //   body: getQuotaModelStatus,
    // })


    const getPendingQuotaModelStatus: GetQuotaModelStatusResponse = {
      calculating: true,
      effective: false,
      offerExpireTime: ""
    }
    const getSuccessQuotaModelStatus: GetQuotaModelStatusResponse = {
      calculating: false,
      effective: true,
      offerExpireTime: moment().tz(INDIA_TIME_ZONE).add("1", "days"),
    }

    // NOTICE: 模擬要到第五次才成功取得有效風控額度資料
    let count = 1
    cy.intercept("get", "/api/v3/loan/quota-model-status", (req) => {
      req.continue(res => {
        if(count < 5) {
          res.send({
            statusCode: 200,
            body: getPendingQuotaModelStatus,
          })
        } else {
          res.send({
            statusCode: 200,
            body: getSuccessQuotaModelStatus,
          })
        }
      })
      count++;
    })

    visitIndexPage();

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

    // NOTICE: 還缺
    // refresh 回來有風控時間有效、但額度不足
    // refresh 回來有風控時間有效、額度足夠

  })

  // NOTICE: 有應還訂單
  // FIGMA: 首頁-認證完成-額度時間到期-需重新取得信用額度 (Android: Level 8)
  it("status: 用戶已認證、風控額度時間無效，需要重新獲取信用額度。有應還訂單。這時需要取得權限授權，沒有授權會回到首頁，不能重新獲取額度。需要有授權才能重新獲取額度", () => {
    // NOTE: Given
    const userServiceResponse: GetUserInfoServiceResponse = {
      "userName": "9013452123",
      "status": USER_AUTH_STATE.success,
      "demoAccount": false,
      "oldUser": false,
      "needUpdateKyc": false,
      "organic": false
    }
    cy.intercept("get", "/api/v2/login/info", {
      statusCode: 200,
      body: userServiceResponse,
    }).as("getInfo").then(() => {
      console.log("info");
    })

    // NOTE: Given
    const indexServiceResponse: IndexServiceResponse = {
      "offerExpireTime": moment().tz(INDIA_TIME_ZONE).add("-1", "days"),
      "payableRecords": [
        {
          "productLogo": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
          "productName": "AA LOAN",
          "payableAmount": 1000,
          "dueDate": moment().tz(INDIA_TIME_ZONE).add(7, "days"),
          "overdue": false,
          "repayUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png"
        }
      ],

      // NOTICE: 優先權最高
      "riskReject": false,
      "refreshable": true,
      "noQuotaByRetryFewTimes": true,
      "orderUnderReview": false,
      "refreshableUntil": "2023-03-28T08:10:24",

      "oldUserForceApply": false,

      "totalAmount": 15000,
      "usedAmount": 15000,
      "availableAmount": 900,
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

      "marquee": "我是跑馬燈...",
      "popupUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
      "customerServiceUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-7523112347980214.png",
      "bankBindH5url": "https://frontend.india-api-dev.com/bank-bind?token=d7f9d8262cb34bc3ac709c85582a7188&cardholderName=gp"
    }
    cy.intercept("get", "/api/v3/index", {
      statusCode: 200,
      body: indexServiceResponse,
    }).as("getIndex").then(() => {
      console.log("index");
    })


    visitIndexPage();

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

    // NOTICE: refresh 回來有風控時間有效、但額度不足
    // NOTICE: refresh 回來有風控時間有效、額度足夠

  })


  // NOTICE: 使用者自行點擊獲取額度
  it("status: 用戶已認證、風控額度時間無效，使用者自己已經重新獲取信用額度過一次。", () => {
    // NOTE: Given
    const userServiceResponse: GetUserInfoServiceResponse = {
      "userName": "9013452123",
      "status": USER_AUTH_STATE.success,
      "demoAccount": false,
      "oldUser": false,
      "needUpdateKyc": false,
      "organic": false
    }
    cy.intercept("get", "/api/v2/login/info", {
      statusCode: 200,
      body: userServiceResponse,
    }).as("getInfo").then(() => {
      console.log("info");
    })

    // NOTE: Given
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
      // NOTICE: 優先權最高
      "riskReject": false,
      "refreshable": true,
      "noQuotaByRetryFewTimes": false,
      "orderUnderReview": false,
      "refreshableUntil": "2023-03-28T08:10:24",
      "offerExpireTime": moment().tz(INDIA_TIME_ZONE).add("-1", "days"),
      "oldUserForceApply": false,
      "payableRecords": [
        {
          "productLogo": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
          "productName": "AA LOAN",
          "payableAmount": 1000,
          "dueDate": moment().tz(INDIA_TIME_ZONE).add(7, "days"),
          "overdue": false,
          "repayUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png"
        }
      ],
      "marquee": "我是跑馬燈...",
      "popupUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
      "customerServiceUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-7523112347980214.png",
      "bankBindH5url": "https://frontend.india-api-dev.com/bank-bind?token=d7f9d8262cb34bc3ac709c85582a7188&cardholderName=gp"
    }

    // NOTE: simulate for android situation
    console.log(window)
    // window["onUploadKycBackgroundData"](true);

    cy.intercept("get", "/api/v3/index", {
      statusCode: 200,
      body: indexServiceResponse,
    }).as("getIndex").then(() => {
      console.log("index");
    })

    visitIndexPage();

    // NOTICE: 模擬用戶點擊
    // cy.get("[data-testing-id='reacquireCredit']").click();

    // NOTE: then
    // 看到跑馬燈
    // 看到 welcome 包含姓名、客服 Button
    // NOTE: important 看到不反灰但無法使用的可借款額度拉霸、無法倒數計計時
    // NOTE: important 看到文字顯示最低與最高範圍為 ****、拉霸歸零到最右邊
    // 正常隨意顯示 Loan Over View
    // NOTE: important 看到下方 tips 額度相關訊息
    // NOTE: important 看到反灰無法點擊的 Apply Now Button

  })

  // NOTE: 這情況沒有實作到
  it("status: 用戶已認證、風控額度時間無效，使用者自己重新獲取信用三次了。", () => {
    // NOTE: Given
    const userServiceResponse: GetUserInfoServiceResponse = {
      "userName": "9013452123",
      "status": USER_AUTH_STATE.success,
      "demoAccount": false,
      "oldUser": false,
      "needUpdateKyc": false,
      "organic": false
    }
    cy.intercept("get", "/api/v2/login/info", {
      statusCode: 200,
      body: userServiceResponse,
    }).as("getInfo").then(() => {
      console.log("info");
    })

    // NOTE: Given
    const indexServiceResponse: IndexServiceResponse = {

      // NOTICE: 風控額度直接不足，無法執行重刷
      "noQuotaBalance": true,
      // NOTE: 下面如果給 false 就會出現 Loan View 了，後端不能給耶....
      // "noQuotaBalance": false,

      // NOTE: 下面參數沒有差
      // "refreshable": false,
      // "refreshable": true,

      "noQuotaByRetryFewTimes": true,
      // "refreshableUntil": "2023-03-28T08:10:24",
      "refreshableUntil": null,

      // NOTICE: 優先權最高
      "riskReject": false,
      "orderUnderReview": false,

      // NOTICE: 下面不管什麼時間都沒有問題
      // "offerExpireTime": moment().tz(INDIA_TIME_ZONE).add("-1", "days"),
      // NOTICE: 下面不管什麼時間都沒有問題
      // "offerExpireTime": moment().tz(INDIA_TIME_ZONE).add("1", "days"),
      // NOTICE: 下面不管什麼時間都沒有問題
      "offerExpireTime": null,


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

      "oldUserForceApply": false,
      "payableRecords": [
        {
          "productLogo": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
          "productName": "AA LOAN",
          "payableAmount": 1000,
          "dueDate": moment().tz(INDIA_TIME_ZONE).add(7, "days"),
          "overdue": false,
          "repayUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png"
        }
      ],
      "marquee": "我是跑馬燈...",
      "popupUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
      "customerServiceUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-7523112347980214.png",
      "bankBindH5url": "https://frontend.india-api-dev.com/bank-bind?token=d7f9d8262cb34bc3ac709c85582a7188&cardholderName=gp"
    }
    cy.intercept("get", "/api/v3/index", {
      statusCode: 200,
      body: indexServiceResponse,
    }).as("getIndex").then(() => {
      console.log("index");
    })

    visitIndexPage();

    // NOTICE: 模擬用戶點擊
    // cy.get("[data-testing-id='reacquireCredit']").click();

    // NOTE: then
    // 看到跑馬燈
    // 看到 welcome 包含姓名、客服 Button
    // NOTE: important 看到不反灰但無法使用的可借款額度拉霸、無法倒數計計時
    // NOTE: important 看到文字顯示最低與最高範圍為 ****、拉霸歸零到最右邊
    // 正常隨意顯示 Loan Over View
    // NOTE: important 看到下方 tips 額度相關訊息
    // NOTE: important 看到反灰無法點擊的 Apply Now Button

  })

  // NOTE: 這情況是怎麼了
  it("status: 用戶已認證、但風控額度直接不足。需要等待 2 天。", () => {
    // NOTE: Given
    const userServiceResponse: GetUserInfoServiceResponse = {
      "userName": "9013452123",
      "status": USER_AUTH_STATE.success,
      "demoAccount": false,
      "oldUser": false,
      "needUpdateKyc": false,
      "organic": false
    }
    cy.intercept("get", "/api/v2/login/info", {
      statusCode: 200,
      body: userServiceResponse,
    }).as("getInfo").then(() => {
      console.log("info");
    })

    // NOTE: Given
    const indexServiceResponse: IndexServiceResponse = {
      // NOTICE: 風控額度直接不足，無法執行重刷
      "noQuotaBalance": true,
      // NOTICE: 額度下次可刷新時間
      "refreshableUntil": moment().tz(INDIA_TIME_ZONE).add(2, "days"),

      // NOTICE: 風控有無過期
      "offerExpireTime": moment().tz(INDIA_TIME_ZONE).add(-1, "days"),

      // NOTICE: 風控是否可重整
      "refreshable": true,
      // NOTICE: 風控是否已無法重整
      "noQuotaByRetryFewTimes": false,



      // NOTICE: 實際可用金額
      "availableAmount": 0,
      "totalAmount": 15000,
      "usedAmount": 15000,
      "quotaBar": {
        "min": 0,
        "max": 0,
        "current": 0,
        "serial": 1000
      },
      // NOTICE: 其他重要屬性
      "needRiskKycUpdate": false,
      "riskReject": false,
      "orderUnderReview": false,
      "oldUserForceApply": false,


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
      "payableRecords": [
        {
          "productLogo": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
          "productName": "AA LOAN",
          "payableAmount": 1000,
          "dueDate": moment().tz(INDIA_TIME_ZONE).add(7, "days"),
          "overdue": false,
          "repayUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png"
        }
      ],
      "marquee": "我是跑馬燈...",
      "popupUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
      "customerServiceUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-7523112347980214.png",
      "bankBindH5url": "https://frontend.india-api-dev.com/bank-bind?token=d7f9d8262cb34bc3ac709c85582a7188&cardholderName=gp"
    }
    cy.intercept("get", "/api/v3/index", {
      statusCode: 200,
      body: indexServiceResponse,
    }).as("getIndex").then(() => {
      console.log("index");
    })


    visitIndexPage();

    // NOTE: then
    // 看到跑馬燈
    // 看到 welcome 包含姓名、客服 Button
    // NOTE: important 看到不反灰但可借款額度拉霸最低與最高都是0、繼續倒數計計時
    // 正常隨意顯示 Loan Over View
    // NOTE: important 看到下方 tips 額度不足相關訊息
    // NOTE: important 看到反灰無法點擊的 Apply Now Button

  })


  //FIGMA: 首頁-認證完成-沒被拒，額度0的用戶 (Android: Level 4)
  it("status: 用戶已認證、但風控額度直接不足。再等 10 秒就能刷新。", () => {
    // NOTE: Given
    const userServiceResponse: GetUserInfoServiceResponse = {
      "userName": "9013452123",
      "status": USER_AUTH_STATE.success,
      "demoAccount": false,
      "oldUser": false,
      "needUpdateKyc": false,
      "organic": false
    }
    cy.intercept("get", "/api/v2/login/info", {
      statusCode: 200,
      body: userServiceResponse,
    }).as("getInfo").then(() => {
      console.log("info");
    })

    // NOTE: Given
    const getFirstIndexServiceResponse: IndexServiceResponse = (seconds: number) => ({
      // NOTICE: 風控額度直接不足，無法執行重刷
      "noQuotaBalance": true,
      // NOTICE: 額度下次可刷新時間
      "refreshableUntil": moment().tz(INDIA_TIME_ZONE).add(seconds, "seconds").format(),

      // NOTICE: 風控有無過期
      // NOTE: 詢問後端，直接沒額度的風控有無過期??
    //   "offerExpireTime": moment().tz(INDIA_TIME_ZONE).add(-1, "days").format(),
      "offerExpireTime": null,

      // NOTICE: 風控是否可重整
      "refreshable": true,
      // NOTICE: 風控是否已無法重整
      "noQuotaByRetryFewTimes": false,

      // NOTICE: 實際可用金額
      "availableAmount": 0,
      "totalAmount": 0,
      "usedAmount": 0,
      "quotaBar": {
        "min": 0,
        "max": 0,
        "current": 0,
        "serial": 0
      },
      // NOTICE: 其他重要屬性
      "needRiskKycUpdate": false,
      "riskReject": false,
      "orderUnderReview": false,
      "oldUserForceApply": false,


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
      "payableRecords": [
        {
          "productLogo": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
          "productName": "AA LOAN",
          "payableAmount": 1000,
          "dueDate": moment().tz(INDIA_TIME_ZONE).add(7, "days"),
          "overdue": false,
          "repayUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png"
        }
      ],
      "marquee": "我是跑馬燈...",
      "popupUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
      "customerServiceUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-7523112347980214.png",
      "bankBindH5url": "https://frontend.india-api-dev.com/bank-bind?token=d7f9d8262cb34bc3ac709c85582a7188&cardholderName=gp"
    })
    // const getFirstRefreshableIndexServiceResponse: IndexServiceResponse = () => ({
    //   // NOTICE: 風控額度足
    //   "noQuotaBalance": false,
    //   // NOTICE: 額度下次可刷新時間
    //   "refreshableUntil": null,
    //
    //   // NOTICE: 風控有過期或是沒有??需與後端確認
    //   "offerExpireTime": moment().tz(INDIA_TIME_ZONE).add(-7, "days"),
    //
    //   // NOTICE: 風控是否可重整
    //   "refreshable": true,
    //   // NOTICE: 刷新超過N次都没有额度
    //   "noQuotaByRetryFewTimes": false,
    //   // NOTICE: 風控是否已無法重整
    //   "noQuotaByRetryFewTimes": false,
    //
    //
    //   // NOTICE: 實際可用金額
    //   "availableAmount": 0,
    //   "totalAmount": 0,
    //   "usedAmount": 0,
    //   "quotaBar": {
    //     "min": 0,
    //     "max": 0,
    //     "current": 0,
    //     "serial": 0
    //   },
    //   // NOTICE: 其他重要屬性
    //   "needRiskKycUpdate": false,
    //   "riskReject": false,
    //   "orderUnderReview": false,
    //   "oldUserForceApply": false,
    //
    //
    //   "chargeFeeDetails": [
    //     {
    //       "title": "Processing Fee",
    //       "counting": 0.4,
    //       "key": "PROCESSING_FEE"
    //     },
    //     {
    //       "title": "Service Fee",
    //       "counting": 0.5,
    //       "key": "SERVICE_FEE"
    //     },
    //     {
    //       "title": "Interest Fee",
    //       "counting": 0.1,
    //       "key": "LOAN_INTEREST"
    //     }
    //   ],
    //   "products": [
    //     {
    //       "productId": 1,
    //       "productName": "AA LOAN",
    //       "logoUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/icon_logo/8285099.png",
    //       "min": 2000,
    //       "max": 5000,
    //       "terms": 7,
    //       "platformChargeFeeRate": 0.4
    //     },
    //     {
    //       "productId": 2,
    //       "productName": "BB LOAN",
    //       "logoUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/icon_logo/8285141.png",
    //       "min": 3000,
    //       "max": 5000,
    //       "terms": 7,
    //       "platformChargeFeeRate": 0.4
    //     },
    //     {
    //       "productId": 3,
    //       "productName": "CC LOAN",
    //       "logoUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/icon_logo/8285186.png",
    //       "min": 4000,
    //       "max": 6000,
    //       "terms": 7,
    //       "platformChargeFeeRate": 0.4
    //     }
    //   ],
    //   "payableRecords": [
    //     {
    //       "productLogo": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
    //       "productName": "AA LOAN",
    //       "payableAmount": 1000,
    //       "dueDate": moment().tz(INDIA_TIME_ZONE).add(7, "days"),
    //       "overdue": false,
    //       "repayUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png"
    //     }
    //   ],
    //   "marquee": "我是跑馬燈...",
    //   "popupUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
    //   "customerServiceUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-7523112347980214.png",
    //   "bankBindH5url": "https://frontend.india-api-dev.com/bank-bind?token=d7f9d8262cb34bc3ac709c85582a7188&cardholderName=gp"
    // })

    // NOTE: 第 1 次看到需要重等刷新時間
    const firstIndexServiceResponse = () => getFirstIndexServiceResponse(10);
    // NOTE: 第 1 次看到重刷按鈕
    // const firstRefreshableIndexServiceResponse = () => getFirstRefreshableIndexServiceResponse();


    // NOTE: 第 2 次看到需要重等刷新時間
    const secondIndexServiceResponse: IndexServiceResponse = () => getFirstIndexServiceResponse(10);
    // NOTE: 第 2 次看到重刷按鈕
    // const secondRefreshableIndexServiceResponse: IndexServiceResponse = () => getFirstRefreshableIndexServiceResponse();

    // NOTE: 第 3 次看到需要重等刷新時間
    const thirdIndexServiceResponse: IndexServiceResponse = () => getFirstIndexServiceResponse(10);
    // NOTE: 第 3 次看到重刷按鈕
    // const thirdRefreshableIndexServiceResponse: IndexServiceResponse = () => getFirstRefreshableIndexServiceResponse();

    // NOTE: 看到無法再次重刷的畫面
    const getNotRefreshableIndexServiceResponse: IndexServiceResponse = () => ({
      // NOTICE: 風控額度直接不足，無法執行重刷
      "noQuotaBalance": true,

      // NOTICE: 風控是否可重整
      "refreshable": true,

      // NOTICE: 風控是否已無法重整 (refreshable 這時候 true | false 沒有意義)
      "noQuotaByRetryFewTimes": true,

      // NOTICE: 額度下次可刷新時間(noQuotaByRetryFewTimes 為 true，這時候就不會有時間)
      "refreshableUntil": null,

      // NOTICE: 風控有無過期
      // "offerExpireTime": moment().tz(INDIA_TIME_ZONE).add(-1, "days"),
      "offerExpireTime": null,


      // NOTICE: 是否需要風控更新
      "needRiskKycUpdate": false,

      // NOTICE: 其他重要屬性
      "riskReject": false,
      "orderUnderReview": false,
      "oldUserForceApply": false,

      // NOTICE: 實際可用金額
      "availableAmount": 0,
      "totalAmount": 15000,
      "usedAmount": 15000,
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
      "payableRecords": [
        {
          "productLogo": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
          "productName": "AA LOAN",
          "payableAmount": 1000,
          "dueDate": moment().tz(INDIA_TIME_ZONE).add(7, "days"),
          "overdue": false,
          "repayUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png"
        }
      ],
      "marquee": "我是跑馬燈...",
      "popupUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
      "customerServiceUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-7523112347980214.png",
      "bankBindH5url": "https://frontend.india-api-dev.com/bank-bind?token=d7f9d8262cb34bc3ac709c85582a7188&cardholderName=gp"
    })
    const notRefreshableIndexServiceResponse = () => getNotRefreshableIndexServiceResponse();

    let indexCount = 0
    // cy.intercept("get", "/api/v3/index", (req) => {
    //   indexCount = indexCount + 1;
    //   req.continue((res) => {
    //     if(indexCount === 1) {
    //       res.send({
    //         statusCode: 200,
    //         body: {
    //           ...firstIndexServiceResponse(),
    //           indexCount,
    //         },
    //       })
    //     } else if(indexCount === 2) {
    //       res.send({
    //         statusCode: 200,
    //         body: {
    //           ...firstRefreshableIndexServiceResponse(),
    //           indexCount,
    //         },
    //       })
    //     } else if(indexCount === 3) {
    //       res.send({
    //         statusCode: 200,
    //         body: {
    //           ...secondIndexServiceResponse(),
    //           indexCount,
    //         }
    //       })
    //     } else if(indexCount === 4) {
    //       res.send({
    //         statusCode: 200,
    //         body: {
    //           ...secondRefreshableIndexServiceResponse(),
    //           indexCount,
    //         }
    //       })
    //     } else if(indexCount === 5) {
    //       res.send({
    //         statusCode: 200,
    //         body: {
    //           ...thirdIndexServiceResponse(),
    //           indexCount,
    //         }
    //       })
    //     } else if(indexCount === 6) {
    //       res.send({
    //         statusCode: 200,
    //         body: {
    //           ...thirdRefreshableIndexServiceResponse(),
    //           indexCount,
    //         }
    //       })
    //     } else if(indexCount === 7) {
    //       res.send({
    //         statusCode: 200,
    //         body: {
    //           ...notRefreshableIndexServiceResponse(),
    //           indexCount,
    //         }
    //       })
    //     }
    //   })
    // })


    cy.intercept("get", "/api/v3/index", (req) => {
      indexCount = indexCount + 1;
      req.continue((res) => {
        if(indexCount === 1) {
          res.send({
            statusCode: 200,
            body: {
              ...firstIndexServiceResponse(),
              indexCount,
            },
          })
        } else if(indexCount === 2) {
            console.log('indexCount',indexCount)
          res.send({
            statusCode: 200,
            body: {
              ...secondIndexServiceResponse(),
              indexCount,
            }
          })
        } else if(indexCount === 3) {
          res.send({
            statusCode: 200,
            body: {
              ...thirdIndexServiceResponse(),
              indexCount,
            }
          })
        } else if(indexCount === 4) {
          res.send({
            statusCode: 200,
            body: {
              ...notRefreshableIndexServiceResponse(),
              indexCount,
            }
          })
        }
      })
    })


    // NOTE: 在沒有直接額度時候，按了會怎樣
    // const getPendingQuotaModelStatus: GetQuotaModelStatusResponse = {
    //   calculating: true,
    //   effective: false,
    //   offerExpireTime: ""
    // }
    const getSuccessQuotaModelStatus: GetQuotaModelStatusResponse = {
      calculating: false,
      effective: true,
      offerExpireTime: moment().tz(INDIA_TIME_ZONE).add("1", "days"),
    }
    let count = 1
    cy.intercept("get", "/api/v3/loan/quota-model-status", (req) => {
      req.continue(res => {
        if(count < 5) {
          res.send({
            statusCode: 200,
            body: getSuccessQuotaModelStatus,
          })
        } else {
          res.send({
            statusCode: 200,
            body: getSuccessQuotaModelStatus,
          })
        }
      })
      count++;
    })

    visitIndexPage();

    // NOTE: then
    // 看到跑馬燈
    // 看到 welcome 包含姓名、客服 Button
    // NOTE: important 看到不反灰但可借款額度拉霸最低與最高都是0、繼續倒數計計時
    // 正常隨意顯示 Loan Over View
    // NOTE: important 看到下方 tips 額度不足相關訊息
    // NOTE: important 看到反灰無法點擊的 Apply Now Button

  })


  //FIGMA: 首頁-認證完成-有效額度時間-額度不足 (Android: Level 7)
  it("status: 用戶已認證、風控額度時間有效，但能借額度不足", () => {
    // NOTE: Given
    const userServiceResponse: GetUserInfoServiceResponse = {
      "userName": "9013452123",
      "status": USER_AUTH_STATE.success,
      "demoAccount": false,
      "oldUser": false,
      "needUpdateKyc": false,
      "organic": false
    }
    cy.intercept("get", "/api/v2/login/info", {
      statusCode: 200,
      body: userServiceResponse,
    }).as("getInfo").then(() => {
      console.log("info");
    })

    // NOTE: Given
    const indexServiceResponse: IndexServiceResponse = {
      "noQuotaBalance": false,
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
      "noQuotaByRetryFewTimes": false,
      "orderUnderReview": false,
      "refreshableUntil": "2023-03-28T08:10:24",
      "offerExpireTime": moment().tz(INDIA_TIME_ZONE).add(10, "seconds"),
      "oldUserForceApply": false,
      "payableRecords": [
        {
          "productLogo": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
          "productName": "AA LOAN",
          "payableAmount": 1000,
          "dueDate": moment().tz(INDIA_TIME_ZONE).add(7, "days"),
          "overdue": false,
          "repayUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png"
        }
      ],
      "marquee": "我是跑馬燈...",
      "popupUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
      "customerServiceUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-7523112347980214.png",
      "bankBindH5url": "https://frontend.india-api-dev.com/bank-bind?token=d7f9d8262cb34bc3ac709c85582a7188&cardholderName=gp"
    }
    cy.intercept("get", "/api/v3/index", {
      statusCode: 200,
      body: indexServiceResponse,
    }).as("getIndex").then(() => {
      console.log("index");
    })


    visitIndexPage();

    // NOTE: then
    // 看到跑馬燈
    // 看到 welcome 包含姓名、客服 Button
    // NOTE: important 看到不反灰但可借款額度拉霸最低與最高都是0、繼續倒數計計時
    // 正常隨意顯示 Loan Over View
    // NOTE: important 看到下方 tips 額度不足相關訊息
    // NOTE: important 看到反灰無法點擊的 Apply Now Button

  })



  // FIGMA: 首頁-認證完成-有效額度時間-尚有額度 (Android: Level 9)
  it("status: 用戶已認證、風控額度時間有效，額度足夠。", () => {
    // NOTE: Given
    const userServiceResponse: GetUserInfoServiceResponse = {
      "userName": "9013452123",
      "status": USER_AUTH_STATE.success,
      "demoAccount": false,
      "oldUser": false,
      "needUpdateKyc": false,
      "organic": false
    }
    cy.intercept("get", "/api/v2/login/info", {
      statusCode: 200,
      body: userServiceResponse,
    }).as("getInfo").then(() => {
      console.log("info");
    })

    // // NOTE: Given
    const indexServiceResponse: IndexServiceResponse = {
      "totalAmount": 20000,
      "usedAmount": 1000,
      "availableAmount": 19000,
      "quotaBar": {
        "min": 1000,
        "max": 19000,
        "current": 15000,
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
      "refreshable": false,
      "noQuotaByRetryFewTimes": false,
      "orderUnderReview": false,
      "refreshableUntil": "2023-03-28T08:10:24",
      "offerExpireTime": moment().tz(INDIA_TIME_ZONE).add(1, "days"),
      "oldUserForceApply": false,
      "payableRecords": [
        {
          "productLogo": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
          "productName": "AA LOAN",
          "payableAmount": 1000,
          "dueDate": moment().tz(INDIA_TIME_ZONE).add(5, "days"),
          "overdue": false,
          "repayUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png"
        },
        {
          "productLogo": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
          "productName": "BB LOAN",
          "payableAmount": 2000,
          "dueDate": moment().tz(INDIA_TIME_ZONE).add(6, "days"),
          "overdue": false,
          "repayUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png"
        },
        {
          "productLogo": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
          "productName": "CC LOAN",
          "payableAmount": 3000,
          "dueDate": moment().tz(INDIA_TIME_ZONE).add(7, "days"),
          "overdue": false,
          "repayUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png"
        },
        {
          "productLogo": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
          "productName": "DD LOAN",
          "payableAmount": 4000,
          "dueDate": moment().tz(INDIA_TIME_ZONE).add(8, "days"),
          "overdue": false,
          "repayUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png"
        },
      ],
      "marquee": "我是跑馬燈...",
      "popupUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
      "customerServiceUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-7523112347980214.png",
      "bankBindH5url": "https://frontend.india-api-dev.com/bank-bind?token=d7f9d8262cb34bc3ac709c85582a7188&cardholderName=gp"
    }
    // cy.intercept("get", "/api/v3/index", {
    //   statusCode: 200,
    //   body: indexServiceResponse,
    // }).as("getIndex").then(() => {
    //   console.log("index");
    // })

    // NOTE: 模擬 Apply 重新獲取額度
    const appliedIndexServiceResponse: IndexServiceResponse = {
      "totalAmount": 20000,
      "usedAmount": 16000,
      "availableAmount": 4000,
      "quotaBar": {
        "min": 1000,
        "max": 4000,
        "current": 2000,
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
      "refreshable": false,
      "noQuotaByRetryFewTimes": false,
      "orderUnderReview": false,
      "refreshableUntil": "2023-03-28T08:10:24",
      "offerExpireTime": moment().tz(INDIA_TIME_ZONE).add(1, "days"),
      "oldUserForceApply": false,
      "payableRecords": [
        {
          "productLogo": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
          "productName": "AA LOAN",
          "payableAmount": 1000,
          "dueDate": moment().tz(INDIA_TIME_ZONE).add(5, "days"),
          "overdue": false,
          "repayUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png"
        },
        {
          "productLogo": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
          "productName": "BB LOAN",
          "payableAmount": 2000,
          "dueDate": moment().tz(INDIA_TIME_ZONE).add(6, "days"),
          "overdue": false,
          "repayUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png"
        },
        {
          "productLogo": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
          "productName": "CC LOAN",
          "payableAmount": 3000,
          "dueDate": moment().tz(INDIA_TIME_ZONE).add(7, "days"),
          "overdue": false,
          "repayUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png"
        },
        {
          "productLogo": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
          "productName": "DD LOAN",
          "payableAmount": 4000,
          "dueDate": moment().tz(INDIA_TIME_ZONE).add(8, "days"),
          "overdue": false,
          "repayUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png"
        },
      ],
      "marquee": "我是跑馬燈...",
      "popupUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
      "customerServiceUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-7523112347980214.png",
      "bankBindH5url": "https://frontend.india-api-dev.com/bank-bind?token=d7f9d8262cb34bc3ac709c85582a7188&cardholderName=gp"
    }

    let indexCount = 0
    cy.intercept("get", "/api/v3/index", (req) => {
      indexCount++;
      req.continue((res) => {
        if(indexCount === 1) {
          res.send({
            statusCode: 200,
            body: indexServiceResponse,
          });
        } else {
          res.send({
            statusCode: 200,
            body: appliedIndexServiceResponse
          });
        }
      })
    })



    // NOTE: 模擬延遲取得銀行卡
    const getBankCardListResponse:GetBankCardListResponse = {
      bankAccounts: [
        {
          bankAccount: "帳戶 1",
          bankId: 1000000001,
          bankName: "AA Bank",
          holderName: userServiceResponse.userName,
          main: true,
        },
        {
          bankAccount: "帳戶 2",
          bankId: 1000000002,
          bankName: "AA Bank",
          holderName: userServiceResponse.userName,
          main: false,
        },
        {
          bankAccount: "帳戶 3",
          bankId: 1000000003,
          bankName: "AA Bank",
          holderName: userServiceResponse.userName,
          main: false,
        },
      ],
      tip: "tips....",
    }
    cy.intercept("get", "/api/v2/user/bank-card", (req) => {
      req.continue((res) => {
        res.setDelay(1000).send({
          statusCode: 200,
          body: getBankCardListResponse,
        })
      })
    })

    // NOTE: 模擬延遲 Apply
    const loanServiceResponse:LoanServiceResponse = {

    }
    cy.intercept("post", "/api/v3/loan/apply", (req) => {
      req.continue((res) => {
        res.setDelay(4000).send({
          statusCode: 200,
          body: loanServiceResponse,
        })
      })
    })

    visitIndexPage();


    // NOTE: then
    // 看到跑馬燈
    // 看到 welcome 包含姓名、客服 Button
    // NOTE: important 看到不反灰，可借款額度拉霸最低與最高都是正常值、繼續倒數計計時
    // NOTE: important 看到推薦的產品列表
    // 正常隨意顯示 Loan Over View
    // NOTE: important 可以點擊 Apply Now Button
  })


  it("status: 用戶已認證、風控額度時間有效，但10秒到期，額度足夠。額度太小，沒有商品可以滿足。無法點擊 Apply Now", () => {
    // NOTE: Given
    const userServiceResponse: GetUserInfoServiceResponse = {
      "userName": "9013452123",
      "status": USER_AUTH_STATE.success,
      "demoAccount": false,
      "oldUser": false,
      "needUpdateKyc": false,
      "organic": false
    }
    cy.intercept("get", "/api/v2/login/info", {
      statusCode: 200,
      body: userServiceResponse,
    }).as("getInfo").then(() => {
      console.log("info");
    })


    // NOTE: Given
    const indexServiceResponse: IndexServiceResponse = {
      "totalAmount": 15000,
      "usedAmount": 13000,
      "availableAmount": 2000,
      "quotaBar": {
        "min": 1000,
        "max": 2000,
        "current": 1000,
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
      // NOTICE: 優先權最高
      "riskReject": false,
      "refreshable": true,
      "noQuotaByRetryFewTimes": false,
      "orderUnderReview": false,
      "refreshableUntil": "2023-03-28T08:10:24",
      "offerExpireTime": moment().tz(INDIA_TIME_ZONE).add(10, "seconds"),
      "oldUserForceApply": false,
      "payableRecords": [],
      "marquee": "我是跑馬燈...",
      "popupUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
      "customerServiceUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-7523112347980214.png",
      "bankBindH5url": "https://frontend.india-api-dev.com/bank-bind?token=d7f9d8262cb34bc3ac709c85582a7188&cardholderName=gp"
    }

    // NOTICE: function 讓時間動態產生
    const getValidIndexServiceResponse = () => {
      return {
        "totalAmount": 15000,
        "usedAmount": 13000,
        "availableAmount": 2000,
        "quotaBar": {
          "min": 1000,
          "max": 2000,
          "current": 1000,
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
        // NOTICE: 優先權最高
        "riskReject": false,
        "refreshable": true,
        "noQuotaByRetryFewTimes": false,
        "orderUnderReview": false,
        "refreshableUntil": "2023-03-28T08:10:24",
        // "offerExpireTime": moment().tz(INDIA_TIME_ZONE).add("1", "days"),
        "offerExpireTime": moment().tz(INDIA_TIME_ZONE).add(30, "seconds"),
        "oldUserForceApply": false,
        "payableRecords": [],
        "marquee": "我是跑馬燈...",
        "popupUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
        "customerServiceUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-7523112347980214.png",
        "bankBindH5url": "https://frontend.india-api-dev.com/bank-bind?token=d7f9d8262cb34bc3ac709c85582a7188&cardholderName=gp"
      }
    }


    let indexCount = 0;
    cy.intercept("get", "/api/v3/index", (res) => {
      res.continue((req) => {
        if(indexCount === 0) {
          console.log("[首頁]1")
          req.send({
            statusCode: 200,
            body: indexServiceResponse,
          })
        } else {
          console.log("[首頁]2")
          req.send({
            statusCode: 200,
            body: getValidIndexServiceResponse(),
          })
        }
        indexCount++;
      })
    }).as("getIndex").then(() => {
      console.log("index");
    })


    const getPendingQuotaModelStatus: GetQuotaModelStatusResponse = {
      calculating: true,
      effective: false,
      offerExpireTime: ""
    }
    const getSuccessQuotaModelStatus: GetQuotaModelStatusResponse = {
      calculating: false,
      effective: true,
      offerExpireTime: moment().tz(INDIA_TIME_ZONE).add("1", "days"),
    }
    let count = 1
    cy.intercept("get", "/api/v3/loan/quota-model-status", (req) => {
      req.continue(res => {
        if(count < 5) {
          res.send({
            statusCode: 200,
            body: getPendingQuotaModelStatus,
          })
        } else {
          res.send({
            statusCode: 200,
            body: getSuccessQuotaModelStatus,
          })
        }
      })
      count++;
    })


    visitIndexPage();

    // NOTE: then
    // 看到跑馬燈
    // 看到 welcome 包含姓名、客服 Button
    // NOTE: important 看到不反灰，可借款額度拉霸最低與最高都是正常值、繼續倒數計計時
    // NOTE: important 看到推薦的產品列表
    // 正常隨意顯示 Loan Over View
    // NOTE: important 可以點擊 Apply Now Button
  })

  it("status: 用戶已認證、風控額度時間有效，但10秒到期，額度足夠。重新刷新額度給十秒逾期。使用者第一次刷新有額度沒借款。第二與第三次都有額度沒借款，不給他刷新額度。", () => {
    // NOTE: Given
    const userServiceResponse: GetUserInfoServiceResponse = {
      "userName": "9013452123",
      "status": USER_AUTH_STATE.success,
      "demoAccount": false,
      "oldUser": false,
      "needUpdateKyc": false,
      "organic": false
    }
    cy.intercept("get", "/api/v2/login/info", {
      statusCode: 200,
      body: userServiceResponse,
    }).as("getInfo").then(() => {
      console.log("info");
    })


    // NOTE: Given
    const indexServiceResponse: IndexServiceResponse = {
      "totalAmount": 50000,
      "usedAmount": 0,
      "availableAmount": 50000,
      "quotaBar": {
        "min": 1000,
        "max": 50000,
        "current": 20000,
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
      // NOTICE: 優先權最高
      "riskReject": false,
      "refreshable": true,
      "noQuotaByRetryFewTimes": false,
      "orderUnderReview": false,
      "refreshableUntil": "2023-03-28T08:10:24",
      "offerExpireTime": moment().tz(INDIA_TIME_ZONE).add(10, "seconds"),
      "oldUserForceApply": false,
      "payableRecords": [],
      "marquee": "我是跑馬燈...",
      "popupUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
      "customerServiceUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-7523112347980214.png",
      "bankBindH5url": "https://frontend.india-api-dev.com/bank-bind?token=d7f9d8262cb34bc3ac709c85582a7188&cardholderName=gp"
    }

    // NOTICE: function 讓時間動態產生
    const getValidIndexServiceResponse = () => {
      return {
        "totalAmount": 50000,
        "usedAmount": 0,
        "availableAmount": 50000,
        "quotaBar": {
          "min": 1000,
          "max": 50000,
          "current": 20000,
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
        // NOTICE: 優先權最高
        "riskReject": false,
        "refreshable": true,
        "noQuotaByRetryFewTimes": false,
        "orderUnderReview": false,
        "refreshableUntil": "2023-03-28T08:10:24",
        // "offerExpireTime": moment().tz(INDIA_TIME_ZONE).add("1", "days"),
        "offerExpireTime": moment().tz(INDIA_TIME_ZONE).add(30, "seconds"),
        "oldUserForceApply": false,
        "payableRecords": [],
        "marquee": "我是跑馬燈...",
        "popupUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
        "customerServiceUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-7523112347980214.png",
        "bankBindH5url": "https://frontend.india-api-dev.com/bank-bind?token=d7f9d8262cb34bc3ac709c85582a7188&cardholderName=gp"
      }
    }


    let indexCount = 0;
    cy.intercept("get", "/api/v3/index", (res) => {
      res.continue((req) => {
        if(indexCount === 0) {
          console.log("[首頁]1")
          req.send({
            statusCode: 200,
            body: indexServiceResponse,
          })
        } else {
          console.log("[首頁]2")
          req.send({
            statusCode: 200,
            body: getValidIndexServiceResponse(),
          })
        }
        indexCount++;
      })
    }).as("getIndex").then(() => {
      console.log("index");
    })


    const getPendingQuotaModelStatus: GetQuotaModelStatusResponse = {
      calculating: true,
      effective: false,
      offerExpireTime: ""
    }
    const getSuccessQuotaModelStatus: GetQuotaModelStatusResponse = {
      calculating: false,
      effective: true,
      offerExpireTime: moment().tz(INDIA_TIME_ZONE).add("1", "days"),
    }
    let count = 1
    cy.intercept("get", "/api/v3/loan/quota-model-status", (req) => {
      req.continue(res => {
        if(count < 5) {
          res.send({
            statusCode: 200,
            body: getPendingQuotaModelStatus,
          })
        } else {
          res.send({
            statusCode: 200,
            body: getSuccessQuotaModelStatus,
          })
        }
      })
      count++;
    })


    visitIndexPage();

    // NOTE: then
    // 看到跑馬燈
    // 看到 welcome 包含姓名、客服 Button
    // NOTE: important 看到不反灰，可借款額度拉霸最低與最高都是正常值、繼續倒數計計時
    // NOTE: important 看到推薦的產品列表
    // 正常隨意顯示 Loan Over View
    // NOTE: important 可以點擊 Apply Now Button
  })


  // NOTE: 尚未實作測試
  it("status: 用戶已認證、風控額度時間有效，額度足夠。點擊 Apply 後，再次確認後，完成 Apply", () => {
    // NOTE: important 看到已選擇的推薦商品項目、可點選展開單一商品了解更詳細的資訊
    // NOTE: important 顯示全部商品計算後的總結
    // NOTE: important 顯示銀行卡
    // NOTE: important 可切換銀行卡
    // NOTE: important 可點選按鈕觀看 Loan Agreement
    // NOTE: important 點絢 confirm 可看到可關閉 Popup 顯示借貸已申請畫面
  })

});
