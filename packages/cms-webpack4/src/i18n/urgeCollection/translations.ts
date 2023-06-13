import {i18nComponent} from "../i18nComponent";


export const i18nUrgeCollection: i18nComponent = {
    namespace: 'i18nUrgeCollection',
    translation: {
        "zh-CN": {
            function: '操作',
            followUp: '跟进',
            merchantName: '商户名',
            orderNo: '订单编号',
            appName: 'APP名称',
            orderLabel: '订单标签',
            orderLabelStatus: {
                newLoan: '首贷',
                reLoan: '复贷',
                extension: '展期'
            },
            userName: '姓名',
            phone: '手机号',
            stage: '逾期阶段',
            overdueDays: '逾期天数',
            outstandingBalance: '当前帐单金额',
            lastOpenAppTime: '最新打开app时间',
            latestRepaymentCodeAcquisitionTime: '最新还款码获取时间',
            followUpCount: '跟进次数',
            contactable: '是否可联',
            followUpResult: '跟进结果',
            followUpResultStatus: {
                Promise: 'PTP',
                FinancialDifficulties: '财务困难',
                Missed: '未接',
                TurnedOff: '关机',
                InvalidPhoneNumber: '无效号码',
                BadAttitude: '态度恶劣',
                Other: '其他',
            },
            ptpTime: 'PTP时间',
            ptpTimeTooltip: 'PTP = Promise To Pay\n承诺还款',
            trackingRecord: '跟进纪录',
            recentTrackingTime: '上次跟进时间',
            collectorName: '跟进人',
        },
        "en-US": {
            function: 'Function',
            followUp: 'Follow-up',
            merchantName: 'Merchant Name',
            orderNo: 'Order No.',
            appName: 'APP Name',
            orderLabel: 'Order Label',
            orderLabelStatus: {
                newLoan: 'New Loan',
                reLoan: 'Re-Loan',
                extension: 'Extension'
            },
            userName: 'User Name',
            phone: 'Mobile Number',
            stage: 'Overdue Stage',
            overdueDays: 'Days Overdue',
            outstandingBalance: 'Outstanding Balance',
            lastOpenAppTime: 'Latest App Opening Time',
            latestRepaymentCodeAcquisitionTime: 'Latest Repayment Code Acquisition Time',
            followUpCount: 'Follow-up Count',
            contactable: 'Contactable',
            followUpResult: 'Follow-up Result',
            followUpResultStatus: {
                Promise: 'PTP',
                FinancialDifficulties: 'Financial Difficulties',
                Missed: 'Missed',
                TurnedOff: 'Turned Off',
                InvalidPhoneNumber: 'Invalid Phone Number',
                BadAttitude: 'Bad Attitude',
                Other: 'Other',
            },
            ptpTime: 'PTP Time',
            ptpTimeTooltip: 'PTP = Promise To Pay',
            trackingRecord: 'Tracking Record',
            recentTrackingTime: 'Recent Tracking Time',
            collectorName: 'Collector',
        }
    }
}
