import {i18nComponent} from "../../../../../i18n/i18nComponent";

const amountUnitMap = {
    India: '₹',
    Pakistan: 'PKR',
    Bangladesh: '৳'
}

const amountUnit = amountUnitMap[appInfo.COUNTRY]


export const i18nCards: i18nComponent = {
    namespace: 'i18nCards',
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

            urgeRecord: '催收纪录',

            registerInfo: '注册信息',
            userId: '用户ID',
            registerChannel: '注册渠道',
            packageName: '注册包名',
            registerTime: '注册时间',
            userSource: '用户来源',

            personalInfo: '个人信息',
            userName: '姓名',
            gender: '性别',
            idCardNo: '身份证号',
            fatherName: '父亲姓名',
            birthDay: '出生日期',
            panId: '税务证号',
            education: '教育程度',
            maritalStatus: '婚姻状况',
            email: 'Email',
            occupation: '职业',
            salaryRange: '薪资范围',
            address: '家庭地址',
            emergencyContact: '紧急联络人',

            identityInfo: '身份信息',
            idcardFrontPhoto: {
                India: 'Aadhaar card 正面',
                Pakistan: 'CNIC卡正面',
                Bangladesh: 'NID卡正面'
            },
            idcardBackPhoto: {
                India: 'Aadhaar card 反面',
                Pakistan: 'CNIC卡反面',
                Bangladesh: 'NID卡反面'
            },
            idcardPortraitPhoto: {
                India: '人像',
                Pakistan: '人像',
                Bangladesh: '人像'
            },
            panPhoto: {
                India: 'PAN卡',
            },

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
            amountDue: `Amount Due(${amountUnit})`,
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

            urgeRecord: 'Collections Record',

            registerInfo: 'Registration information',
            userId: 'User ID',
            registerChannel: 'Channel',
            packageName: 'Package Name',
            registerTime: 'Registration Time',
            userSource: 'User Source',

            personalInfo: 'Personal information',
            userName: 'User Name',
            gender: 'Gender',
            idCardNo: 'ID Number',
            fatherName: 'Father\'s Name',
            birthDay: 'Date of birth',
            panId: 'PAN Number',
            education: 'Education',
            maritalStatus: 'Marital Status',
            email: 'Email',
            occupation: 'Occupation',
            salaryRange: 'Salary Range',
            address: 'Address',
            emergencyContact: 'Emergency Contact',

            identityInfo: 'Identity Information',
            idcardFrontPhoto: {
                India: 'Front side of Aadheaar card',
                Pakistan: 'Front side of CNIC',
                Bangladesh: 'Front side of NID'
            },
            idcardBackPhoto: {
                India: 'Back side of Aadheaar card',
                Pakistan: 'Back side of CNIC',
                Bangladesh: 'Back side of NID'
            },
            idcardPortraitPhoto: {
                India: 'Portrait',
                Pakistan: 'Portrait',
                Bangladesh: 'Portrait'
            },
            panPhoto: {
                India: 'PAN card',
            },

        }
    }
}
