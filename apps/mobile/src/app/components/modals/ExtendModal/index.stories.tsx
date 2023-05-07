import { ComponentMeta, ComponentStory } from "@storybook/react";
import ExtendModal from "./ExtendModal";
import { AppThemeProvider } from "@frontend/mobile/shared/ui";
import { mockGetLoanDetailResponse } from "../../../api/getLoanDetail";
import * as React from "react";

export default {
    title: "Modal/ExtendModal",
    component: ExtendModal,
} as ComponentMeta<typeof ExtendModal>;

export const Template: ComponentStory<typeof ExtendModal> = () => {
    return (
        <AppThemeProvider>
            <ExtendModal
                repayConfirmDetail={mockGetLoanDetailResponse}
                setShowExtendModal={() => {
                    // do nothing.
                }}
                handlePostRepayCreate={() => {
                    // do nothing.
                }}
            />
        </AppThemeProvider>
    );
};

const data = {
    productName: "DD LOAN",
    orderNo: "no-7864747613693247",
    loanAmount: 9000,
    paidAmount: 0,
    repayRecords: [],
    totalDueAmount: 12600,
    balance: 12600,
    extensionFee: null,
    status: "OVERDUE",
    serviceCharge: 3960,
    dailyFee: 0,
    reductionAmount: 0,
    penaltyInterest: 3600,
    applyDate: "2022-08-08",
    dueDate: "2022-08-13",
    originalDueDate: null,
    extendDate: null,
    bankCardNo: "60159710853",
    customerServiceTime: "08:00AM ~ 7:00PM",
    customerServiceEmail: "csemail@test.copm",
    iconUrl:
        "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/icon_logo/yao.png",
    extendable: false,
    extended: false,
    parentOrderNo: null,
    chargeFeeDetail: {
        title: "detail",
        items: [
            {
                itemName: "Loan Amount",
                key: "LOAN_AMOUNT",
                value: "9000",
                fieldType: "CURRENCY",
            },
            {
                itemName: "Daily Fee",
                key: "DAILY_FEE",
                value: "0",
                fieldType: "CURRENCY",
            },
            {
                itemName: "GST",
                key: "GST",
                value: "0",
                fieldType: "CURRENCY",
            },
            {
                itemName: "LOAN INTEREST",
                key: "LOAN_INTEREST",
                value: "0",
                fieldType: "CURRENCY",
            },
            {
                itemName: "REDUCTION AMOUNT",
                key: "REDUCTION_AMOUNT",
                value: "0",
                fieldType: "CURRENCY",
            },
            {
                itemName: "PENALTY INTEREST",
                key: "PENALTY_INTEREST",
                value: "3600",
                fieldType: "CURRENCY",
            },
        ],
    },
    repayConfirmDetail: {
        balance: 12600,
        paidAmount: 0,
        penaltyInterest: 3600,
        reductionAmount: 0,
        extensionFee: 0,
        extensionPayAmount: 3600,
        extendDate: "2022-08-29",
    },
    recommendProducts: [
        {
            productId: 3,
            logoUrl:
                "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/icon_logo/8285186.png",
            productName: "AA LOAN",
            loanQuota: "160-9000",
            term: "10Days",
            interestRate: "10~40%",
            approvedRate: "70 ~ 95%",
            approvedTime: "< 3 Min",
            tags: ["best", " hot", " lower rate"],
            csTime: "08:00AM ~ 7:00PM",
            csEmail: "csemail@test.copm",
            privacyUrl: "https://site.india-api-dev.com/api/v2/html/privacy",
            termUrl: "https://site.india-api-dev.com/api/v2/html/agreement",
            disclosureUrl:
                "https://site.india-api-dev.com/api/v2/html/disclosure",
            agreementUrl:
                "https://site.india-api-dev.com/api/v2/html/agreement",
            top: true,
            sort: 0,
            backgroundUrl:
                "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/icon_logo/bg1.jpg",
        },
        {
            productId: 4,
            logoUrl:
                "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/icon_logo/8285141.png",
            productName: "BB LOAN",
            loanQuota: "150-4500",
            term: "9Days",
            interestRate: "20~30%",
            approvedRate: "40~80%",
            approvedTime: "< 4 Min",
            tags: ["blah blah", " richpapa", " best of best"],
            csTime: "08:00AM ~ 7:00PM",
            csEmail: "csemail@test.copm",
            privacyUrl: "https://site.india-api-dev.com/api/v2/html/privacy",
            termUrl: "https://site.india-api-dev.com/api/v2/html/agreement",
            disclosureUrl:
                "https://site.india-api-dev.com/api/v2/html/disclosure",
            agreementUrl:
                "https://site.india-api-dev.com/api/v2/html/agreement",
            top: true,
            sort: 1,
            backgroundUrl:
                "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/icon_logo/bg1.jpg",
        },
        {
            productId: 5,
            logoUrl:
                "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/icon_logo/8285116.png",
            productName: "CC LOAN",
            loanQuota: "200-3000",
            term: "81Days",
            interestRate: "40~50%",
            approvedRate: "50-70%",
            approvedTime: "< 6 Min",
            tags: ["good", " greate", " fatest"],
            csTime: "08:00AM ~ 7:00PM",
            csEmail: "csemail@test.copm",
            privacyUrl: "https://site.india-api-dev.com/api/v2/html/privacy",
            termUrl: "https://site.india-api-dev.com/api/v2/html/agreement",
            disclosureUrl:
                "https://site.india-api-dev.com/api/v2/html/disclosure",
            agreementUrl:
                "https://site.india-api-dev.com/api/v2/html/agreement",
            top: false,
            sort: 2,
            backgroundUrl:
                "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/icon_logo/bg1.jpg",
        },
        {
            productId: 6,
            logoUrl:
                "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/icon_logo/8285099.png",
            productName: "EE LOAN",
            loanQuota: "3000 up",
            term: "2Weeks",
            interestRate: "30-45%",
            approvedRate: "15-50%",
            approvedTime: "< 2 Min",
            tags: ["haha", " jojo", " coco"],
            csTime: "08:00AM ~ 7:00PM",
            csEmail: "csemail@test.copm",
            privacyUrl: "https://site.india-api-dev.com/api/v2/html/privacy",
            termUrl: "https://site.india-api-dev.com/api/v2/html/agreement",
            disclosureUrl:
                "https://site.india-api-dev.com/api/v2/html/disclosure",
            agreementUrl:
                "https://site.india-api-dev.com/api/v2/html/agreement",
            top: false,
            sort: 3,
            backgroundUrl:
                "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/icon_logo/bg1.jpg",
        },
    ],
    repayTypes: [
        {
            payType: "dummyPay",
            payTypeAlias: "dummyPay",
            payPlats: [
                {
                    platName: "DummyPay",
                    platClass: "dummyPay",
                },
            ],
        },
    ],
};
