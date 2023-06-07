// NOTICE: refactor me
// import {IndexServiceResponse} from "../../../app/src/app/api/service";
import {GetIndexResponse as IndexServiceResponse} from "../../../app/src/app/api/indexService/GetIndexResponse";

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
import {getTimePartInfoBetweenCurrentAndCountDown} from "@frontend/shared/date";
import { FeeRateKeyEnum } from "apps/app/src/app/api/indexService/FeeRateKeyEnum";
import { getTimeInfoBetweenCurrentAndCountDown } from "@frontend/shared/date";
import { NativeAppInfo } from "apps/app/src/app/persistant/nativeAppInfo";
import { ORDER_STATE } from "apps/app/src/app/domain/order/ORDER_STATE";
import {formatPrice} from "../../../../apps/app/src/app/modules/format/formatPrice"

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
      "couponH5Url":null,
      "csServiceTime":"MON - FRI, 9:00 AM - 6:00 PM",
      "csWhatsApp":null,
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
    //   "userName": "9013452123",
      "userName":"後端API沒給三二一",
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
      "hiddenLoanDetail": false,
      "loanAgreementUrl": "",
      "noQuotaBalance":false,
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
          "key": FeeRateKeyEnum.PROCESSING_FEE
        },
        {
          "title": "Service Fee",
          "counting": 0.5,
          "key": FeeRateKeyEnum.SERVICE_FEE
        },
        {
          "title": "Interest Fee",
          "counting": 0.1,
          "key": FeeRateKeyEnum.LOAN_INTEREST
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
          "orderNo":"",
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
      // NOTE: important 看到跑馬燈
      indexPagePo.marquee().should("be.visible").contains(indexServiceResponse.marquee);
      // NOTE: important 看到 welcome 包含姓名、客服 Button
      indexPagePo.welcome().should("be.visible");
      indexPagePo.welcome().find("[data-testing-id='hide-icon']").should("be.visible");
      indexPagePo.welcome().find("[data-testing-id='contact-icon']").should("be.visible");
      // action: 點擊 hide-icon ( 眼睛 )
      indexPagePo.welcome().find("[data-testing-id='hide-icon']").click().then(() => {
          indexPagePo.welcome().contains(NativeAppInfo.phoneNo);
      });
      indexPagePo.welcome().find("[data-testing-id='hide-icon']").click().then(() => {
          indexPagePo.welcome().contains(NativeAppInfo.phoneNo.slice(0, 3) + '****' + NativeAppInfo.phoneNo.slice(7, 10))
      });

      // NOTE: important 看到反灰無法拖拉使用的可借款額霸、看到文字顯示最低與最高範圍為 ****
      indexPagePo.quotaSlider().should("be.visible");
      indexPagePo.quotaSlider().invoke('attr', 'data-testing-disable').should('eq', 'true');
      indexPagePo.quotaSlider().find(".quota-slider").should("be.visible").should("have.class", 'disabled');
      indexPagePo.quotaSlider().find("[data-testing-id='current-quota-value']").should("be.visible").contains('****');
      indexPagePo.quotaSlider().find("[data-testing-id='max-quota-value']").should("be.visible").contains('****');
      // NOTE: important 歸零的倒數計計時
      indexPagePo.quotaSlider().find("[data-testing-id='quota-countdown']").should("be.visible").contains('00:00:00');

      // NOTE: important 看到用戶認證中訊息
      indexPagePo.noticeUserInProgress().should("be.visible");
      indexPagePo.noticeUserInProgress().contains("Under review");
      indexPagePo.noticeUserInProgress().contains("Your submitted order has been successfully received.");
      indexPagePo.noticeUserInProgress().contains("Please wait patiently for review.");

      // NOTE: important 看不到 Apply Button 、可點選 View Application Progress
      indexPagePo.applyButton().should('not.exist');
      indexPagePo.reacquireCreditButton().should('not.exist');
      indexPagePo.viewAppProgressButton().should("be.visible").contains('View Application Progress');

      // NOTE: important tips 訊息不會出現
      indexPagePo.tips().should("not.be.visible")
  })

  // User reject (Android: Level 1)
  // 新客/老客用戶被拒
  it("status: 用戶認證被拒絕", () => {
    // NOTE: Given
    const userServiceResponse: GetUserInfoServiceResponse = {
    //   "userName": "9013452123",
      "userName":"後端API沒給三二一",
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

    // NOTE: Given
    const indexServiceResponse: IndexServiceResponse = {
        "hiddenLoanDetail": false,
        "loanAgreementUrl": "",
        "noQuotaBalance":false,
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
            "key": FeeRateKeyEnum.PROCESSING_FEE
          },
          {
            "title": "Service Fee",
            "counting": 0.5,
            "key": FeeRateKeyEnum.SERVICE_FEE
          },
          {
            "title": "Interest Fee",
            "counting": 0.1,
            "key": FeeRateKeyEnum.LOAN_INTEREST
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
            "orderNo":"",
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
      // NOTE: important 看到跑馬燈
      indexPagePo.marquee().should("be.visible").contains(indexServiceResponse.marquee);

      // NOTE: important 看到 welcome 包含姓名、客服 Button
      indexPagePo.welcome().should("be.visible");
      indexPagePo.welcome().find("[data-testing-id='hide-icon']").should("be.visible");
      indexPagePo.welcome().find("[data-testing-id='contact-icon']").should("be.visible");
      // action: 點擊 hide-icon ( 眼睛 )
      indexPagePo.welcome().find("[data-testing-id='hide-icon']").click().then(() => {
          indexPagePo.welcome().contains(NativeAppInfo.phoneNo);
      });
      indexPagePo.welcome().find("[data-testing-id='hide-icon']").click().then(() => {
          indexPagePo.welcome().contains(NativeAppInfo.phoneNo.slice(0, 3) + '****' + NativeAppInfo.phoneNo.slice(7, 10))
      });

      // NOTE: important 看到反灰無法拖拉使用的可借款額霸、看到文字顯示最低與最高範圍為 ****
      indexPagePo.quotaSlider().should("be.visible");
      indexPagePo.quotaSlider().invoke('attr','data-testing-disable').should('eq','true');
      indexPagePo.quotaSlider().find(".quota-slider").should("be.visible").should("have.class",'disabled');
      indexPagePo.quotaSlider().find("[data-testing-id='current-quota-value']").should("be.visible").contains('****');
      indexPagePo.quotaSlider().find("[data-testing-id='max-quota-value']").should("be.visible").contains('****');

      // NOTE: important 歸零的倒數計計時
      indexPagePo.quotaSlider().find("[data-testing-id='quota-countdown']").should("be.visible").contains('00:00:00');

      // NOTE: important 看到用戶認證被拒絕訊息
      indexPagePo.noticeUserRejected().should("be.visible");
      indexPagePo.noticeUserRejected().contains(`Your application was not approved`);
      indexPagePo.noticeUserRejected().contains(`We regret to inform you that we cannot offer you any loans due to your credit score being below our standards.`);
      indexPagePo.noticeUserRejected().contains(`If you have any questions, please contact our customer service center.`);

      // NOTE: important tips 訊息不會出現
      indexPagePo.tips().should("not.be.visible");

      // NOTE: important 看不到 Apply Button 、可點選 View Application Progress
      indexPagePo.applyButton().should('not.exist');
      indexPagePo.reacquireCreditButton().should('not.exist');
      indexPagePo.viewAppProgressButton().should("be.visible").contains('View Application Progress');

      
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
  it("status: 用戶已認證、有3天即將到期的訂單，仍有額度可再借產品", () => {
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
      "hiddenLoanDetail": false,
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
          "key": FeeRateKeyEnum.PROCESSING_FEE
        },
        {
          "title": "Service Fee",
          "counting": 0.5,
          "key": FeeRateKeyEnum.SERVICE_FEE
        },
        {
          "title": "Interest Fee",
          "counting": 0.1,
          "key": FeeRateKeyEnum.LOAN_INTEREST
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
      "offerExpireTime": moment().tz(INDIA_TIME_ZONE).add(1, "days"),
      "oldUserForceApply": false,
      "payableRecords": [
        {
          "orderNo":"",
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
      // NOTE: important 看到跑馬燈
      indexPagePo.marquee().should("be.visible").contains(indexServiceResponse.marquee);
      // NOTE: important 看到 welcome 包含姓名、客服 Button
      indexPagePo.welcome().should("be.visible");
      indexPagePo.welcome().find("[data-testing-id='hide-icon']").should("be.visible");
      indexPagePo.welcome().find("[data-testing-id='contact-icon']").should("be.visible");
      // action: 點擊 hide-icon ( 眼睛 )
      indexPagePo.welcome().find("[data-testing-id='hide-icon']").click().then(() => {
          indexPagePo.welcome().contains(NativeAppInfo.phoneNo);
      });
      indexPagePo.welcome().find("[data-testing-id='hide-icon']").click().then(() => {
          indexPagePo.welcome().contains(NativeAppInfo.phoneNo.slice(0, 3) + '****' + NativeAppInfo.phoneNo.slice(7, 10))
      });
      // NOTE: important 看到即期的訊息資訊
      indexPagePo.orderNotice().should("be.visible");
      indexPagePo.orderNotice().invoke("attr", "data-order-status").should('eq', ORDER_STATE.hasInComingOverdueOrder.toString());
      indexPagePo.orderNotice()
          .should("be.visible")
          .and('contain', 'Loan Order')
          .and('contain', formatPrice(indexServiceResponse.payableRecords[0].payableAmount))
          .and('contain', 'Due Date')
          .and('contain', moment(indexServiceResponse.payableRecords[0].dueDate).format('DD-MM-YYYY'))

      // NOTE: important 能點擊 repay button 跳轉到借款記錄頁面
      indexPagePo.orderNotice().find("[data-testing-id='repay']").click().then(() => {
          cy.url().should('include', '/repayment-detail');
      }).then(() => {
          cy.go(-1)
      })

      // NOTE: important 看到不反灰、可使用的借款額度拉霸、看到文字顯示最低與最高金額
      indexPagePo.quotaSlider().should("be.visible");
      indexPagePo.quotaSlider().invoke('attr', 'data-testing-disable').should('eq', 'false');
      indexPagePo.quotaSlider().find(".quota-slider").should("be.visible").should("not.have.class", 'disabled');
      indexPagePo.quotaSlider().find("[data-testing-id='current-quota-value']").should("be.visible").contains(formatPrice(indexServiceResponse.quotaBar.current));
      indexPagePo.quotaSlider().find("[data-testing-id='max-quota-value']").should("be.visible").contains(formatPrice(indexServiceResponse.quotaBar.max));
      // NOTE: important 倒數計時正在計時
      indexPagePo.quotaSlider().find("[data-testing-id='quota-countdown']").should("be.visible");
      
      // 正常隨意顯示 Loan Over View
      indexPagePo.loanOverView().should("be.visible");

      // NOTE: important tips 訊息不會出現
      indexPagePo.tips().should("not.be.visible")

      // NOTE: important 看到可點擊的 Apply Now Button
      indexPagePo.applyButton().should('be.visible').contains('Apply Now');
      indexPagePo.applyButton().invoke('attr', 'data-testing-disable').should('eq', 'false');
      indexPagePo.reacquireCreditButton().should('not.exist');
      indexPagePo.viewAppProgressButton().should("not.exist");
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
      "hiddenLoanDetail":false,
      "loanAgreementUrl":"",
      "noQuotaBalance":false,
      "noQuotaByRetryFewTimes": false,
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
          "key": FeeRateKeyEnum.PROCESSING_FEE
        },
        {
          "title": "Service Fee",
          "counting": 0.5,
          "key": FeeRateKeyEnum.SERVICE_FEE
        },
        {
          "title": "Interest Fee",
          "counting": 0.1,
          "key": FeeRateKeyEnum.LOAN_INTEREST
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
      "orderUnderReview": false,
      "refreshableUntil": "2023-03-28T08:10:24",
      "offerExpireTime": moment().tz(INDIA_TIME_ZONE).add(2, "days"),
      "oldUserForceApply": false,
      "payableRecords": [
        {
          "orderNo":"",
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
    // NOTE: important 看到跑馬燈
    indexPagePo.marquee().should("be.visible").contains(indexServiceResponse.marquee);
    
    // NOTE: important 看到 welcome 包含姓名、客服 Button
    indexPagePo.welcome().should("be.visible");
    indexPagePo.welcome().find("[data-testing-id='hide-icon']").should("be.visible");
    indexPagePo.welcome().find("[data-testing-id='contact-icon']").should("be.visible");

    // NOTE: important 看到逾期的訊息資訊、提醒您需要優先還清逾期款項才能再借款
    indexPagePo.orderNotice().should("be.visible");
    indexPagePo.orderNotice().invoke("attr", "data-order-status").should('eq', ORDER_STATE.hasOverdueOrder.toString());
    indexPagePo.orderNotice()
        .should("be.visible")
        .and('contain', 'Loan Order')
        .and('contain', formatPrice(indexServiceResponse.payableRecords[0].payableAmount))
        .and('contain', 'Overdue')
        .and('contain', 'Due Date')
        .and('contain', moment(indexServiceResponse.payableRecords[0].dueDate).format('DD-MM-YYYY'))
        .and('contain', 'Remind you to prioritize paying off overdue payments before you can borrow again.');
  
    // NOTE: important 能點擊 repay button 跳轉到借款記錄頁面
    indexPagePo.orderNotice().find("[data-testing-id='repay']").click().then(() => {
        cy.url().should('include', '/repayment-detail');
    }).then(() => {
        cy.go(-1)
    })

    // NOTE: important 看到反灰但無法使用的可借款額度拉霸、無法倒數計計時、看到文字顯示最低與最高範圍為 ****
    indexPagePo.quotaSlider().should("be.visible");
    indexPagePo.quotaSlider().invoke('attr','data-testing-disable').should('eq','true');
    indexPagePo.quotaSlider().find(".quota-slider").should("be.visible").should("have.class",'disabled');
    indexPagePo.quotaSlider().find("[data-testing-id='current-quota-value']").should("be.visible").contains('****');
    indexPagePo.quotaSlider().find("[data-testing-id='max-quota-value']").should("be.visible").contains('****');

    // NOTE: important 歸零的倒數計計時
    indexPagePo.quotaSlider().find("[data-testing-id='quota-countdown']").should("be.visible").contains('00:00:00');
    
    // 正常隨意顯示 Loan Over View
    indexPagePo.loanOverView().should("be.visible");

    // NOTE: important 看到下方 tips 優先還款訊息 (圖沒有)

    // NOTE: important 看到反灰無法點擊的 Apply Now Button
    indexPagePo.applyButton().should('be.visible').contains('Apply Now');
    indexPagePo.applyButton().invoke('attr', 'data-testing-disable').should('eq', 'true');
    indexPagePo.reacquireCreditButton().should('not.exist');
    indexPagePo.viewAppProgressButton().should('not.exist');

    // NOTE: important 看到下方 Tab 的 Payment 有紅點提示
    indexPagePo.tabPayment().should("be.visible");
    indexPagePo.tabPayment().find("[data-testing-id='tab-payment-notice']").should("be.visible");

  })


  
  // NOTICE: 情境：之前有訂單，最近一次訂單被拒 ???
  // FIGMA: 首頁-認證完成-新客訂單被拒/老客獲取額度被拒 (Android: Level 3)
  it.only("status: 用戶已認證、新訂單被拒絕。老客情境：之前有訂單，最近一次訂單被拒。", () => {

    // NOTE: Given
    const userServiceResponse: GetUserInfoServiceResponse = {
    //   "userName": "9013452123",
      "userName":"後端API沒給三二一",
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
    const indexServiceResponse = (): IndexServiceResponse => ({
      "hiddenLoanDetail": false,
      // NOTICE: 是否直接表明要不顯示按鈕? 但還有商品沒有選擇的條件
      "refreshable": false,
      // NOTICE: 當 refreshable true, 但是 noQuotaByRetryFewTimes true 一樣不能重刷?
      "noQuotaByRetryFewTimes": false,
      "noQuotaBalance":false,
      // NOTICE: 情境1: 當 refreshable true, noQuotaByRetryFewTimes false 顯示能夠重刷的倒數計時。
      // NOTICE: 情境2:  riskReject 為 true, 也是看下面的參數
      "riskReject": true,
      "refreshableUntil": moment().tz(INDIA_TIME_ZONE).add(5, "days"),

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
          "key": FeeRateKeyEnum.PROCESSING_FEE
        },
        {
          "title": "Service Fee",
          "counting": 0.5,
          "key": FeeRateKeyEnum.SERVICE_FEE
        },
        {
          "title": "Interest Fee",
          "counting": 0.1,
          "key": FeeRateKeyEnum.LOAN_INTEREST
        }
      ],
      "loanAgreementUrl":"",
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
          "orderNo": "",
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
      // NOTE: important 看到跑馬燈
      indexPagePo.marquee().should("be.visible").contains(indexServiceResponse().marquee);

      // NOTE: important 看到 welcome 包含姓名、客服 Button
      indexPagePo.welcome().should("be.visible");
      indexPagePo.welcome().find("[data-testing-id='hide-icon']").should("be.visible");
      indexPagePo.welcome().find("[data-testing-id='contact-icon']").should("be.visible");
      // action: 點擊 hide-icon ( 眼睛 )
      indexPagePo.welcome().find("[data-testing-id='hide-icon']").click().then(() => {
          indexPagePo.welcome().contains(NativeAppInfo.phoneNo);
      });
      indexPagePo.welcome().find("[data-testing-id='hide-icon']").click().then(() => {
          indexPagePo.welcome().contains(NativeAppInfo.phoneNo.slice(0, 3) + '****' + NativeAppInfo.phoneNo.slice(7, 10))
      });

      // NOTE: important 看到反灰無法拖拉使用的可借款額霸、看到文字顯示最低與最高範圍為 ****
      indexPagePo.quotaSlider().should("be.visible");
      indexPagePo.quotaSlider().invoke('attr', 'data-testing-disable').should('eq', 'true');
      indexPagePo.quotaSlider().find(".quota-slider").should("be.visible").should("have.class", 'disabled');
      indexPagePo.quotaSlider().find("[data-testing-id='current-quota-value']").should("be.visible").contains('****');
      indexPagePo.quotaSlider().find("[data-testing-id='max-quota-value']").should("be.visible").contains('****');

      // NOTE: important 歸零的倒數計計時
      indexPagePo.quotaSlider().find("[data-testing-id='quota-countdown']").should("be.visible").contains('00:00:00');

      // NOTE: important 看到訂單被拒絕訊息，可返回借款天數，新客為 90 天、老客為 7 天。
      indexPagePo.noticeOrderOrQuotaRejected().should("be.visible");
      indexPagePo.noticeOrderOrQuotaRejected().contains('We apologize for the inconvenience');
      indexPagePo.noticeOrderOrQuotaRejected().contains("We are currently unable to process your loan application. This does not mean that your credit is bad; it is simply due to a high number of current applicants, making it difficult for us to meet everyone's needs immediately.");
      indexPagePo.noticeOrderOrQuotaRejected().contains('Tip: Repaying loans on time can help prioritize your loan application.');
      indexPagePo.noticeOrderOrQuotaRejected().contains('You are welcome to try applying again after the countdown is complete.');

      // NOTE: important 根據可返回借款天數顯示倒數計時器
      indexPagePo.welcomBackTimer().should("be.visible").contains('Welcome back and reapply in');

      cy.clock().then((clock) => {
          const refreshableUntil = moment(indexServiceResponse().refreshableUntil).add(-1, "seconds");
          const conutDown1s = getTimePartInfoBetweenCurrentAndCountDown(refreshableUntil);
          indexPagePo.welcomBackTimer().find("[data-testing-id='welcomBackTimer-days']").should("be.visible").contains(conutDown1s.time.days)
          indexPagePo.welcomBackTimer().find("[data-testing-id='welcomBackTimer-hours']").should("be.visible").contains(conutDown1s.time.hours)
          indexPagePo.welcomBackTimer().find("[data-testing-id='welcomBackTimer-minutes']").should("be.visible").contains(conutDown1s.time.minutes)
          //  indexPagePo.welcomBackTimer().find("[data-testing-id='welcomBackTimer-seconds']").contains(conutDown1s.time.seconds);
          clock.restore()
      })

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
      "hiddenLoanDetail": false,
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
          "key": FeeRateKeyEnum.PROCESSING_FEE
        },
        {
          "title": "Service Fee",
          "counting": 0.5,
          "key": FeeRateKeyEnum.SERVICE_FEE
        },
        {
          "title": "Interest Fee",
          "counting": 0.1,
          "key": FeeRateKeyEnum.LOAN_INTEREST
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
      "loanAgreementUrl": "",
      "needRiskKycUpdate": false,
      // NOTE: 優先權最高
      "riskReject": false,
      "refreshable": true,
      "noQuotaByRetryFewTimes": false,
      "noQuotaBalance": false,
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
      "hiddenLoanDetail": false,
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
          "key": FeeRateKeyEnum.PROCESSING_FEE
        },
        {
          "title": "Service Fee",
          "counting": 0.5,
          "key": FeeRateKeyEnum.SERVICE_FEE
        },
        {
          "title": "Interest Fee",
          "counting": 0.1,
          "key": FeeRateKeyEnum.LOAN_INTEREST
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
      "loanAgreementUrl": "",
      "needRiskKycUpdate": false,
      // NOTICE: 優先權最高
      "riskReject": false,
      "refreshable": true,
      "noQuotaByRetryFewTimes": false,
      "noQuotaBalance": false,
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
      // NOTE: important 看到跑馬燈
      indexPagePo.marquee().should("be.visible").contains(indexServiceResponse.marquee);
      // NOTE: important 看到 welcome 包含姓名、客服 Button
      indexPagePo.welcome().should("be.visible");
      indexPagePo.welcome().find("[data-testing-id='hide-icon']").should("be.visible");
      indexPagePo.welcome().find("[data-testing-id='contact-icon']").should("be.visible");
      // action: 點擊 hide-icon ( 眼睛 )
      indexPagePo.welcome().find("[data-testing-id='hide-icon']").click().then(() => {
          indexPagePo.welcome().contains(NativeAppInfo.phoneNo);
      });
      indexPagePo.welcome().find("[data-testing-id='hide-icon']").click().then(() => {
          indexPagePo.welcome().contains(NativeAppInfo.phoneNo.slice(0, 3) + '****' + NativeAppInfo.phoneNo.slice(7, 10))
      });

      // NOTE: important 看到反灰無法拖拉使用的可借款額霸、看到文字顯示最低與最高範圍為 ****
      indexPagePo.quotaSlider().should("be.visible");
      indexPagePo.quotaSlider().invoke('attr', 'data-testing-disable').should('eq', 'true');
      indexPagePo.quotaSlider().find(".quota-slider").should("be.visible").should("have.class", 'disabled');
      indexPagePo.quotaSlider().find("[data-testing-id='current-quota-value']").should("be.visible").contains('****');
      indexPagePo.quotaSlider().find("[data-testing-id='max-quota-value']").should("be.visible").contains('****');
      
      // NOTE: important 歸零的倒數計計時
      indexPagePo.quotaSlider().find("[data-testing-id='quota-countdown']").should("be.visible").contains('00:00:00');
      
      // 正常隨意顯示 Loan Over View
      indexPagePo.loanOverView().should("be.visible");

      // NOTE: important 顯示文案：我們建議您在重新申請更高的信用額度之前優先還款。
      indexPagePo.tips().should("be.visible")
          .and('contain', 'Tips')
          .and('contain', 'The available credit limit has expired, please reacquire credit amount.')
      // NOTE: important 看到 Reacquire Credit Limit Button 可以點選。
      indexPagePo.applyButton().should("not.exist");
      indexPagePo.reacquireCreditButton().should('be.visible').contains('Reacquire Credit Amount');
      indexPagePo.viewAppProgressButton().should("not.exist");

      // NOTE: important 點選後 Reacquire Credit Limit Button 出現動畫
      indexPagePo.reacquireCreditButton().click().then(() => {
        indexPagePo.reacquireCreditButton().invoke('attr', 'data-testing-loading').should('eq', 'true')
      })

      // NOTE: important 會看到可關閉的 popup 顯示額度刷心中相關訊息。 (實際不會跳出無法測試)
      
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
      "hiddenLoanDetail": false,
      "offerExpireTime": moment().tz(INDIA_TIME_ZONE).add("-1", "days"),
      "payableRecords": [
        {
          "orderNo":"",
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
      "noQuotaByRetryFewTimes": false,
      "noQuotaBalance":false,
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
          "key": FeeRateKeyEnum.PROCESSING_FEE
        },
        {
          "title": "Service Fee",
          "counting": 0.5,
          "key": FeeRateKeyEnum.SERVICE_FEE
        },
        {
          "title": "Interest Fee",
          "counting": 0.1,
          "key": FeeRateKeyEnum.LOAN_INTEREST
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
      "loanAgreementUrl": "",
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
      // NOTE: important 看到跑馬燈
      indexPagePo.marquee().should("be.visible").contains(indexServiceResponse.marquee);
      // NOTE: important 看到 welcome 包含姓名、客服 Button
      indexPagePo.welcome().should("be.visible");
      indexPagePo.welcome().find("[data-testing-id='hide-icon']").should("be.visible");
      indexPagePo.welcome().find("[data-testing-id='contact-icon']").should("be.visible");
      // action: 點擊 hide-icon ( 眼睛 )
      indexPagePo.welcome().find("[data-testing-id='hide-icon']").click().then(() => {
          indexPagePo.welcome().contains(NativeAppInfo.phoneNo);
      });
      indexPagePo.welcome().find("[data-testing-id='hide-icon']").click().then(() => {
          indexPagePo.welcome().contains(NativeAppInfo.phoneNo.slice(0, 3) + '****' + NativeAppInfo.phoneNo.slice(7, 10))
      });

      // NOTE: important 看到反灰無法拖拉使用的可借款額霸、看到文字顯示最低與最高範圍為 ****
      indexPagePo.quotaSlider().should("be.visible");
      indexPagePo.quotaSlider().invoke('attr', 'data-testing-disable').should('eq', 'true');
      indexPagePo.quotaSlider().find(".quota-slider").should("be.visible").should("have.class", 'disabled');
      indexPagePo.quotaSlider().find("[data-testing-id='current-quota-value']").should("be.visible").contains('****');
      indexPagePo.quotaSlider().find("[data-testing-id='max-quota-value']").should("be.visible").contains('****');
      // NOTE: important 歸零的倒數計計時
      indexPagePo.quotaSlider().find("[data-testing-id='quota-countdown']").should("be.visible").contains('00:00:00');

      // 正常隨意顯示 Loan Over View
      indexPagePo.loanOverView().should("be.visible");

      // NOTE: important 顯示文案：有應還訂單時的文案。
      indexPagePo.tips().should("be.visible")
      .and('contain', 'Tips')
      .and('contain', 'The available credit limit has expired, please reacquire credit amount.')
      .and('contain', 'Before reacquire credit amount, we strongly suggest that you prioritize repayment before you can reapply for a higher credit limit.')

      // NOTE: important 看到 Reacquire Credit Limit Button 可以點選。
      indexPagePo.applyButton().should("not.exist");
      indexPagePo.reacquireCreditButton().should('be.visible').contains('Reacquire Credit Amount');
      indexPagePo.viewAppProgressButton().should("not.exist");

      // NOTE: important 點選後 Reacquire Credit Limit Button 出現動畫
      indexPagePo.reacquireCreditButton().click().then(() => {
          indexPagePo.reacquireCreditButton().invoke('attr', 'data-testing-loading').should('eq', 'true')
      })

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
      "hiddenLoanDetail": false,
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
          "key": FeeRateKeyEnum.PROCESSING_FEE
        },
        {
          "title": "Service Fee",
          "counting": 0.5,
          "key": FeeRateKeyEnum.SERVICE_FEE
        },
        {
          "title": "Interest Fee",
          "counting": 0.1,
          "key": FeeRateKeyEnum.LOAN_INTEREST
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
          "orderNo":"",
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
      "hiddenLoanDetail": false,

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
          "key": FeeRateKeyEnum.PROCESSING_FEE
        },
        {
          "title": "Service Fee",
          "counting": 0.5,
          "key": FeeRateKeyEnum.SERVICE_FEE
        },
        {
          "title": "Interest Fee",
          "counting": 0.1,
          "key": FeeRateKeyEnum.LOAN_INTEREST
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
          "orderNo":"",
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
      "hiddenLoanDetail": false,
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
          "key": FeeRateKeyEnum.PROCESSING_FEE
        },
        {
          "title": "Service Fee",
          "counting": 0.5,
          "key": FeeRateKeyEnum.SERVICE_FEE
        },
        {
          "title": "Interest Fee",
          "counting": 0.1,
          "key": FeeRateKeyEnum.LOAN_INTEREST
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
          "orderNo":"",
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
  it("status: 用戶已認證、但風控額度直接不足。再等 10 秒就能刷新 -> 連續3次”額度0”就拒掉 (僅模擬一次)。", () => {
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
    const getFirstIndexServiceResponse = (seconds: number): IndexServiceResponse => ({
      "hiddenLoanDetail": false,
      // NOTICE: 風控額度直接不足，無法執行重刷
      "noQuotaBalance": true,
      // NOTICE: 額度下次可刷新時間
      "refreshableUntil": moment().tz(INDIA_TIME_ZONE).add(seconds, "seconds").format(),

      // NOTICE: 風控是否可重整
      "refreshable": true,
      // NOTICE: 風控是否已無法重整
      "noQuotaByRetryFewTimes": false,

      // NOTICE: 風控有無過期
      // NOTE: 詢問後端，直接沒額度的風控有無過期??
      // "offerExpireTime": moment().tz(INDIA_TIME_ZONE).add(-1, "days").format(),
      "offerExpireTime": null,


      // NOTICE: 實際可用金額
      "availableAmount": 900,
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
          "key": FeeRateKeyEnum.PROCESSING_FEE
        },
        {
          "title": "Service Fee",
          "counting": 0.5,
          "key": FeeRateKeyEnum.SERVICE_FEE
        },
        {
          "title": "Interest Fee",
          "counting": 0.1,
          "key": FeeRateKeyEnum.LOAN_INTEREST
        }
      ],
      "loanAgreementUrl":"",
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
          "orderNo":"",
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


    // NOTE: 第 1 次看到需要重等刷新時間
    const firstIndexServiceResponse = () => getFirstIndexServiceResponse(10);
    // NOTE: 第 1 次看到重刷按鈕
    // const firstRefreshableIndexServiceResponse = () => getFirstRefreshableIndexServiceResponse();


    // NOTE: 第 2 次看到需要重等刷新時間
    const secondIndexServiceResponse= (): IndexServiceResponse  => getFirstIndexServiceResponse(10);
    // NOTE: 第 2 次看到重刷按鈕
    // const secondRefreshableIndexServiceResponse: IndexServiceResponse = () => getFirstRefreshableIndexServiceResponse();

    // NOTE: 第 3 次看到需要重等刷新時間
    const thirdIndexServiceResponse = () : IndexServiceResponse=> getFirstIndexServiceResponse(10);
    // NOTE: 第 3 次看到重刷按鈕
    // const thirdRefreshableIndexServiceResponse: IndexServiceResponse = () => getFirstRefreshableIndexServiceResponse();

    // NOTE: 看到無法再次重刷的畫面
    const getNotRefreshableIndexServiceResponse = () : IndexServiceResponse=> ({
      // NOTICE: 風控是否已無法重整 (refreshable 這時候 true | false 沒有意義)
      // 風控三次額度被拒，noQuotaByRetryFewTimes -> true (僅要看這個參數，其他條件不管)
      "hiddenLoanDetail":false,
      "noQuotaByRetryFewTimes": true,
      "noQuotaBalance": false,
      "refreshable": false,
      // NOTICE: 額度下次可刷新時間(noQuotaByRetryFewTimes 為 true，這時候就不會有時間)
      "refreshableUntil": null,
      // NOTICE: 風控有無過期
      // "offerExpireTime": moment().tz(INDIA_TIME_ZONE).add(-1, "days"),
      "offerExpireTime": moment().tz(INDIA_TIME_ZONE).add(-1, "days"),

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
          "key": FeeRateKeyEnum.PROCESSING_FEE
        },
        {
          "title": "Service Fee",
          "counting": 0.5,
          "key": FeeRateKeyEnum.SERVICE_FEE
        },
        {
          "title": "Interest Fee",
          "counting": 0.1,
          "key": FeeRateKeyEnum.LOAN_INTEREST
        }
      ],
      "loanAgreementUrl":"",
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
          "orderNo":"",
          "productLogo": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
          "productName": "AA LOAN",
          "payableAmount": 1000,
          "dueDate": moment().tz(INDIA_TIME_ZONE).add(7, "days"),
          "overdue": false,
          "repayUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png"
        }
      ],
      "marquee": "我是跑馬燈...已拒絕額度三次",
      "popupUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
      "customerServiceUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-7523112347980214.png",
      "bankBindH5url": "https://frontend.india-api-dev.com/bank-bind?token=d7f9d8262cb34bc3ac709c85582a7188&cardholderName=gp"
    })
    const notRefreshableIndexServiceResponse = () => getNotRefreshableIndexServiceResponse();

    let indexCount = 0;

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
    //         console.log('indexCount',indexCount)
    //       res.send({
    //         statusCode: 200,
    //         body: {
    //           ...secondIndexServiceResponse(),
    //           indexCount,
    //         }
    //       })
    //     } else if(indexCount === 3) {
    //       res.send({
    //         statusCode: 200,
    //         body: {
    //           ...thirdIndexServiceResponse(),
    //           indexCount,
    //         }
    //       })
    //     } else if(indexCount === 4) {
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
              if (count < 5) {
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
      cy.intercept("get", "/api/v3/index", (req) => {
          indexCount = indexCount + 1;
          req.continue((res) => {
              res.send({
                  statusCode: 200,
                  body: {
                      ...firstIndexServiceResponse(),
                      indexCount,
                  },
              })

              // NOTE: important 看到跑馬燈
              indexPagePo.marquee().should("be.visible").contains(firstIndexServiceResponse().marquee);

              // NOTE: important 看到 welcome 包含姓名、客服 Button
              indexPagePo.welcome().should("be.visible");
              indexPagePo.welcome().find("[data-testing-id='hide-icon']").should("be.visible");
              indexPagePo.welcome().find("[data-testing-id='contact-icon']").should("be.visible");
              // action: 點擊 hide-icon ( 眼睛 )
              indexPagePo.welcome().find("[data-testing-id='hide-icon']").click().then(() => {
                  indexPagePo.welcome().contains(NativeAppInfo.phoneNo);
              });
              indexPagePo.welcome().find("[data-testing-id='hide-icon']").click().then(() => {
                  indexPagePo.welcome().contains(NativeAppInfo.phoneNo.slice(0, 3) + '****' + NativeAppInfo.phoneNo.slice(7, 10))
              });

              // NOTE: important 看到反灰無法拖拉使用的可借款額霸、看到文字顯示最低與最高範圍為 ****
              indexPagePo.quotaSlider().should("be.visible");
              indexPagePo.quotaSlider().invoke('attr', 'data-testing-disable').should('eq', 'true');
              indexPagePo.quotaSlider().find(".quota-slider").should("be.visible").should("have.class", 'disabled');
              indexPagePo.quotaSlider().find("[data-testing-id='current-quota-value']").should("be.visible").contains('****');
              indexPagePo.quotaSlider().find("[data-testing-id='max-quota-value']").should("be.visible").contains('****');

              // NOTE: important 歸零的倒數計計時
              indexPagePo.quotaSlider().find("[data-testing-id='quota-countdown']").should("be.visible").contains('00:00:00');

              // NOTE: important 看到用戶認證沒被拒絕，但額度0的訊息
              indexPagePo.noticeUserAuthedEmptyQuotae().should("be.visible");
              indexPagePo.noticeUserAuthedEmptyQuotae().should("be.visible").contains('Oops...');
              indexPagePo.noticeUserAuthedEmptyQuotae().should("be.visible").contains('Our system is currently undergoing an upgrade, which may result in certain features being temporarily unavailable.');
              indexPagePo.noticeUserAuthedEmptyQuotae().should("be.visible").contains('We are working hard to resolve this issue. Thank you for your understanding and patience.');

              // NOTE: important 根據可返回借款天數顯示倒數計時器
              indexPagePo.welcomBackTimer().should("be.visible").contains('Welcome back and reapply in');
              const refreshableUntil = moment(firstIndexServiceResponse().refreshableUntil).add(-1, "seconds");
              const conutDown1s = getTimePartInfoBetweenCurrentAndCountDown(refreshableUntil);
              indexPagePo.welcomBackTimer().find("[data-testing-id='welcomBackTimer-days']").should("be.visible").contains(conutDown1s.time.days)
              indexPagePo.welcomBackTimer().find("[data-testing-id='welcomBackTimer-hours']").should("be.visible").contains(conutDown1s.time.hours)
              indexPagePo.welcomBackTimer().find("[data-testing-id='welcomBackTimer-minutes']").should("be.visible").contains(conutDown1s.time.minutes)
          })
      }).as('firstIndexServiceResponse');

      visitIndexPage();
      // 連續拒絕3次 (但這邊暫時只模擬一次)
      cy.wait('@firstIndexServiceResponse');

      // 連續３次”額度0”就拒掉。
      cy.intercept("get", "/api/v3/index", (req) => {
          indexCount = indexCount + 1;
          req.continue((res) => {
              res.send({
                  statusCode: 200,
                  body: {
                      ...notRefreshableIndexServiceResponse(),
                      indexCount,
                  }
              })
             // NOTE: important 看到跑馬燈
             indexPagePo.marquee().should("be.visible").contains(notRefreshableIndexServiceResponse().marquee);

             // NOTE: important 看到 welcome 包含姓名、客服 Button
             indexPagePo.welcome().should("be.visible");
             indexPagePo.welcome().find("[data-testing-id='hide-icon']").should("be.visible");
             indexPagePo.welcome().find("[data-testing-id='contact-icon']").should("be.visible");
             // action: 點擊 hide-icon ( 眼睛 )
             indexPagePo.welcome().find("[data-testing-id='hide-icon']").click().then(() => {
                 indexPagePo.welcome().contains(NativeAppInfo.phoneNo);
             });
             indexPagePo.welcome().find("[data-testing-id='hide-icon']").click().then(() => {
                 indexPagePo.welcome().contains(NativeAppInfo.phoneNo.slice(0, 3) + '****' + NativeAppInfo.phoneNo.slice(7, 10))
             });

             // NOTE: important 看到反灰無法拖拉使用的可借款額霸、看到文字顯示最低與最高範圍為 ****
             indexPagePo.quotaSlider().should("be.visible");
             indexPagePo.quotaSlider().invoke('attr', 'data-testing-disable').should('eq', 'true');
             indexPagePo.quotaSlider().find(".quota-slider").should("be.visible").should("have.class", 'disabled');
             indexPagePo.quotaSlider().find("[data-testing-id='current-quota-value']").should("be.visible").contains('****');
             indexPagePo.quotaSlider().find("[data-testing-id='max-quota-value']").should("be.visible").contains('****');

             // NOTE: important 歸零的倒數計計時
             indexPagePo.quotaSlider().find("[data-testing-id='quota-countdown']").should("be.visible").contains('00:00:00');

             // NOTE: important 看到用戶連續三次額度為0被拒絕的訊息
             indexPagePo.noticeUserReacquireOver3Time().should("be.visible");
             indexPagePo.noticeUserReacquireOver3Time().should("be.visible").contains('Your application was not approved');
             indexPagePo.noticeUserReacquireOver3Time().should("be.visible").contains('We regret to inform you that we cannot offer you any loans due to your credit score being below our standards.');
             indexPagePo.noticeUserReacquireOver3Time().should("be.visible").contains('If you have any questions, please contact our customer service center.');

             // NOTE: important 不顯示可返回借款天數顯示倒數計時器
             indexPagePo.welcomBackTimer().should("not.exist");
          })
      })
  })


  //FIGMA: 首頁-認證完成-有效額度時間-額度不足 (Android: Level 7)
  it("status: 用戶已認證、風控額度時間有效，但能借額度不足 (額度用完)", () => {
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
      "hiddenLoanDetail": false,
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
          "key": FeeRateKeyEnum.PROCESSING_FEE
        },
        {
          "title": "Service Fee",
          "counting": 0.5,
          "key": FeeRateKeyEnum.SERVICE_FEE
        },
        {
          "title": "Interest Fee",
          "counting": 0.1,
          "key": FeeRateKeyEnum.LOAN_INTEREST
        }
      ],
      "products": [
        {
          "productId": 1,
          "productName": "AA LOAN",
          "logoUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/icon_logo/8285099.png",
          "min": 2000,
          "max": 5120,
          "terms": 7,
          "platformChargeFeeRate": 0.4
        },
        {
          "productId": 2,
          "productName": "BB LOAN",
          "logoUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/icon_logo/8285141.png",
          "min": 3000,
          "max": 5230,
          "terms": 7,
          "platformChargeFeeRate": 0.4
        },
        {
          "productId": 3,
          "productName": "CC LOAN",
          "logoUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/icon_logo/8285186.png",
          "min": 4000,
          "max": 6460,
          "terms": 7,
          "platformChargeFeeRate": 0.4
        }
      ],
      "loanAgreementUrl": "",
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
          "orderNo":"",
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
      // NOTE: important 看到跑馬燈
      indexPagePo.marquee().should("be.visible").contains(indexServiceResponse.marquee);
      // NOTE: important 看到 welcome 包含姓名、客服 Button
      indexPagePo.welcome().should("be.visible");
      indexPagePo.welcome().find("[data-testing-id='hide-icon']").should("be.visible");
      indexPagePo.welcome().find("[data-testing-id='contact-icon']").should("be.visible");
      // action: 點擊 hide-icon ( 眼睛 )
      indexPagePo.welcome().find("[data-testing-id='hide-icon']").click().then(() => {
          indexPagePo.welcome().contains(NativeAppInfo.phoneNo);
      });
      indexPagePo.welcome().find("[data-testing-id='hide-icon']").click().then(() => {
          indexPagePo.welcome().contains(NativeAppInfo.phoneNo.slice(0, 3) + '****' + NativeAppInfo.phoneNo.slice(7, 10))
      });

      // NOTE: important 看到不反灰但可借款額度拉霸最低與最高都是0
      indexPagePo.quotaSlider().should("be.visible");
      indexPagePo.quotaSlider().invoke('attr', 'data-testing-disable').should('eq', 'false');
      indexPagePo.quotaSlider().find(".quota-slider").should("be.visible").should("not.have.class", 'disabled');
      indexPagePo.quotaSlider().find("[data-testing-id='current-quota-value']").should("be.visible").contains(0);
      indexPagePo.quotaSlider().find("[data-testing-id='max-quota-value']").should("be.visible").contains(0);

      // NOTE: important 倒數計時正在計時
      indexPagePo.quotaSlider().find("[data-testing-id='quota-countdown']").should("be.visible");

      // 正常隨意顯示 Loan Over View
      indexPagePo.loanOverView().should("be.visible");

      // NOTE: important 看到下方 tips 額度不足相關訊息
      indexPagePo.tips().should("be.visible")
      .and('contain', 'Tips')
      .and('contain', 'Your current preferential loan quota has been used up.')
      .and('contain', 'Remind you to prioritize repayment to obtain a higher credit limit, and wait for the next round of preferential loan plans.')
      
      // NOTE: important 看到反灰無法點擊的 Apply Now Button
      indexPagePo.applyButton().should('be.visible').contains('Apply Now');
      indexPagePo.applyButton().invoke('attr', 'data-testing-disable').should('eq', 'true');
      indexPagePo.reacquireCreditButton().should('not.exist');
      indexPagePo.viewAppProgressButton().should("not.exist");
      
  })



  // FIGMA: 首頁-認證完成-有效額度時間-尚有額度 (Android: Level 10)
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
      "hiddenLoanDetail": false,
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
          "key": FeeRateKeyEnum.PROCESSING_FEE
        },
        {
          "title": "Service Fee",
          "counting": 0.5,
          "key": FeeRateKeyEnum.SERVICE_FEE
        },
        {
          "title": "Interest Fee",
          "counting": 0.1,
          "key": FeeRateKeyEnum.LOAN_INTEREST
        }
      ],
      "products": [
        {
          "productId": 1,
          "productName": "AA LOAN",
          "logoUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/icon_logo/8285099.png",
          "min": 2000,
          "max": 5120,
          "terms": 7,
          "platformChargeFeeRate": 0.43
        },
        {
          "productId": 2,
          "productName": "BB LOAN",
          "logoUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/icon_logo/8285141.png",
          "min": 3000,
          "max": 5230,
          "terms": 7,
          "platformChargeFeeRate": 0.43
        },
        {
          "productId": 3,
          "productName": "CC LOAN",
          "logoUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/icon_logo/8285186.png",
          "min": 4000,
          "max": 6460,
          "terms": 7,
          "platformChargeFeeRate": 0.43
        }
      ],
      "needRiskKycUpdate": false,
      "riskReject": false,
      "refreshable": false,
      "noQuotaByRetryFewTimes": false,
      "noQuotaBalance":false,
      "orderUnderReview": false,
      "refreshableUntil": "2023-03-28T08:10:24",
      "offerExpireTime": moment().tz(INDIA_TIME_ZONE).add(1, "days"),
      "oldUserForceApply": false,
      "loanAgreementUrl":"",
      "payableRecords": [
        {
          "orderNo":"",
          "productLogo": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
          "productName": "AA LOAN",
          "payableAmount": 1000,
          "dueDate": moment().tz(INDIA_TIME_ZONE).add(5, "days"),
          "overdue": false,
          "repayUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png"
        },
        {
          "orderNo":"",
          "productLogo": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
          "productName": "BB LOAN",
          "payableAmount": 2000,
          "dueDate": moment().tz(INDIA_TIME_ZONE).add(6, "days"),
          "overdue": false,
          "repayUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png"
        },
        {
          "orderNo":"",
          "productLogo": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
          "productName": "CC LOAN",
          "payableAmount": 3000,
          "dueDate": moment().tz(INDIA_TIME_ZONE).add(7, "days"),
          "overdue": false,
          "repayUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png"
        },
        {
          "orderNo":"",
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
      "hiddenLoanDetail": false,
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
          "key": FeeRateKeyEnum.PROCESSING_FEE
        },
        {
          "title": "Service Fee",
          "counting": 0.5,
          "key": FeeRateKeyEnum.SERVICE_FEE
        },
        {
          "title": "Interest Fee",
          "counting": 0.1,
          "key": FeeRateKeyEnum.LOAN_INTEREST
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
      "loanAgreementUrl":"",
      "needRiskKycUpdate": false,
      "riskReject": false,
      "refreshable": false,
      "noQuotaByRetryFewTimes": false,
      "noQuotaBalance":false,
      "orderUnderReview": false,
      "refreshableUntil": "2023-03-28T08:10:24",
      "offerExpireTime": moment().tz(INDIA_TIME_ZONE).add(1, "days"),
      "oldUserForceApply": false,
      "payableRecords": [
        {
          "orderNo":"",
          "productLogo": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
          "productName": "AA LOAN",
          "payableAmount": 1000,
          "dueDate": moment().tz(INDIA_TIME_ZONE).add(5, "days"),
          "overdue": false,
          "repayUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png"
        },
        {
          "orderNo":"",
          "productLogo": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
          "productName": "BB LOAN",
          "payableAmount": 2000,
          "dueDate": moment().tz(INDIA_TIME_ZONE).add(6, "days"),
          "overdue": false,
          "repayUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png"
        },
        {
          "orderNo":"",
          "productLogo": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png",
          "productName": "CC LOAN",
          "payableAmount": 3000,
          "dueDate": moment().tz(INDIA_TIME_ZONE).add(7, "days"),
          "overdue": false,
          "repayUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14178981544655336.png"
        },
        {
          "orderNo":"",
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
      // NOTE: important 看到跑馬燈
      indexPagePo.marquee().should("be.visible").contains(indexServiceResponse.marquee);
      // NOTE: important 看到 welcome 包含姓名、客服 Button
      indexPagePo.welcome().should("be.visible");
      indexPagePo.welcome().find("[data-testing-id='hide-icon']").should("be.visible");
      indexPagePo.welcome().find("[data-testing-id='contact-icon']").should("be.visible");
      // action: 點擊 hide-icon ( 眼睛 )
      indexPagePo.welcome().find("[data-testing-id='hide-icon']").click().then(() => {
          indexPagePo.welcome().contains(NativeAppInfo.phoneNo);
      });
      indexPagePo.welcome().find("[data-testing-id='hide-icon']").click().then(() => {
          indexPagePo.welcome().contains(NativeAppInfo.phoneNo.slice(0, 3) + '****' + NativeAppInfo.phoneNo.slice(7, 10))
      });

      // NOTE: important 看到不反灰，可借款額度拉霸最低與最高都是正常值
      indexPagePo.quotaSlider().should("be.visible");
      indexPagePo.quotaSlider().invoke('attr', 'data-testing-disable').should('eq', 'false');
      indexPagePo.quotaSlider().find(".quota-slider").should("be.visible").should("not.have.class", 'disabled');
      indexPagePo.quotaSlider().find("[data-testing-id='current-quota-value']").should("be.visible").contains(formatPrice(indexServiceResponse.quotaBar.current));
      indexPagePo.quotaSlider().find("[data-testing-id='max-quota-value']").should("be.visible").contains(formatPrice(indexServiceResponse.quotaBar.max));
      // NOTE: important 倒數計時正在計時
      indexPagePo.quotaSlider().find("[data-testing-id='quota-countdown']").should("be.visible");

      // NOTE: important 看到推薦的產品列表
      indexPagePo.recommendedProducts().should("be.visible");

      // 正常隨意顯示 Loan Over View
      indexPagePo.loanOverView().should("be.visible");

      // NOTE: important 看到可點擊的 Apply Now Button
      indexPagePo.applyButton().should('be.visible').contains('Apply Now');
      indexPagePo.applyButton().invoke('attr', 'data-testing-disable').should('eq', 'false');
      indexPagePo.reacquireCreditButton().should('not.exist');
      indexPagePo.viewAppProgressButton().should("not.exist");

      // NOTE: important tips 訊息不會出現
      indexPagePo.tips().should("not.be.visible")
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
      "hiddenLoanDetail": false,
      "totalAmount": 15000,
      "usedAmount": 13000,
      "availableAmount": 1000,
      "quotaBar": {
        "min": 100,
        "max": 1000,
        "current": 1000,
        "serial": 100
      },
      "chargeFeeDetails": [
        {
          "title": "Processing Fee",
          "counting": 0.4,
          "key": FeeRateKeyEnum.PROCESSING_FEE
        },
        {
          "title": "Service Fee",
          "counting": 0.5,
          "key": FeeRateKeyEnum.SERVICE_FEE
        },
        {
          "title": "Interest Fee",
          "counting": 0.1,
          "key": FeeRateKeyEnum.LOAN_INTEREST
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
      "loanAgreementUrl":"",
      "needRiskKycUpdate": false,
      // NOTICE: 優先權最高
      "riskReject": false,
      "refreshable": true,
      "noQuotaByRetryFewTimes": false,
      "noQuotaBalance":false,
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
              "key": FeeRateKeyEnum.PROCESSING_FEE
            },
            {
              "title": "Service Fee",
              "counting": 0.5,
              "key": FeeRateKeyEnum.SERVICE_FEE
            },
            {
              "title": "Interest Fee",
              "counting": 0.1,
              "key": FeeRateKeyEnum.LOAN_INTEREST
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
      // NOTE: important 看到跑馬燈
      indexPagePo.marquee().should("be.visible").contains(indexServiceResponse.marquee);
      // NOTE: important 看到 welcome 包含姓名、客服 Button
      indexPagePo.welcome().should("be.visible");
      indexPagePo.welcome().find("[data-testing-id='hide-icon']").should("be.visible");
      indexPagePo.welcome().find("[data-testing-id='contact-icon']").should("be.visible");
      // action: 點擊 hide-icon ( 眼睛 )
      indexPagePo.welcome().find("[data-testing-id='hide-icon']").click().then(() => {
          indexPagePo.welcome().contains(NativeAppInfo.phoneNo);
      });
      indexPagePo.welcome().find("[data-testing-id='hide-icon']").click().then(() => {
          indexPagePo.welcome().contains(NativeAppInfo.phoneNo.slice(0, 3) + '****' + NativeAppInfo.phoneNo.slice(7, 10))
      });
      // NOTE: important 看到不反灰、可使用的借款額度拉霸、看到文字顯示最低與最高金額
      indexPagePo.quotaSlider().should("be.visible");
      indexPagePo.quotaSlider().invoke('attr', 'data-testing-disable').should('eq', 'false');
      indexPagePo.quotaSlider().find(".quota-slider").should("be.visible").should("not.have.class", 'disabled');
      indexPagePo.quotaSlider().find("[data-testing-id='current-quota-value']").should("be.visible").contains(formatPrice(indexServiceResponse.quotaBar.current));
      indexPagePo.quotaSlider().find("[data-testing-id='max-quota-value']").should("be.visible").contains(formatPrice(indexServiceResponse.quotaBar.max));
      // NOTE: important 倒數計時正在計時
      indexPagePo.quotaSlider().find("[data-testing-id='quota-countdown']").should("be.visible");

      // NOTE: important 看到推薦的產品列表
      indexPagePo.recommendedProducts().should("be.visible");

      // 正常隨意顯示 Loan Over View
      indexPagePo.loanOverView().should("be.visible");

      // NOTE: important 看到不可點擊的 Apply Now Button
      indexPagePo.applyButton().should('be.visible').contains('Apply Now');
      indexPagePo.applyButton().invoke('attr', 'data-testing-disable').should('eq', 'true');
      indexPagePo.reacquireCreditButton().should('not.exist');
      indexPagePo.viewAppProgressButton().should("not.exist");

      // NOTE: important tips 訊息不會出現
      indexPagePo.tips().should("not.be.visible")
  })

  // FIGMA: 首頁-認證完成-額度時間尚未到期-用戶尚有額度-沒有可借產品 (Android: Level 9)
  it("status: 用戶已認證、風控額度時間有效，但10秒到期，用戶尚有額度，但沒有可以借的產品。無法點擊 Apply Now", () => {
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
      "hiddenLoanDetail": false,
      "totalAmount": 15000,
      "usedAmount": 13000,
      "availableAmount": 1000,
      "quotaBar": {
        "min": 100,
        "max": 1000,
        "current": 1000,
        "serial": 100
      },
      "chargeFeeDetails": [
        {
          "title": "Processing Fee",
          "counting": 0.4,
          "key": FeeRateKeyEnum.PROCESSING_FEE
        },
        {
          "title": "Service Fee",
          "counting": 0.5,
          "key": FeeRateKeyEnum.SERVICE_FEE
        },
        {
          "title": "Interest Fee",
          "counting": 0.1,
          "key": FeeRateKeyEnum.LOAN_INTEREST
        }
      ],
      "products": [],
      "loanAgreementUrl":"",
      "needRiskKycUpdate": false,
      // NOTICE: 優先權最高
      "riskReject": false,
      "refreshable": true,
      "noQuotaByRetryFewTimes": false,
      "noQuotaBalance":false,
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
              "key": FeeRateKeyEnum.PROCESSING_FEE
            },
            {
              "title": "Service Fee",
              "counting": 0.5,
              "key": FeeRateKeyEnum.SERVICE_FEE
            },
            {
              "title": "Interest Fee",
              "counting": 0.1,
              "key": FeeRateKeyEnum.LOAN_INTEREST
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
      // NOTE: important 看到跑馬燈
      indexPagePo.marquee().should("be.visible").contains(indexServiceResponse.marquee);
      // NOTE: important 看到 welcome 包含姓名、客服 Button
      indexPagePo.welcome().should("be.visible");
      indexPagePo.welcome().find("[data-testing-id='hide-icon']").should("be.visible");
      indexPagePo.welcome().find("[data-testing-id='contact-icon']").should("be.visible");
      // action: 點擊 hide-icon ( 眼睛 )
      indexPagePo.welcome().find("[data-testing-id='hide-icon']").click().then(() => {
          indexPagePo.welcome().contains(NativeAppInfo.phoneNo);
      });
      indexPagePo.welcome().find("[data-testing-id='hide-icon']").click().then(() => {
          indexPagePo.welcome().contains(NativeAppInfo.phoneNo.slice(0, 3) + '****' + NativeAppInfo.phoneNo.slice(7, 10))
      });
      // NOTE: important 看到不反灰、可使用的借款額度拉霸、看到文字顯示最低與最高金額
      indexPagePo.quotaSlider().should("be.visible");
      indexPagePo.quotaSlider().invoke('attr', 'data-testing-disable').should('eq', 'false');
      indexPagePo.quotaSlider().find(".quota-slider").should("be.visible").should("not.have.class", 'disabled');
      indexPagePo.quotaSlider().find("[data-testing-id='current-quota-value']").should("be.visible").contains(formatPrice(indexServiceResponse.quotaBar.current));
      indexPagePo.quotaSlider().find("[data-testing-id='max-quota-value']").should("be.visible").contains(formatPrice(indexServiceResponse.quotaBar.max));
      // NOTE: important 倒數計時正在計時
      indexPagePo.quotaSlider().find("[data-testing-id='quota-countdown']").should("be.visible");

      // NOTE: important 看不到推薦的產品列表
      indexPagePo.recommendedProducts().should("not.exist");

      // 正常隨意顯示 Loan Over View
      indexPagePo.loanOverView().should("be.visible");

      // NOTE: important 看到不可點擊的 Apply Now Button
      indexPagePo.applyButton().should('be.visible').contains('Apply Now');
      indexPagePo.applyButton().invoke('attr', 'data-testing-disable').should('eq', 'true');
      indexPagePo.reacquireCreditButton().should('not.exist');
      indexPagePo.viewAppProgressButton().should("not.exist");

      // NOTE: important tips 訊息顯示沒有可借的產品
      indexPagePo.tips()
          .should("be.visible")
          .and('contain', 'Tips')
          .and('contain', 'There are currently no products available for borrowing. Please return after countdown ends.');
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
      "hiddenLoanDetail": false,
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
          "key": FeeRateKeyEnum.PROCESSING_FEE
        },
        {
          "title": "Service Fee",
          "counting": 0.5,
          "key": FeeRateKeyEnum.SERVICE_FEE
        },
        {
          "title": "Interest Fee",
          "counting": 0.1,
          "key": FeeRateKeyEnum.LOAN_INTEREST
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
      "loanAgreementUrl":"",
      "needRiskKycUpdate": false,
      // NOTICE: 優先權最高
      "riskReject": false,
      "refreshable": true,
      "noQuotaByRetryFewTimes": false,
      "noQuotaBalance":false,
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
              "key": FeeRateKeyEnum.PROCESSING_FEE
            },
            {
              "title": "Service Fee",
              "counting": 0.5,
              "key": FeeRateKeyEnum.SERVICE_FEE
            },
            {
              "title": "Interest Fee",
              "counting": 0.1,
              "key": FeeRateKeyEnum.LOAN_INTEREST
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

