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
            }
        }
    }
}
