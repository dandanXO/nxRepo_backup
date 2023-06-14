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
            ptpTime: 'PTP时间',
            ptpTimeTooltip: 'PTP = Promise To Pay\n承诺还款',
            trackingRecord: '跟进纪录',
            recentTrackingTime: '上次跟进时间',
            collectorName: '跟进人',
            trackingTime: '跟进时间',
            contactPerson: '跟进对象',
            contactName: '姓名',
            lastAddedTime: '最后添加时间',
            tooltip: {
                amountDue: '应还金额=申请金额*(1+后置费率)'
            }
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
            ptpTime: 'PTP Time',
            ptpTimeTooltip: 'PTP = Promise To Pay',
            trackingRecord: 'Tracking Record',
            recentTrackingTime: 'Recent Tracking Time',
            collectorName: 'Collector',
            trackingTime: 'Tracking Time',
            contactPerson: 'Contact Person',
            contactName: 'Contact Name',
            lastAddedTime: 'Last Added Time',
            tooltip: {
                amountDue: '=Loan Amount*(1+Post-Fee Rate)'
            }
        }
    }
}
