import {GetLoanRecordListReponse} from "../../../app/src/app/api/loanService/GetLoanRecordListReponse";

describe("RepaymentPage", () => {
  beforeEach(() => {
    // NOTE: figma 360, 640
    cy.viewport(360, 640);
  })

  afterEach(() => {
    //
  })

  it("Unpaid", () => {
    const getLoanRecordListResponse: GetLoanRecordListReponse & {isMock: boolean}= {
      isMock: true,
      "content": [
        {
          "productName": "AA LOAN",
          "orderNo": "no-24974371302963554",
          "orderAmount": 3000.00,
          "loanAmount": 1800.00,
          "paidAmount": 0,
          "repayRecords": [],
          "approveRecords": [
            {
              "title": "Successfully loan",
              "content": "Your application has been completed and the payment date is 2023-05-23。",
              "createTime": "2023-05-17 15:06:51"
            },
            {
              "title": "Examination approved",
              "content": "In lending, it is expected to arrive at you within 2 hours  CBF Bankwhich bank account suffix is: 4144.",
              "createTime": "2023-05-17 15:06:21"
            },
            {
              "title": "Application submitted successfully",
              "content": "The order you apply has been submitted successfully, please wait patiently for the examina.",
              "createTime": "2023-05-17 09:29:41"
            },
            {
              "title": "Application Being Examined",
              "content": "The order is under examination. Please keep the phone open and answer the phone.",
              "createTime": "2023-05-17 09:29:41"
            }
          ],
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
          "extension": false,
          "overdue": false,
          "overdueDays": 0,
          "originalDueDate": null,
          "extendDate": null,
          "bankCardNo": "1111****4144",
          "customerServiceTime": "08:00 - 19:00",
          "customerServiceEmail": "csemail@test.copm",
          "iconUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/icon_logo/8285186.png",
          "detailH5lUrl": "https://frontend.india-api-dev.com/v2/repayment-detail?token=a6c4ec38dcb04ab28b6b4dd665440eec&orderNo=no-24974371302963554",
          "chargeFeeDetail": {
            "title": "Detail",
            "totalSum": 1200,
            "items": [
              {
                "itemName": "Service Charge",
                "key": "SERVICE_FEE",
                "value": "181",
                "fieldType": "CURRENCY"
              },
              {
                "itemName": "Processing Fee",
                "key": "PROCESSING_FEE",
                "value": "902",
                "fieldType": "CURRENCY"
              },
              {
                "itemName": "Interest",
                "key": "LOAN_INTEREST",
                "value": "123",
                "fieldType": "CURRENCY"
              }
            ]
          }
        },
        {
          "productName": "MM LOAN",
          "orderNo": "no-24974371329589560",
          "orderAmount": 3000.00,
          "loanAmount": 1800.00,
          "paidAmount": 3003.00,
          "repayRecords": [
            {
              "repayDate": "2023-05-18",
              "repayAmount": 3003.00,
              "repayType": "Overdue full repayment"
            }
          ],
          "approveRecords": [
            {
              "title": "Order settled",
              "content": "Order repaid, have a good day.",
              "createTime": "2023-05-18 18:56:34"
            },
            {
              "title": "GeneratedRepayment order",
              "content": "Successful repayment initiated (repayment order number:ORR202305181856065350012），Please follow the instructions on the page to complete the repayment",
              "createTime": "2023-05-18 18:56:06"
            },
            {
              "title": "Successfully loan",
              "content": "Your application has been completed and the payment date is 2023-05-17。",
              "createTime": "2023-05-17 15:06:51"
            },
            {
              "title": "Examination approved",
              "content": "In lending, it is expected to arrive at you within 2 hours  CBF Bankwhich bank account suffix is: 4144.",
              "createTime": "2023-05-17 15:06:20"
            },
            {
              "title": "Application submitted successfully",
              "content": "The order you apply has been submitted successfully, please wait patiently for the examina.",
              "createTime": "2023-05-17 09:29:41"
            },
            {
              "title": "Application Being Examined",
              "content": "The order is under examination. Please keep the phone open and answer the phone.",
              "createTime": "2023-05-17 09:29:41"
            }
          ],
          "totalDueAmount": 3011,
          "totalRepayAmount": 3003,
          "balance": 8.00,
          "extensionFee": null,
          "status": "UNPAID",
          "serviceCharge": 1200.00,
          "dailyFee": 10.65,
          "reductionAmount": 0,
          "penaltyInterest": 0.00,
          "applyDate": "2023-05-17",
          "loanDate": "2023-05-17",
          "dueDate": "2023-05-29",
          "extension": false,
          "overdue": false,
          "overdueDays": 0,
          "originalDueDate": null,
          "extendDate": null,
          "bankCardNo": "1111****4144",
          "customerServiceTime": "08:00 - 19:00",
          "customerServiceEmail": "service@gmail.com",
          "iconUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-4424980256908184.png",
          "detailH5lUrl": "https://frontend.india-api-dev.com/v2/repayment-detail?token=a6c4ec38dcb04ab28b6b4dd665440eec&orderNo=no-24974371329589560",
          "chargeFeeDetail": {
            "title": "Detail",
            "totalSum": 1200,
            "items": [
              {
                "itemName": "Service Charge",
                "key": "SERVICE_FEE",
                "value": "181",
                "fieldType": "CURRENCY"
              },
              {
                "itemName": "Processing Fee",
                "key": "PROCESSING_FEE",
                "value": "902",
                "fieldType": "CURRENCY"
              },
              {
                "itemName": "Interest",
                "key": "LOAN_INTEREST",
                "value": "120",
                "fieldType": "CURRENCY"
              }
            ]
          }
        },
        {
          "productName": "tweak",
          "orderNo": "no-24974371376746630",
          "orderAmount": 3000.00,
          "loanAmount": 1800.00,
          "paidAmount": 0,
          "repayRecords": [],
          "approveRecords": [
            {
              "title": "Successfully loan",
              "content": "Your application has been completed and the payment date is 2023-05-29。",
              "createTime": "2023-05-17 15:06:41"
            },
            {
              "title": "Examination approved",
              "content": "In lending, it is expected to arrive at you within 2 hours  CBF Bankwhich bank account suffix is: 4144.",
              "createTime": "2023-05-17 15:06:20"
            },
            {
              "title": "Application submitted successfully",
              "content": "The order you apply has been submitted successfully, please wait patiently for the examina.",
              "createTime": "2023-05-17 09:29:41"
            },
            {
              "title": "Application Being Examined",
              "content": "The order is under examination. Please keep the phone open and answer the phone.",
              "createTime": "2023-05-17 09:29:41"
            }
          ],
          "totalDueAmount": 3011,
          "totalRepayAmount": 0,
          "balance": 3011,
          "extensionFee": null,
          "status": "UNPAID",
          "serviceCharge": 1200.00,
          "dailyFee": 10.65,
          "reductionAmount": 0,
          "penaltyInterest": 0.00,
          "applyDate": "2023-05-17",
          "loanDate": "2023-05-17",
          "dueDate": "2023-05-29",
          "extension": false,
          "overdue": false,
          "overdueDays": 0,
          "originalDueDate": null,
          "extendDate": null,
          "bankCardNo": "1111****4144",
          "customerServiceTime": "08:00 - 19:00",
          "customerServiceEmail": "service@gmail.com",
          "iconUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-5620348987342192.png",
          "detailH5lUrl": "https://frontend.india-api-dev.com/v2/repayment-detail?token=a6c4ec38dcb04ab28b6b4dd665440eec&orderNo=no-24974371376746630",
          "chargeFeeDetail": {
            "title": "Detail",
            "totalSum": 1200,
            "items": [
              {
                "itemName": "Service Charge",
                "key": "SERVICE_FEE",
                "value": "183",
                "fieldType": "CURRENCY"
              },
              {
                "itemName": "Processing Fee",
                "key": "PROCESSING_FEE",
                "value": "904",
                "fieldType": "CURRENCY"
              },
              {
                "itemName": "Interest",
                "key": "LOAN_INTEREST",
                "value": "125",
                "fieldType": "CURRENCY"
              }
            ]
          }
        },
        {
          "productName": "CC LOAN",
          "orderNo": "no-24974371428326396",
          "orderAmount": 3000.00,
          "loanAmount": 1800.00,
          "paidAmount": 0,
          "repayRecords": [],
          "approveRecords": [
            {
              "title": "Successfully loan",
              "content": "Your application has been completed and the payment date is 2023-05-23。",
              "createTime": "2023-05-17 15:06:50"
            },
            {
              "title": "Examination approved",
              "content": "In lending, it is expected to arrive at you within 2 hours  CBF Bankwhich bank account suffix is: 4144.",
              "createTime": "2023-05-17 15:06:20"
            },
            {
              "title": "Application submitted successfully",
              "content": "The order you apply has been submitted successfully, please wait patiently for the examina.",
              "createTime": "2023-05-17 09:29:41"
            },
            {
              "title": "Application Being Examined",
              "content": "The order is under examination. Please keep the phone open and answer the phone.",
              "createTime": "2023-05-17 09:29:41"
            }
          ],
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
          "extension": false,
          "overdue": false,
          "overdueDays": 0,
          "originalDueDate": null,
          "extendDate": null,
          "bankCardNo": "1111****4144",
          "customerServiceTime": "08:00 - 19:00",
          "customerServiceEmail": "csemail@test.copm",
          "iconUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/icon_logo/8285116.png",
          "detailH5lUrl": "https://frontend.india-api-dev.com/v2/repayment-detail?token=a6c4ec38dcb04ab28b6b4dd665440eec&orderNo=no-24974371428326396",
          "chargeFeeDetail": {
            "title": "Detail",
            "totalSum": 1200,
            "items": [
              {
                "itemName": "Service Charge",
                "key": "SERVICE_FEE",
                "value": "186",
                "fieldType": "CURRENCY"
              },
              {
                "itemName": "Processing Fee",
                "key": "PROCESSING_FEE",
                "value": "907",
                "fieldType": "CURRENCY"
              },
              {
                "itemName": "Interest",
                "key": "LOAN_INTEREST",
                "value": "128",
                "fieldType": "CURRENCY"
              }
            ]
          }
        },
        {
          "productName": "ZZZ LOAN",
          "orderNo": "no-24974371455735498",
          "orderAmount": 3000.00,
          "loanAmount": 1800.00,
          "paidAmount": 0,
          "repayRecords": [],
          "approveRecords": [
            {
              "title": "Successfully loan",
              "content": "Your application has been completed and the payment date is 2023-06-05。",
              "createTime": "2023-05-17 15:06:50"
            },
            {
              "title": "Examination approved",
              "content": "In lending, it is expected to arrive at you within 2 hours  CBF Bankwhich bank account suffix is: 4144.",
              "createTime": "2023-05-17 15:06:19"
            },
            {
              "title": "Application submitted successfully",
              "content": "The order you apply has been submitted successfully, please wait patiently for the examina.",
              "createTime": "2023-05-17 09:29:41"
            },
            {
              "title": "Application Being Examined",
              "content": "The order is under examination. Please keep the phone open and answer the phone.",
              "createTime": "2023-05-17 09:29:41"
            }
          ],
          "totalDueAmount": 3002,
          "totalRepayAmount": 0,
          "balance": 3002,
          "extensionFee": null,
          "status": "UNPAID",
          "serviceCharge": 1200.00,
          "dailyFee": 1.77,
          "reductionAmount": 0,
          "penaltyInterest": 0.00,
          "applyDate": "2023-05-17",
          "loanDate": "2023-05-17",
          "dueDate": "2023-05-29",
          "extension": false,
          "overdue": false,
          "overdueDays": 0,
          "originalDueDate": null,
          "extendDate": null,
          "bankCardNo": "1111****4144",
          "customerServiceTime": "08:00 - 19:00",
          "customerServiceEmail": "csemail@test.copm",
          "iconUrl": "https://site.india-api-dev.com/resources/product-icon-20848012365246925.png?expires=1711705623&signature=bcdda30dd8affd5da88d52af0591caaf",
          "detailH5lUrl": "https://frontend.india-api-dev.com/v2/repayment-detail?token=a6c4ec38dcb04ab28b6b4dd665440eec&orderNo=no-24974371455735498",
          "chargeFeeDetail": {
            "title": "Detail",
            "totalSum": 1200,
            "items": [
              {
                "itemName": "Service Charge",
                "key": "SERVICE_FEE",
                "value": "180",
                "fieldType": "CURRENCY"
              },
              {
                "itemName": "Processing Fee",
                "key": "PROCESSING_FEE",
                "value": "900",
                "fieldType": "CURRENCY"
              },
              {
                "itemName": "Interest",
                "key": "LOAN_INTEREST",
                "value": "120",
                "fieldType": "CURRENCY"
              }
            ]
          }
        },
        {
          "productName": "QOO",
          "orderNo": "no-24974371481900804",
          "orderAmount": 3000.00,
          "loanAmount": 1800.00,
          "paidAmount": 0,
          "repayRecords": [],
          "approveRecords": [
            {
              "title": "Successfully loan",
              "content": "Your application has been completed and the payment date is 2023-05-23。",
              "createTime": "2023-05-17 15:06:49"
            },
            {
              "title": "Examination approved",
              "content": "In lending, it is expected to arrive at you within 2 hours  CBF Bankwhich bank account suffix is: 4144.",
              "createTime": "2023-05-17 15:06:19"
            },
            {
              "title": "Application submitted successfully",
              "content": "The order you apply has been submitted successfully, please wait patiently for the examina.",
              "createTime": "2023-05-17 09:29:41"
            },
            {
              "title": "Application Being Examined",
              "content": "The order is under examination. Please keep the phone open and answer the phone.",
              "createTime": "2023-05-17 09:29:41"
            }
          ],
          "totalDueAmount": 3004,
          "totalRepayAmount": 0,
          "balance": 3004,
          "extensionFee": null,
          "status": "UNPAID",
          "serviceCharge": 1200.00,
          "dailyFee": 3.54,
          "reductionAmount": 0,
          "penaltyInterest": 0.00,
          "applyDate": "2023-05-17",
          "loanDate": "2023-05-17",
          "dueDate": "2023-05-29",
          "extension": false,
          "overdue": false,
          "overdueDays": 0,
          "originalDueDate": null,
          "extendDate": null,
          "bankCardNo": "1111****4144",
          "customerServiceTime": "08:00 - 21:00",
          "customerServiceEmail": "jojo@gmail.com",
          "iconUrl": "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-7523112347980214.png",
          "detailH5lUrl": "https://frontend.india-api-dev.com/v2/repayment-detail?token=a6c4ec38dcb04ab28b6b4dd665440eec&orderNo=no-24974371481900804",
          "chargeFeeDetail": {
            "title": "Detail",
            "totalSum": 1200,
            "items": [
              {
                "itemName": "Service Charge",
                "key": "SERVICE_FEE",
                "value": "181",
                "fieldType": "CURRENCY"
              },
              {
                "itemName": "Processing Fee",
                "key": "PROCESSING_FEE",
                "value": "902",
                "fieldType": "CURRENCY"
              },
              {
                "itemName": "Interest",
                "key": "LOAN_INTEREST",
                "value": "123",
                "fieldType": "CURRENCY"
              }
            ]
          }
        }
      ],
      "pageable": {
        "sort": [],
        "offset": 0,
        "pageNumber": 0,
        "pageSize": 500,
        "unpaged": false,
        "paged": true
      },
      "last": true,
      "totalPages": 1,
      "totalElements": 6,
      "number": 0,
      "sort": [],
      "size": 500,
      "first": true,
      "numberOfElements": 6,
      "empty": false
    }

    cy.intercept("get", "/api/v3/loan/records?pageNumber=0&pageSize=500&status=UNPAID", {
      statusCode: 200,
      body: getLoanRecordListResponse,
    }).as("getLoanRecordList").then(() => {
      console.log("getLoanRecordList");
    })


    cy.visit("/v2/repayment?token=30c79de48cb84ea88bf304a47db90d53", {

    })

  })

})
