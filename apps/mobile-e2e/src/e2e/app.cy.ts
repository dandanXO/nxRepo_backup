//NOTICE: PageObject
// https://www.toolsqa.com/cypress/page-object-pattern-in-cypress/

// NOTICE: [Day 26]User Story/ATDD/BDD/TDD - 總結
//  https://ithelp.ithome.com.tw/articles/10109206


import { getGreeting } from '../support/app.po';
import {GetPersonalLoanRecommendResponse, RecommendProduct} from "../../../mobile/src/app/api/GetPersonalLoanRecommend";
import moment from "moment-timezone";
import {PostLoanQuotaRefreshResponse} from "../../../mobile/src/app/api/PostLoanQuotaRefreshResponse";
import React from "react";
import {PostApplyProductRequest} from "../../../mobile/src/app/api/PostApplyProductRequest";

console.log("[e2e] env", Cypress.env())

// describe('mobile', () => {
//   beforeEach(() => {
//     cy.visit('/')
//   });
//
//   it('should display welcome message', () => {
//     // Custom command example, see `../support/commands.ts` file
//     // cy.login('my-email@something.com', 'myPassword');
//
//     // Function helper example, see `../support/app.po.ts` file
//     getGreeting().contains('Welcome to Mobile !!!');
//   });
//
// });

describe("iphone-3一鍵快速借款", () => {

  const productList: RecommendProduct[] = [
    {
      approvedRate:	"string",
      // 广告通过率

      approvedTime:	"string",
      // 广告通过时间

      csContact:	"string",
      // 客服電話

      csEmail:	"string",
      // 產品客服郵件

      interestRate:	"1.8%",
      // 建议借款服务费率

      loanableAmount:	1000,
      // 建议金额

      logoUrl: "string",
      // Logo icon

      productId:	1,
      // 產品编号

      productName: "AAASAAD LOAN",
      // 產品名稱

      terms: "91 days",
      // 建议借款周期
    },
    {
      approvedRate:	"string",
      // 广告通过率

      approvedTime:	"string",
      // 广告通过时间

      csContact:	"string",
      // 客服電話

      csEmail:	"string",
      // 產品客服郵件

      interestRate:	"0.8%",
      // 建议借款服务费率

      loanableAmount:	5000,
      // 建议金额

      logoUrl: "string",
      // Logo icon

      productId: 2,
      // 產品编号

      productName: "PRR LOAN",
      // 產品名稱

      terms: "5 days",
      // 建议借款周期
    },
    {
      approvedRate:	"string",
      // 广告通过率

      approvedTime:	"string",
      // 广告通过时间

      csContact:	"string",
      // 客服電話

      csEmail:	"string",
      // 產品客服郵件

      interestRate:	"1.0%",
      // 建议借款服务费率

      loanableAmount:	2000,
      // 建议金额

      logoUrl: "string",
      // Logo icon

      productId: 3,
      // 產品编号

      productName: "DOGGY LOAN",
      // 產品名稱

      terms: "12 days",
      // 建议借款周期
    }
  ];

  beforeEach(() => {
    // console.log("[testing]aaaa", moment("2023-03-17T13:56:44").format())
    // console.log("[testing]aaaa", moment("2023-03-17T13:56:44").tz("Asia/Kolkata").format())

    cy.viewport('iphone-3')
    cy.visit("/product-ad-modal-list?token=45d9ab38654247e88406fa06308fa604");
    // cy.intercept("**.sentry.io**", {
    //   statusCode: 200,
    // })


    // cy.intercept('/url', (req) => {
    //   req.on('before:response', (res) => {
    //     // this will be called before any `req.continue` or
    //     // `response` handlers
    //   })
    //
    //   req.continue((res) => {
    //     // this will be called after all `before:response`
    //     // handlers and before any `response` handlers
    //     // by calling `req.continue`, we signal that this
    //     // request handler will be the last one, and that
    //     // the request should be sent outgoing at this point.
    //     // for that reason, there can only be one
    //     // `req.continue` handler per request.
    //   })
    //
    //   req.on('response', (res) => {
    //     // this will be called after all `before:response`
    //     // handlers and after the `req.continue` handler
    //     // but before the response is sent to the browser
    //   })
    // })
  })

  afterEach(() => {
    // cy.screenshot();
  })

  it.only("1.無額度，無風控到期。畫面應顯示提示用戶語句。用戶不能 Apply。", () => {
    // NOTICE: GIVEN: 無額度，無風控到期
    // NOTICE: THEN: 畫面顯示倒數計時器、可用金額 0
    // NOTICE: THEN: API Refresh 應該完全不會呼叫
    // NOTICE: THEN: 用戶不能 Apply。

    // NOTICE: GIVEN: 無額度，無風控到期
    cy.intercept("/api/v2/product/personal-recommend?count=", {
      statusCode: 200,
      body: {
        products: productList,
        quotaBar: {
          current: 0,
          // 拉霸初始額度
          interval: 0,
          // 拉霸額度間隔
          max: 0,
          // 拉霸最高額度
          min: 0,
          // 拉霸最低額度
        },
        quotaExpireTime: moment().add(1,'day').format('YYYY-MM-DD HH:mm:ss'),
        processing: false,
        riskReject: false,
      } as GetPersonalLoanRecommendResponse,
    }).then(() => {
      // NOTICE: THEN: 畫面顯示倒數計時器、可用金額
      cy.get(".title").contains("您目前無額度")
      cy.get(".price").contains("0");


    }).as("fetchProducts")

    // NOTE: 應該只呼叫一次
    // NOTICE: THEN: 用戶不能 Apply。
    cy.get("@fetchProducts")
      .should('have.length', 1)
      .then(() => {
        cy.get("button").should("have.class", "不能借款");
      })

    // NOTICE: THEN: API Refresh 應該完全不會呼叫
    cy.intercept("/api/v2/loan/quota/refresh", {
      statusCode: 200,
      body: {
        effective:	false,
        // 用户额度是否有效
        quotaExpireTime: moment().add(-4,'day').format('YYYY-MM-DD HH:mm:ss'),
        // 用户额度有效时间
      } as PostLoanQuotaRefreshResponse,
    }).as("fetchRefresh");
    cy.get("@fetchRefresh.all").should('have.length', 0);



  });


  it("[OK] 2.有額度，無風控到期。用戶應該能 Apply。", () => {
    // NOTICE: GIVEN: 有額度，無風控到期
    // NOTICE: THEN: 畫面顯示倒數計時器、可用金額
    // NOTICE: THEN: 用戶應該能 Apply。

    // NOTICE: GIVEN: 有額度，無風控到期
    cy.intercept("/api/v2/product/personal-recommend?count=", {
      statusCode: 200,
      body: {
        products: productList,
        quotaBar: {
          current: 2000,
          // 拉霸初始額度
          interval: 100,
          // 拉霸額度間隔
          max: 8880,
          // 拉霸最高額度
          min: 100,
          // 拉霸最低額度
        },
        quotaExpireTime: moment().add(1,'day').format('YYYY-MM-DD HH:mm:ss'),
        processing: false,
        riskReject: false,
      } as GetPersonalLoanRecommendResponse
    }).then(() => {
      // NOTICE: THEN: 畫面顯示倒數計時器、可用金額
      cy.get(".title").contains("LIMITED TIME OFFER COUNTDOWN :")
      cy.get(".price").contains("2000");
      // NOTICE: THEN: 用戶應該能 Apply。
      // cy.get("button").should("have.class", "能借款");
    })

    cy.intercept("/api/v2/product/apply", (req) => {
      console.log("req", req);
      req.continue((res) => {
        console.log("res", res);
        const stubResponse: PostApplyProductRequest = {
          applyQuota: 1000,
          productIds: [1, 2, 3]
        }
        res.send(stubResponse);
      })
    })

  });

  it("[OK] 3.無額度，風控到期，但是在七天內。自動幫用戶刷新。並且有拿到能 APPLY資料。", () => {
    // NOTICE GIVEN 無額度，風控到期，但是在七天內
    // NOTICE: WHEN 用戶瀏覽畫面
    // NOTICE: THEN 自動幫用戶刷新

    console.log("[3]1");

    // NOTICE GIVEN 無額度，風控到期，但是在七天內
    cy.intercept("/api/v2/product/personal-recommend?count=", {
      statusCode: 200,
      body: {
        products: productList,
        quotaBar: {
          current: 0,
          // 拉霸初始額度
          interval: 0,
          // 拉霸額度間隔
          max: 0,
          // 拉霸最高額度
          min: 0,
          // 拉霸最低額度
        },
        quotaExpireTime: moment().add(-4,'day').format('YYYY-MM-DD HH:mm:ss'),
        processing: false,
        riskReject: false,
      } as GetPersonalLoanRecommendResponse
    }).then(() => {
      console.log("[3]6");
      console.log("[dog] request 1")
      // cy.get(".button-container > button > div").should("have.class", "loadingio-spinner-spinner-e19blwp8l9")
    })

    console.log("[3]2");

    // NOTE: APP 會自動去抓取
    // NOTE: 模擬繼續 refresh
    cy.intercept("/api/v2/loan/quota/refresh", {
      statusCode: 200,
      body: {
        effective:	false,
        // 用户额度是否有效
        quotaExpireTime: moment().add(-4,'day').format('YYYY-MM-DD HH:mm:ss'),
        // 用户额度有效时间
      } as PostLoanQuotaRefreshResponse
    }).then(() => {
      console.log("[3]7");
      console.log("[dog] request 2")
      // cy.get(".title").contains("LIMITED TIME OFFER COUNTDOWN :")
      cy.get(".button-container > button > span")
        .should("contain", "Refreshing . . . .")
    }).as("loadList2");


    console.log("[3]3");

    // NOTE: 模擬最後一次更新拿到成功了
    cy.wait(20 * 1000).then(() => {
      console.log("[3]8");
    })

    console.log("[3]4");

    cy.intercept("/api/v2/loan/quota/refresh", {
      statusCode: 200,
      body: {
        effective:	true,
        // 用户额度是否有效
        quotaExpireTime: moment().add(1,'day').format('YYYY-MM-DD HH:mm:ss'),
        // 用户额度有效时间
      } as PostLoanQuotaRefreshResponse
    }).then(() => {
      console.log("[3]9");
      console.log("[dog] request 3")
      // cy.get(".title").contains("LIMITED TIME OFFER COUNTDOWN :")
    });

    // NOTE: 模擬拿到新的風控資料了
    cy.intercept("/api/v2/product/personal-recommend?count=", {
      statusCode: 200,
      body: {
        products: productList,
        quotaBar: {
          current: 8000,
          // 拉霸初始額度
          interval: 100,
          // 拉霸額度間隔
          max: 8880,
          // 拉霸最高額度
          min: 100,
          // 拉霸最低額度
        },
        quotaExpireTime: moment().add(1,'day').format('YYYY-MM-DD HH:mm:ss'),
        processing: false,
        riskReject: false,
      } as GetPersonalLoanRecommendResponse
    }).then(() => {
      console.log("[3]10");
      console.log("[dog] request 4")
      // cy.get(".button-container").contains("Re-Acquire The Loan Amount")
      // cy.get(".button-container > button > div").should("have.class", "loadingio-spinner-spinner-e19blwp8l9")
    });
    console.log("[3]5");

  });

  it("[OK] 4.無額度，風控到期，已超過七天，不幫用戶自動刷新。", () => {
    // NOTICE: GIVEN 用戶無額度，用戶風控到期，已超過七天
    // NOTICE: WHEN 用戶瀏覽畫面
    // NOTICE: THEN: 不幫用戶自動刷新

    // NOTE: GIVEN 用戶無額度，用戶風控到期，已超過七天
    let requestId = 0;
    let interceptPersonRecommendCount = 0;
    cy.intercept("/api/v2/product/personal-recommend?count=", (req) => {
      req.continue((res) => {
        interceptPersonRecommendCount = interceptPersonRecommendCount + 1;
        if(interceptPersonRecommendCount === 1) {
          // console.log("[step] 4")
          res.send({
            statusCode: 200,
            body: {
              requestId: requestId++,
              products: productList,
              quotaBar: {
                current: 0,
                // 拉霸初始額度
                interval: 0,
                // 拉霸額度間隔
                max: 0,
                // 拉霸最高額度
                min: 0,
                // 拉霸最低額度
              },
              quotaExpireTime: moment().add(-10,'day').format('YYYY-MM-DD HH:mm:ss'),
              processing: false,
              riskReject: false,
            } as GetPersonalLoanRecommendResponse
          })
        } else if(interceptPersonRecommendCount >= 2) {
          new Error("不應該顯示此行");
        }
      })
    }).as("fetchProducts")

    // NOTICE: THEN: 不幫用戶自動刷新
    cy.wait("@fetchProducts").then(() => {
      cy.get(".button-container").contains("Re-Acquire The Loan Amount")
    })

  })

  // NOTICE: 但如果用戶在其他借貸APP已經借滿，會噴出錯誤唷
  it("[OK] 5.有額度，風控到期，不管幾天內。用戶要自己手動刷新。也可不刷新直接借款 APPLY。", () => {
    // NOTICE: GIVEN 有額度，風控到期，不管幾天內。
    // NOTICE: WHEN 用戶瀏覽畫面
    // NOTICE: THEN 用戶要自己手動刷新。也可不刷新直接借款
    // NOTICE: THEN: 用戶應該能 Apply。

    // const dateMoment = moment("2023-03-17T13:38:47+05:30").tz("Asia/Kolkata")
    // const dateMoment = moment().add("-4", "days").tz("Asia/Kolkata");

    // moment.defineLocale("Asia/Kolkata");

    // NOTE: 1679032604
    // const fromBackendTime = "2023-03-17T13:56:44";
    // console.log("[testing] love.fromBackendTime", fromBackendTime);
    // console.log("[testing] love", moment(fromBackendTime));

    // love 2023-03-17T13:56:44+08:00
    // console.log("[testing] love.format", moment(fromBackendTime).format());

    // const mockDate = fromBackendTime;
    // const mockTimestamp = moment(mockDate).unix();
    // console.log("[testing] mockDate", mockDate)
    // console.log("[testing] mockDate.timestamp", mockTimestamp)
    // console.log("[testing] mockDate.format", moment.unix(mockTimestamp).format())

    // NOTE: 現在時間跟過期時間一樣
    // cy.clock().then((clock) => {
      // clock.setSystemTime(mockTimestamp);
      // setSystemTime doesn't trigger any timers, so we run the last frame
      // with tick to trigger a callback to update the timer.
      // clock.tick(60);
    // })
    // cy.clock(mockTimestamp).then((clock) => {
      // 1970-01-20T15:53:52+05:30
      // cy.tick(1000)
      // 1970-01-20T15:53:53+05:30

      // no work
      // cy.tick(-1000)
      // 1970-01-20T15:53:52+05:30
      // cy.tick(5000)
      // 1970-01-20T15:53:57+05:30

      // NOTE: 往後一天
      // cy.tick(1000 * 60 * 60 * 24 * 365 * 53 + 1000 * 60 * 60 * 24 * 65);
    // });

    // console.log("[testing] date", new Date())
    // cy.wait(4000);


    // console.log("current", new Date())

    // const expiredDateMoment = moment(moment.unix(mockTimestamp)).add("-4", "days").tz("Asia/Kolkata")
    // const expiredDateMoment = moment(moment.unix(mockTimestamp)).add("-4", "days").tz("Asia/Kolkata")
    // const expiredDateMoment = moment(moment.unix(mockTimestamp)).add("-4", "days").tz("Asia/Kolkata")
    // const expiredDateMoment = moment().add("-4", "days").tz("Asia/Kolkata")
    // const expiredDate = expiredDateMoment.format();
    //
    // console.log("[testing] expiredDateMoment", expiredDateMoment);
    // console.log("[testing] expiredDate", expiredDate);

    let requestId = 1;
    let interceptPersonRecommendCount = 0

    console.log("[step] 0")

    // NOTICE: GIVEN 有額度，風控到期，不管幾天內。
    cy.intercept("/api/v2/product/personal-recommend?count=", (req) => {
      req.continue((res) => {
        interceptPersonRecommendCount = interceptPersonRecommendCount + 1;
        if(interceptPersonRecommendCount === 1) {
          console.log("[step] 4")
          res.send({
            statusCode: 200,
            body: {
              requestId: requestId++,
              products: productList,
              quotaBar: {
                current: 8000,
                // 拉霸初始額度
                interval: 100,
                // 拉霸額度間隔
                max: 8880,
                // 拉霸最高額度
                min: 100,
                // 拉霸最低額度
              },
              quotaExpireTime: moment().add(-4,'day').format('YYYY-MM-DD HH:mm:ss'),
              processing: false,
              riskReject: false,
            } as GetPersonalLoanRecommendResponse
          })
        } else if(interceptPersonRecommendCount === 2) {
          console.log("[step] 7")
          res.send({
            statusCode: 200,
            body: {
              requestId: requestId++,
              products: productList,
              quotaBar: {
                current: 7777,
                // 拉霸初始額度
                interval: 100,
                // 拉霸額度間隔
                max: 99999,
                // 拉霸最高額度
                min: 3000,
                // 拉霸最低額度
              },
              quotaExpireTime: moment().add(1,'day').format('YYYY-MM-DD HH:mm:ss'),
              processing: false,
              riskReject: false,
            } as GetPersonalLoanRecommendResponse
          })
        }
      })
    }).as("fetchProducts")

    console.log("[step] 1")

    // NOTE: 等待第 1 次
    cy.wait("@fetchProducts").then(() => {
      if(interceptPersonRecommendCount === 1) {
        console.log("[step] 5")

        // NOTE: THEN 用戶要自己手動刷新。也可不刷新直接借款
        cy.get(".price").contains("8000")
        cy.get(".button-container").contains("Re-Acquire The Loan Amount")
      } else if(interceptPersonRecommendCount === 2) {
        // NOTE: 這邊不會監聽到
        // console.log("[step] 8")
        // cy.get(".price").contains("2000")
        // cy.get(".title").contains("LIMITED TIME OFFER COUNTDOWN :")
      }
    })

    console.log("[step] 2")

    // NOTE: 先執行 intercept, 所以 requestId === 1
    cy
      .intercept("/api/v2/loan/quota/refresh", {
        statusCode: 200,
        body: {
          requestId: requestId++,
          effective:	true,
          // 用户额度是否有效
          quotaExpireTime: moment().add(1,'day').format('YYYY-MM-DD HH:mm:ss'),
          // 用户额度有效时间
        } as PostLoanQuotaRefreshResponse
      }).then(() => {
        console.log("[step] 6")
        cy.get(".button-container button").click();
        cy.get(".button-container > button > div").should("have.class", "loadingio-spinner-spinner-e19blwp8l9");
        // cy.get(".button-container > button").should("have.class", "sc-hZgfyJ");
      })

    console.log("[step] 3")

    // NOTE: 等待第 2 次
    cy.wait("@fetchProducts").then(() => {
      if(interceptPersonRecommendCount === 1) {
        // NOTE: 這邊不會監聽到
        // console.log("[step] 7")
        // cy.get(".price").contains("8000")
        // cy.get(".button-container").contains("Re-Acquire The Loan Amount")
      } else if(interceptPersonRecommendCount === 2) {
        console.log("[step] 8")
        cy.get(".title").contains("LIMITED TIME OFFER COUNTDOWN :")
        cy.get(".price").contains("7777")
        // NOTICE: THEN: 用戶應該能 Apply。
        cy.get("button").should("have.class", "能借款");
      }
    })


  });

  it("[OK] 用戶有正在審核的訂單", () => {
    // NOTICE: GIVEN 用戶有正在審核的訂單
    // NOTICE: THEN 畫面顯示正在審核請稍候

    // NOTICE: GIVEN 用戶有正在審核的訂單
    cy.intercept("/api/v2/product/personal-recommend?count=", {
      statusCode: 200,
      body: {
        products: productList,
        quotaBar: {
          current: 2000,
          // 拉霸初始額度
          interval: 100,
          // 拉霸額度間隔
          max: 8880,
          // 拉霸最高額度
          min: 100,
          // 拉霸最低額度
        },
        quotaExpireTime: moment().add(1,'day').format('YYYY-MM-DD HH:mm:ss'),
        processing: true,
        riskReject: false,
      } as GetPersonalLoanRecommendResponse
    }).then(() => {
      // NOTICE: THEN 畫面顯示正在審核請稍候
      cy.get(".title").contains("Your loan application has been submitted.");
      cy.get(".p1").contains("Please do not resubmit and wait patiently.");
    })

  })

  it("用戶風控被拒。顯示對應回饋畫面", () => {
    // NOTICE: GIVEN 用戶風控被拒
    // NOTICE: THEN 顯示對應回饋畫面

    // NOTICE: GIVEN 用戶風控被拒
    cy.intercept("/api/v2/product/personal-recommend?count=", {
      statusCode: 200,
      body: {
        products: productList,
        quotaBar: {
          current: 2000,
          // 拉霸初始額度
          interval: 100,
          // 拉霸額度間隔
          max: 8880,
          // 拉霸最高額度
          min: 100,
          // 拉霸最低額度
        },
        quotaExpireTime: moment().add(1,'day').format('YYYY-MM-DD HH:mm:ss'),
        processing: true,
        riskReject: true,
      } as GetPersonalLoanRecommendResponse
    }).then(() => {
      // NOTICE: THEN 顯示對應回饋畫面
      cy.get(".overdue").contains("Your current discount limit has been exhausted We are reviewing the amount you can borrow for you, please wait patiently for 30 seconds to two minutes.");
      cy.get(".overdue").contains("To avoid errors, we recommended that you stay on this screen.");
    })


  });

  it("用戶再過一陣子就到期", () => {
    // NOTICE: GIVEN 用戶再過一陣子就到期
    cy.intercept("/api/v2/product/personal-recommend?count=", {
      statusCode: 200,
      body: {
        products: productList,
        quotaBar: {
          current: 2000,
          // 拉霸初始額度
          interval: 100,
          // 拉霸額度間隔
          max: 8880,
          // 拉霸最高額度
          min: 100,
          // 拉霸最低額度
        },
        quotaExpireTime: moment().add(5,'second').format('YYYY-MM-DD HH:mm:ss'),
        processing: false,
        riskReject: false,
      } as GetPersonalLoanRecommendResponse
    }).then(() => {
      // cy.get(".overdue").contains("Your current discount limit has been exhausted We are reviewing the amount you can borrow for you, please wait patiently for 30 seconds to two minutes.");
      // cy.get(".overdue").contains("To avoid errors, we recommended that you stay on this screen.");
    })

    cy.intercept("/api/v2/product/apply", (req) => {
      console.log("req", req);
      req.continue((res) => {
        console.log("res", res);
        const stubResponse: PostApplyProductRequest = {
          applyQuota: 1000,
          productIds: [1, 2, 3]
        }
        res.send(stubResponse);
      })
    })

  })


})
