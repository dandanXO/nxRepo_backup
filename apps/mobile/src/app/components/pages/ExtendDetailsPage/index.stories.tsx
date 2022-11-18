import { ComponentMeta, ComponentStory } from "@storybook/react";
import PureLoanDetails from "../../components/PureLoanDetails";
import React from "react";
import {AppThemeProvider} from "../../../../../../../libs/mobile/shared/ui/src";

export default {
    title: "Page/ExtendDetailsPage",
    component: PureLoanDetails,
} as ComponentMeta<typeof PureLoanDetails>;


const currentData = {
  "productName":"ZZ LOAN",
  "orderNo":"no-3632791101642108-7",
  "loanAmount":1620,
  "paidAmount":0,
  "repayRecords":[

  ],
  "totalDueAmount":34945,
  "balance":0,
  "extensionFee":1350,
  "status":"EXTEND",
  "serviceCharge":300,
  "dailyFee":58.17,
  "reductionAmount":0,
  "penaltyInterest":32967,
  "applyDate":"2022-07-19",
  "dueDate":"2022-07-24",
  "overdue":true,
  "originalDueDate":"2022-07-24",
  "extendDate":"2022-07-19",
  "bankCardNo":"60159710853",
  "customerServiceTime":"08:00 - 19:00",
  "customerServiceEmail":"csemail@test.copm",
  "iconUrl":"https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-7458476046722215.png",
  "extendable":false,
  "extended":true,
  "parentOrderNo":"no-3632791101642108",
  "chargeFeeDetail":{
    "title":"Detail",
    "totalSum":34945,
    "items":[
      {
        "itemName":"Loan Amount",
        "key":"LOAN_AMOUNT",
        "value":"1620",
        "fieldType":"CURRENCY"
      },
      {
        "itemName":"Daily Fee",
        "key":"DAILY_FEE",
        "value":"58",
        "fieldType":"CURRENCY"
      },
      {
        "itemName":"Service Fee",
        "key":"SERVICE_FEE",
        "value":"261",
        "fieldType":"CURRENCY"
      },
      {
        "itemName":"GST",
        "key":"GST",
        "value":"18",
        "fieldType":"CURRENCY"
      },
      {
        "itemName":"Loan Interest",
        "key":"LOAN_INTEREST",
        "value":"21",
        "fieldType":"CURRENCY"
      },
      {
        "itemName":"Reduction Amount",
        "key":"REDUCTION_AMOUNT",
        "value":"0",
        "fieldType":"CURRENCY"
      },
      {
        "itemName":"Penalty Interest",
        "key":"PENALTY_INTEREST",
        "value":"32967",
        "fieldType":"CURRENCY"
      }
    ]
  },
  "repayConfirmDetail":null,
  "recommendProducts":[
    {
      "productId":21,
      "logoUrl":"https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-5190775187383637.png",
      "productName":"m1 loan 貸",
      "loanQuota":"4000-5000",
      "term":"8-9Days",
      "interestRate":"6 - 7% / day",
      "approvedRate":"10%",
      "approvedTime":"5 mins",
      "tags":[
        "小額",
        "借貸",
        "快速"
      ],
      "csTime":"08:00 - 19:00",
      "csEmail":"service@gmail.com",
      "privacyUrl":"https://site.india-api-dev.com/api/v2/html/privacy?productId=21&sign=0baf31abf6806f5158c92e707bb4c2fba912e932f7af57b875dcc7ed40617919d9c47359436de4f47d071a40b98abe14",
      "disclosureUrl":"https://site.india-api-dev.com/api/v2/html/disclosure?productId=21&sign=0baf31abf6806f5158c92e707bb4c2fba912e932f7af57b875dcc7ed40617919d9c47359436de4f47d071a40b98abe14",
      "agreementUrl":"https://site.india-api-dev.com/api/v2/html/agreement?productId=21&sign=0baf31abf6806f5158c92e707bb4c2fba912e932f7af57b875dcc7ed40617919d9c47359436de4f47d071a40b98abe14",
      "top":false,
      "sort":3,
      "backgroundUrl":"https://tinyurl.com/2ht8k5jc"
    },
    {
      "productId":6,
      "logoUrl":"https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/icon_logo/8285099.png",
      "productName":"EE LOAN",
      "loanQuota":"3000-4000",
      "term":"10-21 Days",
      "interestRate":"30 - 45% / day",
      "approvedRate":"0.01%",
      "approvedTime":"2 Mins",
      "tags":[
        "haha",
        " jojo",
        " coco"
      ],
      "csTime":"08:00 - 19:00",
      "csEmail":"csemail@test.copm",
      "privacyUrl":"https://site.india-api-dev.com/api/v2/html/privacy?productId=6&sign=0baf31abf6806f5158c92e707bb4c2fba912e932f7af57b875dcc7ed40617919d9c47359436de4f47d071a40b98abe14",
      "disclosureUrl":"https://site.india-api-dev.com/api/v2/html/disclosure?productId=6&sign=0baf31abf6806f5158c92e707bb4c2fba912e932f7af57b875dcc7ed40617919d9c47359436de4f47d071a40b98abe14",
      "agreementUrl":"https://site.india-api-dev.com/api/v2/html/agreement?productId=6&sign=0baf31abf6806f5158c92e707bb4c2fba912e932f7af57b875dcc7ed40617919d9c47359436de4f47d071a40b98abe14",
      "top":false,
      "sort":6,
      "backgroundUrl":"https://tinyurl.com/2gvzawel"
    },
    {
      "productId":32,
      "logoUrl":"https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-7523112347980214.png",
      "productName":"QOO",
      "loanQuota":"5000-8000",
      "term":"30-90Days",
      "interestRate":"7 - 10% / day",
      "approvedRate":"3%",
      "approvedTime":"1 mins",
      "tags":[
        "hot"
      ],
      "csTime":"08:00 - 19:00",
      "csEmail":"jojo@gmail.com",
      "privacyUrl":"https://site.india-api-dev.com/api/v2/html/privacy?productId=32&sign=0baf31abf6806f5158c92e707bb4c2fba912e932f7af57b875dcc7ed40617919d9c47359436de4f47d071a40b98abe14",
      "disclosureUrl":"https://site.india-api-dev.com/api/v2/html/disclosure?productId=32&sign=0baf31abf6806f5158c92e707bb4c2fba912e932f7af57b875dcc7ed40617919d9c47359436de4f47d071a40b98abe14",
      "agreementUrl":"https://site.india-api-dev.com/api/v2/html/agreement?productId=32&sign=0baf31abf6806f5158c92e707bb4c2fba912e932f7af57b875dcc7ed40617919d9c47359436de4f47d071a40b98abe14",
      "top":true,
      "sort":0,
      "backgroundUrl":"https://tinyurl.com/2ht8k5jc"
    },
    {
      "productId":17,
      "logoUrl":"https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-4419586691995204.png",
      "productName":"YY LOAN",
      "loanQuota":"4-5",
      "term":"8-9Days",
      "interestRate":"6 - 7% / day",
      "approvedRate":"1%",
      "approvedTime":"11 mins",
      "tags":[
        "24",
        "25",
        "26"
      ],
      "csTime":"08:00 - 19:00",
      "csEmail":"12@gmail.com",
      "privacyUrl":"https://site.india-api-dev.com/api/v2/html/privacy?productId=17&sign=0baf31abf6806f5158c92e707bb4c2fba912e932f7af57b875dcc7ed40617919d9c47359436de4f47d071a40b98abe14",
      "disclosureUrl":"https://site.india-api-dev.com/api/v2/html/disclosure?productId=17&sign=0baf31abf6806f5158c92e707bb4c2fba912e932f7af57b875dcc7ed40617919d9c47359436de4f47d071a40b98abe14",
      "agreementUrl":"https://site.india-api-dev.com/api/v2/html/agreement?productId=17&sign=0baf31abf6806f5158c92e707bb4c2fba912e932f7af57b875dcc7ed40617919d9c47359436de4f47d071a40b98abe14",
      "top":false,
      "sort":4,
      "backgroundUrl":"https://tinyurl.com/2gvzawel"
    },
    {
      "productId":24,
      "logoUrl":"https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/product/product-icon-5620348987342192.png",
      "productName":"tweak",
      "loanQuota":"4000-5000",
      "term":"8-9Days",
      "interestRate":"6 - 7% / day",
      "approvedRate":"10%",
      "approvedTime":"50 mins",
      "tags":[
        "小額",
        "借貸",
        "快速"
      ],
      "csTime":"08:00 - 19:00",
      "csEmail":"service@gmail.com",
      "privacyUrl":"https://site.india-api-dev.com/api/v2/html/privacy?productId=24&sign=0baf31abf6806f5158c92e707bb4c2fba912e932f7af57b875dcc7ed40617919d9c47359436de4f47d071a40b98abe14",
      "disclosureUrl":"https://site.india-api-dev.com/api/v2/html/disclosure?productId=24&sign=0baf31abf6806f5158c92e707bb4c2fba912e932f7af57b875dcc7ed40617919d9c47359436de4f47d071a40b98abe14",
      "agreementUrl":"https://site.india-api-dev.com/api/v2/html/agreement?productId=24&sign=0baf31abf6806f5158c92e707bb4c2fba912e932f7af57b875dcc7ed40617919d9c47359436de4f47d071a40b98abe14",
      "top":false,
      "sort":10,
      "backgroundUrl":"https://tinyurl.com/2ht8k5jc"
    }
  ]
}
export const Page: ComponentStory<
  typeof PureLoanDetails
  > = () => {
    return (
      <AppThemeProvider>
        <PureLoanDetails
          currentData={currentData}
          navigateToUploadPaymentReceiptPage={
            {}
          }
          handlePostRepayCreate={{}}
        />
      </AppThemeProvider>
    );
};
