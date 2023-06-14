import { i18nComponent } from "./i18nComponent";

export const i18nCommon: i18nComponent = {
    namespace: 'common',
    translation: {
        "zh-CN": {
            noRestriction: '不限',
            menu: {
                homePage: '首页',
                currentDayOverdueCall: '当日催收',
                currentDayOverdueCallList: '当日电催列表',
                overdueCollection: '逾期催收',
                overdueCallList: '逾期电催列表',
            },
            breadcrumb: {
                orderDetails: '订单详情',
                overDueDetails: '订单详情'
            },
            tab: {
                orderInfo: '订单信息',
                userInfo: '用户信息',
                contractList: '通讯录',
                smsMessage: '手机短信'
            },
            message: {
                copySuccess: '链接已复制'
            },
            orderStatus: {
                overDue: '已逾期',
                completed: '已完成',
            },
            orderLabelStatus: {
                newLoan: '首贷',
                reLoan: '复贷',
                extension: '展期'
            },
            followUpResultStatus: {
                Promise: 'PTP',
                FinancialDifficulties: '财务困难',
                Missed: '未接',
                TurnedOff: '关机',
                InvalidPhoneNumber: '无效号码',
                BadAttitude: '态度恶劣',
                Other: '其他',
            },
            contact: {
                borrower: '本人',
                list: '通讯录',
                emergency: '紧急联络人{{count}}',
            },
            pagination : {
                showingRange: "共 {{total}} 笔",
                itemPerPage: ' / 页',
            },
            table: {
                sendPhoneNumber: '发送号码',
                contactName: '联络人姓名',
                contactPhone: '联络人电话',
                lastAddedTime: '最后添加时间',
                phone: '手机号',
                uploadTime: '上传时间',
                relationShip: '与本人关系',
                contactType: '联络人名称',
                smsContent: '内容',
                smsSendType: '发送类型',
                sendTime: '发送时间',
            }
        },
        "en-US": {
            noRestriction: 'No Restriction',
            menu: {
                homePage: 'Home',
                currentDayOverdueCall: 'CurrentDay Collection',
                currentDayOverdueCallList: 'CurrentDay Overdue Call List',
                overdueCollection: 'Overdue Collection',
                overdueCallList: 'Overdue Call List',
            },
            breadcrumb: {
                orderDetails: 'Order Details',
                overDueDetails: 'Overdue Details'
            },
            tab: {
                orderInfo: 'Order Information',
                userInfo: 'User Info',
                contractList: 'Contact List',
                smsMessage: 'SMS Message'
            },
            message: {
                copySuccess: 'Link Copied'
            },
            orderStatus: {
                overDue: 'Overdue',
                completed: 'Complete',
            },
            orderLabelStatus: {
                newLoan: 'New Loan',
                reLoan: 'Re-Loan',
                extension: 'Extension'
            },
            followUpResultStatus: {
                Promise: 'PTP',
                FinancialDifficulties: 'Financial Difficulties',
                Missed: 'Missed',
                TurnedOff: 'Turned Off',
                InvalidPhoneNumber: 'Invalid Phone Number',
                BadAttitude: 'Bad Attitude',
                Other: 'Other',
            },
            contact: {
              borrower: 'Borrower',
              list: 'Contact List',
              emergency: 'Emergency Contact{{count}}',
            },
            pagination : {
                showingRange : "Total {{total}} Record(s)",
                itemPerPage: ' / Page',
            },
            table: {
                sendPhoneNumber: 'Phone Number',
                contactName: 'Contact Name',
                contactPhone: 'Contact Number',
                lastAddedTime: 'Last Added Time',
                phone: 'Mobile Number',
                uploadTime: 'Upload Time',
                relationShip: 'Relationship',
                contactType: 'Contact',
                smsContent: 'SMS Content',
                smsSendType: 'Sending Type',
                sendTime: 'Sending Time',
            }
        }
    }
}
