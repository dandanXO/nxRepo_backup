import { getGreeting } from '../support/app.po';
import {GetPersonalLoanRecommendResponse, RecommendProduct} from "../../../mobile/src/app/api/GetPersonalLoanRecommend";
import moment from "moment-timezone";
import {PostLoanQuotaRefreshResponse} from "../../../mobile/src/app/api/PostLoanQuotaRefreshResponse";

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
    cy.viewport('iphone-3')
    cy.visit("/product-ad-modal-list");
    // cy.intercept("**.sentry.io**", {
    //   statusCode: 200,
    // })
  })

  afterEach(() => {
    // cy.screenshot();
  })

  it("無額度，無風控到期", () => {
    const responseData: GetPersonalLoanRecommendResponse = {
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
    } ;

    cy.intercept("/api/v2/product/personal-recommend?count=", {
      statusCode: 200,
      body: {
        ...responseData,
      }
    }).then(() => {
      cy.get(".title").contains("LIMITED TIME OFFER COUNTDOWN :")
    })


  });

  it.skip("無額度，有風控到期，風控在七天內到期。自動幫用戶刷新", () => {
    const responseData: GetPersonalLoanRecommendResponse = {
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
    } ;

    cy.intercept("/api/v2/product/personal-recommend?count=", {
      statusCode: 200,
      body: {
        ...responseData,
      }
    }).then(() => {
      // cy.get(".button-container").contains("Re-Acquire The Loan Amount")
      cy.get(".button-container > button > div").should("have.class", "loadingio-spinner-spinner-e19blwp8l9")
    }).as("loadList");

    // cy.wait("@loadList");

    cy.wait(25 * 1000);

    // NOTICE: 模擬拿到新的風控資料了
    const responseData2: PostLoanQuotaRefreshResponse = {
      effective:	true,
      // 用户额度是否有效

      quotaExpireTime: moment().add(1,'day').format('YYYY-MM-DD HH:mm:ss'),
      // 用户额度有效时间
    }

    cy.intercept("/api/v2/loan/quota/refresh", {
      statusCode: 200,
      body: {
        ...responseData2
      }
    }).then(() => {
      cy.get(".title").contains("LIMITED TIME OFFER COUNTDOWN :")
    }).as("loadList2");

  });

  it("有額度，無風控到期", () => {
    const responseData: GetPersonalLoanRecommendResponse = {
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
    } ;

    cy.intercept("/api/v2/product/personal-recommend?count=", {
      statusCode: 200,
      body: {
        ...responseData,
      }
    }).then(() => {
      cy.get(".price").contains("2000")
      cy.get(".title").contains("LIMITED TIME OFFER COUNTDOWN :")
    })
  });

  it("有額度，有風控到期，風控到期已超過七天，不幫用戶自動刷新", () => {
    const responseData: GetPersonalLoanRecommendResponse = {
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
    } ;

    cy.intercept("/api/v2/product/personal-recommend?count=", {
      statusCode: 200,
      body: {
        ...responseData,
      }
    }).then(() => {
      cy.get(".price").contains("8000")
      cy.get(".button-container").contains("Re-Acquire The Loan Amount")
    })

  });


})
