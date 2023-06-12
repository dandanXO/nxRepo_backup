import { i18nComponent } from "../../../../../../i18n/i18nComponent";


const amountUnitMap = {
    India: '₹',
    Pakistan: 'PKR',
    Bangladesh: '৳'
}

const amountUnit = amountUnitMap[appInfo.COUNTRY]


export const i18nDescriptions: i18nComponent = {
    namespace: 'i18nDescriptions',
    translation: {
        "zh-CN": {
            orderInfo: '订单信息',
            merchantName: '商户名',
            orderNumber: '订单编号',
            channel: '申請渠道',
            appName: 'APP名称',
            productName: '申请产品',
            orderStatus: '订单状态',
            orderLabel: '订单标签',
            loanAmount: `申请金额(${amountUnit})`,
            disburseAmount: `到帐金额(${amountUnit})`,
            amountDue: `应还金额(${amountUnit})`,
            reductionAmount: `减免金额(${amountUnit})`,
            amountPaid: `已还金额(${amountUnit})`,
            outstandingBalance: `剩馀应还(${amountUnit})`,
            extensionAmount:`展期帐单金额(${amountUnit})`,
            daysOverdue: '逾期天数',
            overDueFee: `逾期金额(${amountUnit})`,
            applicationTime: '申请时间',
            reviewTime: '审核时间',
            expirationTime: '到期时间',
            mobileNumber: '手机号',

            registerInfo: '注册信息',
        },
        "en-US": {
            orderInfo: 'Order Information',
            merchantName: 'Merchant name',
            orderNumber: 'Order Number',
            channel: 'Channel',
            appName: 'APP Name',
            productName: 'Product Name',
            orderStatus: 'Order Status',
            orderLabel: 'Order Label',
            loanAmount: 'Loan Amount',
            disburseAmount: `Disbursal Amount(${amountUnit})`,
            amountDue: `Disbursal Amount(${amountUnit})`,
            reductionAmount: `Reduction Amount(${amountUnit})`,
            amountPaid: `Amount Paid(${amountUnit})`,
            outstandingBalance: `Outstanding Balance(${amountUnit})`,
            extensionAmount:`Extension Fee(${amountUnit})`,
            daysOverdue: 'Days Overdue',
            overDueFee: `Overdue Fee(${amountUnit})`,
            applicationTime: 'Application Time',
            reviewTime: 'Review Time',
            expirationTime: 'Expiration Time',
            mobileNumber: 'Mobile Number',

            registerInfo: 'Registration information',
        }
    }
}
