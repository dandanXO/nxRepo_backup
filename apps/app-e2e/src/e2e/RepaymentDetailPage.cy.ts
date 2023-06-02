import {GetLoanDetailResponse} from "../../../app/src/app/api/loanService/GetLoanDetailResponse";

describe("RepaymentPage", () => {
  beforeEach(() => {
    // NOTE: figma 360, 640
    cy.viewport(360, 640);
  })

  afterEach(() => {
    //
  })

  it("Unpaid", () => {

    const response: GetLoanDetailResponse & {isMock: boolean} = {
      "isMock": true,
      "productName": "AA LOAN",
      "orderNo": "no-24974371302963554",
      "orderAmount": 3000.00,
      "loanAmount": 1800.00,
      "paidAmount": 0,
      "repayRecords": [],
      "totalDueAmount": 3006,
      "totalRepayAmount": 0,
      "balance": 3006,
      "extensionFee": null,
      "status": "UNPAID",
      "serviceCharge": 1200.00,
      "dailyFee": 5.92,
      "reductionAmount": 0,
      "penaltyInterest": 0.00,
      "applyDate": "2023-05-17",
      "loanDate": "2023-05-17",
      "dueDate": "2023-05-29",
      "overdue": false,
      "overdueDays": 0,
      "originalDueDate": null,
      "extendDate": null,
      "bankCardNo": "1111****4144",
      "customerServiceTime": "08:00 - 19:00",
      "customerServiceEmail": "csemail@test.copm",
      "iconUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/icon_logo/8285186.png",
      "extendable": true,
      "extended": false,
      "parentOrderNo": null,
      "chargeFeeDetail": {
        "title": "Detail",
        "totalSum": 1200,
        "items": [
          {
            "itemName": "Service Charge",
            "key": "SERVICE_FEE",
            "value": "181.01",
            "fieldType": "CURRENCY"
          },
          {
            "itemName": "Processing Fee",
            "key": "PROCESSING_FEE",
            "value": "902.02",
            "fieldType": "CURRENCY"
          },
          {
            "itemName": "Interest",
            "key": "LOAN_INTEREST",
            "value": "123.03",
            "fieldType": "CURRENCY"
          }
        ]
      },
      "repayConfirmDetail": {
        "balance": 3006,
        "paidAmount": 0,
        "penaltyInterest": 0.00,
        "reductionAmount": 0,
        "extensionFee": 900.00,
        "extensionPayAmount": 900.00,
        "extendDate": "2023-06-04"
      },
      "recommendProducts": [
        {
          "productId": 6,
          "logoUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/icon_logo/8285099.png",
          "productName": "EE LOAN",
          "loanQuota": "3000-4000",
          "term": "10-21 Days",
          "interestRate": "30 - 45% / day",
          "approvedRate": "0.01%",
          "approvedTime": "2 Mins",
          "tags": [
            "haha",
            " jojo",
            " coco"
          ],
          "csTime": "10:00 - 20:00",
          "csEmail": "csemail@test.copm",
          "csContact": "098123456",
          "privacyUrl": "https://site.india-api-dev.com/api/v2/html/privacy?productId=6&sign=e910664333ac3e303e7c2d30ca5fc272023b5b528043d35aae89c4b9836ff27e64b933af92015dab94c3f9cbfd350f8a",
          "disclosureUrl": "https://site.india-api-dev.com/api/v2/html/disclosure?productId=6&sign=e910664333ac3e303e7c2d30ca5fc272023b5b528043d35aae89c4b9836ff27e64b933af92015dab94c3f9cbfd350f8a",
          "agreementUrl": "https://site.india-api-dev.com/api/v2/html/agreement?productId=6&sign=e910664333ac3e303e7c2d30ca5fc272023b5b528043d35aae89c4b9836ff27e64b933af92015dab94c3f9cbfd350f8a",
          "top": false,
          "sort": null,
          "backgroundUrl": "https://tinyurl.com/2gvzawel"
        },
        {
          "productId": 21,
          "logoUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-9173524915494780.png",
          "productName": "m1 loan 貸",
          "loanQuota": "4000-5000",
          "term": "8-9Days",
          "interestRate": "6 - 7% / day",
          "approvedRate": "10%",
          "approvedTime": "5 mins",
          "tags": [
            "小額",
            "借貸",
            "快速"
          ],
          "csTime": "08:00 - 19:00",
          "csEmail": "service@gmail.com",
          "csContact": "",
          "privacyUrl": "https://site.india-api-dev.com/api/v2/html/privacy?productId=21&sign=e910664333ac3e303e7c2d30ca5fc272023b5b528043d35aae89c4b9836ff27e64b933af92015dab94c3f9cbfd350f8a",
          "disclosureUrl": "https://site.india-api-dev.com/api/v2/html/disclosure?productId=21&sign=e910664333ac3e303e7c2d30ca5fc272023b5b528043d35aae89c4b9836ff27e64b933af92015dab94c3f9cbfd350f8a",
          "agreementUrl": "https://site.india-api-dev.com/api/v2/html/agreement?productId=21&sign=e910664333ac3e303e7c2d30ca5fc272023b5b528043d35aae89c4b9836ff27e64b933af92015dab94c3f9cbfd350f8a",
          "top": false,
          "sort": null,
          "backgroundUrl": "https://tinyurl.com/2gvzawel"
        },
        {
          "productId": 16,
          "logoUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-4417300771903399.png",
          "productName": "platformABCDE",
          "loanQuota": "3000-4000",
          "term": "8-9Days",
          "interestRate": "6 - 7% / day",
          "approvedRate": "0.1%",
          "approvedTime": "11 mins",
          "tags": [
            "24",
            "25",
            "26"
          ],
          "csTime": "12:00 - 21:00",
          "csEmail": "12@gmail.com",
          "csContact": "",
          "privacyUrl": "https://site.india-api-dev.com/api/v2/html/privacy?productId=16&sign=e910664333ac3e303e7c2d30ca5fc272023b5b528043d35aae89c4b9836ff27e64b933af92015dab94c3f9cbfd350f8a",
          "disclosureUrl": "https://site.india-api-dev.com/api/v2/html/disclosure?productId=16&sign=e910664333ac3e303e7c2d30ca5fc272023b5b528043d35aae89c4b9836ff27e64b933af92015dab94c3f9cbfd350f8a",
          "agreementUrl": "https://site.india-api-dev.com/api/v2/html/agreement?productId=16&sign=e910664333ac3e303e7c2d30ca5fc272023b5b528043d35aae89c4b9836ff27e64b933af92015dab94c3f9cbfd350f8a",
          "top": false,
          "sort": null,
          "backgroundUrl": "https://tinyurl.com/2gvzawel"
        },
        {
          "productId": 20,
          "logoUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-14012225912722385.png",
          "productName": "測試5",
          "loanQuota": "4000-5000",
          "term": "8-9Days",
          "interestRate": "6 - 7% / day",
          "approvedRate": "0.1%",
          "approvedTime": "50 mins",
          "tags": [
            "小額",
            "借貸",
            "快速"
          ],
          "csTime": "08:00 - 19:00",
          "csEmail": "service@gmail.com",
          "csContact": "",
          "privacyUrl": "https://site.india-api-dev.com/api/v2/html/privacy?productId=20&sign=e910664333ac3e303e7c2d30ca5fc272023b5b528043d35aae89c4b9836ff27e64b933af92015dab94c3f9cbfd350f8a",
          "disclosureUrl": "https://site.india-api-dev.com/api/v2/html/disclosure?productId=20&sign=e910664333ac3e303e7c2d30ca5fc272023b5b528043d35aae89c4b9836ff27e64b933af92015dab94c3f9cbfd350f8a",
          "agreementUrl": "https://site.india-api-dev.com/api/v2/html/agreement?productId=20&sign=e910664333ac3e303e7c2d30ca5fc272023b5b528043d35aae89c4b9836ff27e64b933af92015dab94c3f9cbfd350f8a",
          "top": false,
          "sort": null,
          "backgroundUrl": "https://tinyurl.com/2gvzawel"
        },
        {
          "productId": 4,
          "logoUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/icon_logo/8285141.png",
          "productName": "BB LOAN",
          "loanQuota": "12000-20000",
          "term": "9-81 Days",
          "interestRate": "20 - 30% / day",
          "approvedRate": "0.01%",
          "approvedTime": "5 Mins",
          "tags": [
            "blah blah",
            " richpapa",
            " best of best"
          ],
          "csTime": "08:00 - 19:00",
          "csEmail": "csemail@test.copm",
          "csContact": "123123123",
          "privacyUrl": "https://site.india-api-dev.com/api/v2/html/privacy?productId=4&sign=e910664333ac3e303e7c2d30ca5fc272023b5b528043d35aae89c4b9836ff27e64b933af92015dab94c3f9cbfd350f8a",
          "disclosureUrl": "https://site.india-api-dev.com/api/v2/html/disclosure?productId=4&sign=e910664333ac3e303e7c2d30ca5fc272023b5b528043d35aae89c4b9836ff27e64b933af92015dab94c3f9cbfd350f8a",
          "agreementUrl": "https://site.india-api-dev.com/api/v2/html/agreement?productId=4&sign=e910664333ac3e303e7c2d30ca5fc272023b5b528043d35aae89c4b9836ff27e64b933af92015dab94c3f9cbfd350f8a",
          "top": true,
          "sort": null,
          "backgroundUrl": "https://tinyurl.com/2ht8k5jc"
        }
      ]
    }

    cy.intercept("get", "/api/v2/loan/detail?orderNo=", {
      statusCode: 200,
      body: response,
    }).as("getLoanRecordList").then(() => {
      console.log("getLoanRecordList");
    })


    cy.visit("/v2/repayment-detail?token=30c79de48cb84ea88bf304a47db90d53", {

    })

  })

})
