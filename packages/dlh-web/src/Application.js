import conf from 'conf';
import * as Sentry from "@sentry/react";
import {BrowserTracing} from "@sentry/tracing";
import Cookies from "js-cookie";
import hotkeys from "hotkeys-js";
// import ClipboardJS from "clipboard"
import html2canvas from "html2canvas";
import { detectIncognito } from "detectincognitojs";
import devtools from 'devtools-detect';
import adminI18n from "./locales/zh_CN.json";
const personalList = [
  {
    "id": 108,
    "name": "menu.userManage",
    "parentId": 0,
    "actionUrl": "/userManage",
    "menuDesc": null,
    "iconCss": "user",
    "sortOrder": 10,
    "enabled": 1,
    "children": [
      {
        "id": 109,
        "name": "menu.userInfoManage",
        "parentId": 108,
        "actionUrl": "/userInfoManage",
        "menuDesc": null,
        "iconCss": "user",
        "sortOrder": 20,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 382,
        "name": "menu.userLastCheck",
        "parentId": 108,
        "actionUrl": "/userLastCheck",
        "menuDesc": null,
        "iconCss": "tags",
        "sortOrder": 30,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 380,
        "name": "menu.userCheckRecord",
        "parentId": 108,
        "actionUrl": "/userCheckRecord",
        "menuDesc": null,
        "iconCss": "hdd",
        "sortOrder": 50,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 153,
        "name": "menu.blackList",
        "parentId": 108,
        "actionUrl": "/blackListManage",
        "menuDesc": null,
        "iconCss": "info-circle-o",
        "sortOrder": 60,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 256,
        "name": "menu.whiteList",
        "parentId": 108,
        "actionUrl": "/whiteListManage",
        "menuDesc": null,
        "iconCss": "info-circle-o",
        "sortOrder": 70,
        "enabled": 1,
        "children": null,
        "checkOut": false
      }
    ],
    "checkOut": false
  },
  {
    "id": 393,
    "name": "menu.platform.manage",
    "parentId": 0,
    "actionUrl": "/platform-manage",
    "menuDesc": null,
    "iconCss": "apartment",
    "sortOrder": 15,
    "enabled": 1,
    "children": [
      {
        "id": 394,
        "name": "menu.merchant.manage",
        "parentId": 393,
        "actionUrl": "/merchant-manage",
        "menuDesc": null,
        "iconCss": "cluster",
        "sortOrder": 10,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 395,
        "name": "menu.product.manage",
        "parentId": 393,
        "actionUrl": "/product-manage",
        "menuDesc": null,
        "iconCss": "appstore",
        "sortOrder": 20,
        "enabled": 1,
        "children": null,
        "checkOut": false
      }
    ],
    "checkOut": false
  },
  {
    "id": 398,
    "name": "menu.tel.sale",
    "parentId": 0,
    "actionUrl": "/tel-sale",
    "menuDesc": null,
    "iconCss": "book",
    "sortOrder": 20,
    "enabled": 1,
    "children": [
      {
        "id": 399,
        "name": "menu.tel.sale.distribute",
        "parentId": 398,
        "actionUrl": "/tel-sale-distribute",
        "menuDesc": null,
        "iconCss": "file-add",
        "sortOrder": 50,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 400,
        "name": "menu.tel.sale.new.guest",
        "parentId": 398,
        "actionUrl": "/tel-sale-new-guest",
        "menuDesc": null,
        "iconCss": "file-text",
        "sortOrder": 51,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 401,
        "name": "menu.tel.sale.old.guest",
        "parentId": 398,
        "actionUrl": "/tel-sale-old-guest",
        "menuDesc": null,
        "iconCss": "file-text",
        "sortOrder": 51,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 402,
        "name": "menu.tel.sale.statistics",
        "parentId": 398,
        "actionUrl": "/tel-sale-statistics",
        "menuDesc": null,
        "iconCss": "file-text",
        "sortOrder": 51,
        "enabled": 1,
        "children": null,
        "checkOut": false
      }
    ],
    "checkOut": false
  },
  {
    "id": 113,
    "name": "menu.orderManagement",
    "parentId": 0,
    "actionUrl": "/orderManagement",
    "menuDesc": null,
    "iconCss": "export",
    "sortOrder": 25,
    "enabled": 1,
    "children": [
      {
        "id": 117,
        "name": "menu.loan.examineList",
        "parentId": 113,
        "actionUrl": "/checkRecord",
        "menuDesc": null,
        "iconCss": "hdd",
        "sortOrder": 50,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 116,
        "name": "menu.loan.finalExamine",
        "parentId": 113,
        "actionUrl": "/businessLastCheck",
        "menuDesc": null,
        "iconCss": "tags",
        "sortOrder": 50,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 114,
        "name": "menu.orderList",
        "parentId": 113,
        "actionUrl": "/orderList",
        "menuDesc": null,
        "iconCss": "credit-card",
        "sortOrder": 50,
        "enabled": 1,
        "children": null,
        "checkOut": false
      }
    ],
    "checkOut": false
  },
  {
    "id": 118,
    "name": "menu.financeManage",
    "parentId": 0,
    "actionUrl": "/paymentManage",
    "menuDesc": null,
    "iconCss": "pay-circle-o",
    "sortOrder": 30,
    "enabled": 1,
    "children": [
      {
        "id": 170,
        "name": "menu.reLoan",
        "parentId": 118,
        "actionUrl": "/repeatLoan",
        "menuDesc": null,
        "iconCss": "pay-circle",
        "sortOrder": 51,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 156,
        "name": "menu.loanRecord",
        "parentId": 118,
        "actionUrl": "/loanRecord",
        "menuDesc": null,
        "iconCss": "pay-circle",
        "sortOrder": 52,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 158,
        "name": "menu.addRepayment",
        "parentId": 118,
        "actionUrl": "/addRefund",
        "menuDesc": null,
        "iconCss": "plus-circle",
        "sortOrder": 53,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 157,
        "name": "menu.repaymentRecord",
        "parentId": 118,
        "actionUrl": "/refundRecord",
        "menuDesc": null,
        "iconCss": "save",
        "sortOrder": 54,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 188,
        "name": "menu.addReduction",
        "parentId": 118,
        "actionUrl": "/onlineRefund",
        "menuDesc": null,
        "iconCss": "pay-circle",
        "sortOrder": 55,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 189,
        "name": "menu.reductionRecord",
        "parentId": 118,
        "actionUrl": "/onlineReliefRecord",
        "menuDesc": null,
        "iconCss": "save",
        "sortOrder": 56,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 193,
        "name": "menu.errorOrderEdit",
        "parentId": 118,
        "actionUrl": "/overOrderHandle",
        "menuDesc": null,
        "iconCss": "pay-circle",
        "sortOrder": 57,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 194,
        "name": "menu.errorOrderHistory",
        "parentId": 118,
        "actionUrl": "/overOrderHandleRecord",
        "menuDesc": null,
        "iconCss": "pay-circle",
        "sortOrder": 58,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 406,
        "name": "menu.order.pay.receipt",
        "parentId": 118,
        "actionUrl": "/pay-receipt",
        "menuDesc": null,
        "iconCss": "check-circle",
        "sortOrder": 60,
        "enabled": 1,
        "children": null,
        "checkOut": false
      }
    ],
    "checkOut": false
  },
  {
    "id": 371,
    "name": "menu.extensionManage",
    "parentId": 0,
    "actionUrl": "/extensionPeriodLoanManage",
    "menuDesc": null,
    "iconCss": "pay-circle-o",
    "sortOrder": 35,
    "enabled": 1,
    "children": [
      {
        "id": 372,
        "name": "menu.manualExtensionManage",
        "parentId": 371,
        "actionUrl": "/manualLoanExtend",
        "menuDesc": null,
        "iconCss": "pay-circle-o",
        "sortOrder": 50,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 373,
        "name": "menu.extensionRecord",
        "parentId": 371,
        "actionUrl": "/extensionPeriodRecord",
        "menuDesc": null,
        "iconCss": "file-text",
        "sortOrder": 50,
        "enabled": 1,
        "children": null,
        "checkOut": false
      }
    ],
    "checkOut": false
  },
  {
    "id": 182,
    "name": "menu.currentDayOverdueCall",
    "parentId": 0,
    "actionUrl": "/todayLoanManage",
    "menuDesc": null,
    "iconCss": "book",
    "sortOrder": 40,
    "enabled": 1,
    "children": [
      {
        "id": 186,
        "name": "menu.currentDayOverdueCallList ",
        "parentId": 182,
        "actionUrl": "/todayPhoneUrgeList",
        "menuDesc": null,
        "iconCss": "phone",
        "sortOrder": 50,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 187,
        "name": "menu.currentDayOverdueStats",
        "parentId": 182,
        "actionUrl": "/todayStatistics",
        "menuDesc": null,
        "iconCss": "hourglass",
        "sortOrder": 50,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 185,
        "name": "menu.currentDayRepaymentRecord",
        "parentId": 182,
        "actionUrl": "/todayBackRecord",
        "menuDesc": null,
        "iconCss": "file-text",
        "sortOrder": 50,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 183,
        "name": "menu.currentDayOrderAssign",
        "parentId": 182,
        "actionUrl": "/todayOrderDistribute",
        "menuDesc": null,
        "iconCss": "file-add",
        "sortOrder": 50,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 184,
        "name": "menu.currentDayExpiredOrder",
        "parentId": 182,
        "actionUrl": "/todayList",
        "menuDesc": null,
        "iconCss": "inbox",
        "sortOrder": 50,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 385,
        "name": "menu.collect.team.report.today",
        "parentId": 182,
        "actionUrl": "/collect-team-report-today",
        "menuDesc": null,
        "iconCss": "pie-chart",
        "sortOrder": 60,
        "enabled": 1,
        "children": null,
        "checkOut": false
      }
    ],
    "checkOut": false
  },
  {
    "id": 130,
    "name": "menu.overdueCollection",
    "parentId": 0,
    "actionUrl": "/afterLoanManage",
    "menuDesc": null,
    "iconCss": "book",
    "sortOrder": 45,
    "enabled": 1,
    "children": [
      {
        "id": 131,
        "name": "menu.overdueOrderAssign",
        "parentId": 130,
        "actionUrl": "/overdueOrderDistribute",
        "menuDesc": null,
        "iconCss": "file-add",
        "sortOrder": 50,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 132,
        "name": "menu.overdueList",
        "parentId": 130,
        "actionUrl": "/overdueList",
        "menuDesc": null,
        "iconCss": "inbox",
        "sortOrder": 51,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 383,
        "name": "menu.overdueReduction",
        "parentId": 130,
        "actionUrl": "/overdue-reduction",
        "menuDesc": null,
        "iconCss": "pay-circle",
        "sortOrder": 52,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 133,
        "name": "menu.overdueRepaymentList",
        "parentId": 130,
        "actionUrl": "/overdueBackRecord",
        "menuDesc": null,
        "iconCss": "file-text",
        "sortOrder": 53,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 134,
        "name": "menu.overdueCallList",
        "parentId": 130,
        "actionUrl": "/phoneUrgeList",
        "menuDesc": null,
        "iconCss": "phone",
        "sortOrder": 54,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 191,
        "name": "menu.overdueStatsOne",
        "parentId": 130,
        "actionUrl": "/overdueDisStatistics1",
        "menuDesc": null,
        "iconCss": "file-text",
        "sortOrder": 55,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 192,
        "name": "menu.overdueStatsTwo",
        "parentId": 130,
        "actionUrl": "/overdueDisStatistics2",
        "menuDesc": null,
        "iconCss": "file-text",
        "sortOrder": 56,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 386,
        "name": "menu.collect.team.report.overdue",
        "parentId": 130,
        "actionUrl": "/collect-team-report-overdue",
        "menuDesc": null,
        "iconCss": "pie-chart",
        "sortOrder": 57,
        "enabled": 1,
        "children": null,
        "checkOut": false
      }
    ],
    "checkOut": false
  },
  {
    "id": 300,
    "name": "menu.collectionConf",
    "parentId": 0,
    "actionUrl": "/payAndSettleManage",
    "menuDesc": null,
    "iconCss": "pay-circle-o",
    "sortOrder": 50,
    "enabled": 1,
    "children": [
      {
        "id": 330,
        "name": "menu.collectionOrderList",
        "parentId": 300,
        "actionUrl": "/payOrderList",
        "menuDesc": null,
        "iconCss": "file-text",
        "sortOrder": 50,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 370,
        "name": "menu.paymentOrderList",
        "parentId": 300,
        "actionUrl": "/settleOrderList",
        "menuDesc": null,
        "iconCss": "file-text",
        "sortOrder": 50,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 389,
        "name": "menu.paymentStatistic",
        "parentId": 300,
        "actionUrl": "/paymentStatistic",
        "menuDesc": null,
        "iconCss": "file-text",
        "sortOrder": 50,
        "enabled": 1,
        "children": null,
        "checkOut": false
      }
    ],
    "checkOut": false
  },
  {
    "id": 407,
    "name": "menu.payAndSettleManage",
    "parentId": 0,
    "actionUrl": "/payAndSettleMerchantManage",
    "menuDesc": null,
    "iconCss": "setting",
    "sortOrder": 51,
    "enabled": 1,
    "children": [
      {
        "id": 360,
        "name": "menu.paymentMerchantList",
        "parentId": 407,
        "actionUrl": "/settleMchList",
        "menuDesc": null,
        "iconCss": "file-text",
        "sortOrder": 50,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 350,
        "name": "menu.paymentPlatformList",
        "parentId": 407,
        "actionUrl": "/settlePlatList",
        "menuDesc": null,
        "iconCss": "file-text",
        "sortOrder": 51,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 320,
        "name": "menu.collectionMerchantList",
        "parentId": 407,
        "actionUrl": "/payMchList",
        "menuDesc": null,
        "iconCss": "file-text",
        "sortOrder": 60,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 310,
        "name": "menu.collectionPlatformList",
        "parentId": 407,
        "actionUrl": "/payPlatList",
        "menuDesc": null,
        "iconCss": "file-text",
        "sortOrder": 61,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 305,
        "name": "menu.collectionFuncList",
        "parentId": 407,
        "actionUrl": "/payTypeList",
        "menuDesc": null,
        "iconCss": "file-text",
        "sortOrder": 70,
        "enabled": 1,
        "children": null,
        "checkOut": false
      }
    ],
    "checkOut": false
  },
  {
    "id": 141,
    "name": "menu.bypassManage",
    "parentId": 0,
    "actionUrl": "/h5Manage",
    "menuDesc": null,
    "iconCss": "paper-clip",
    "sortOrder": 55,
    "enabled": 1,
    "children": [
      {
        "id": 390,
        "name": "menu.recall",
        "parentId": 141,
        "actionUrl": "/recallSetting",
        "menuDesc": null,
        "iconCss": "notification",
        "sortOrder": 50,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 404,
        "name": "menu.activity.setting",
        "parentId": 141,
        "actionUrl": "/activity-setting",
        "menuDesc": null,
        "iconCss": "branches",
        "sortOrder": 70,
        "enabled": 1,
        "children": null,
        "checkOut": false
      }
    ],
    "checkOut": false
  },
  {
    "id": 137,
    "name": "menu.statistics",
    "parentId": 0,
    "actionUrl": "/businessStatistics",
    "menuDesc": null,
    "iconCss": "code-o",
    "sortOrder": 60,
    "enabled": 1,
    "children": [
      {
        "id": 172,
        "name": "menu.newUserDailyConversionRates",
        "parentId": 137,
        "actionUrl": "/Registrations",
        "menuDesc": null,
        "iconCss": "hourglass",
        "sortOrder": 5,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 411,
        "name": "menu.reloan.statistics",
        "parentId": 137,
        "actionUrl": "/reloanStatistics",
        "menuDesc": null,
        "iconCss": "area-chart",
        "sortOrder": 8,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 190,
        "name": "menu.orderStats",
        "parentId": 137,
        "actionUrl": "/orderStatistics",
        "menuDesc": null,
        "iconCss": "file-text",
        "sortOrder": 10,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 169,
        "name": "menu.AtoSStats",
        "parentId": 137,
        "actionUrl": "/atoSStatistics",
        "menuDesc": null,
        "iconCss": "hourglass",
        "sortOrder": 15,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 171,
        "name": "menu.summaryStats",
        "parentId": 137,
        "actionUrl": "/SumStatistics",
        "menuDesc": null,
        "iconCss": "hourglass",
        "sortOrder": 20,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 388,
        "name": "menu.financial.report",
        "parentId": 137,
        "actionUrl": "/financial-report",
        "menuDesc": null,
        "iconCss": "pie-chart",
        "sortOrder": 25,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 148,
        "name": "menu.dataSummary",
        "parentId": 137,
        "actionUrl": "/allDataStatistics",
        "menuDesc": null,
        "iconCss": "line-chart",
        "sortOrder": 30,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 138,
        "name": "menu.repaymentList",
        "parentId": 137,
        "actionUrl": "/loanRecycleStatistics",
        "menuDesc": null,
        "iconCss": "dot-chart",
        "sortOrder": 35,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 143,
        "name": "menu.repaymentStats",
        "parentId": 137,
        "actionUrl": "/newOverdueStatistics",
        "menuDesc": null,
        "iconCss": "dot-chart",
        "sortOrder": 40,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 149,
        "name": "menu.overdueStats",
        "parentId": 137,
        "actionUrl": "/overdueStatistics",
        "menuDesc": null,
        "iconCss": "hourglass",
        "sortOrder": 45,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 392,
        "name": "menu.overdueStats2",
        "parentId": 137,
        "actionUrl": "/overdueStatistics2",
        "menuDesc": null,
        "iconCss": "hourglass",
        "sortOrder": 50,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 146,
        "name": "menu.refuseReasonStats",
        "parentId": 137,
        "actionUrl": "/tdRefuseStatistics",
        "menuDesc": null,
        "iconCss": "question-circle-o",
        "sortOrder": 55,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 410,
        "name": "menu.new.customer.risk.payment.rate",
        "parentId": 137,
        "actionUrl": "/newCustomerRiskPaymentRate",
        "menuDesc": null,
        "iconCss": "setting",
        "sortOrder": 55,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 405,
        "name": "menu.orderRefuseReasonStats",
        "parentId": 137,
        "actionUrl": "/order-refuse-reason-statistics",
        "menuDesc": null,
        "iconCss": "question-circle-o",
        "sortOrder": 60,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 119,
        "name": "menu.channelStats",
        "parentId": 137,
        "actionUrl": "/channelStatistics",
        "menuDesc": null,
        "iconCss": "pie-chart",
        "sortOrder": 65,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 121,
        "name": "menu.channelStatsTwo",
        "parentId": 137,
        "actionUrl": "/channelStatistics2",
        "menuDesc": null,
        "iconCss": "area-chart",
        "sortOrder": 70,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 196,
        "name": "menu.userSourceUVStats",
        "parentId": 137,
        "actionUrl": "/channelUserUVStatistics",
        "menuDesc": null,
        "iconCss": "dot-chart",
        "sortOrder": 75,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 408,
        "name": "menu.riskControlStatistic",
        "parentId": 137,
        "actionUrl": "/riskControlStatistic",
        "menuDesc": null,
        "iconCss": "area-chart",
        "sortOrder": 80,
        "enabled": 1,
        "children": null,
        "checkOut": false
      }
    ],
    "checkOut": false
  },
  {
    "id": 139,
    "name": "menu.channelManage",
    "parentId": 0,
    "actionUrl": "/channelManage",
    "menuDesc": null,
    "iconCss": "layout",
    "sortOrder": 65,
    "enabled": 1,
    "children": [
      {
        "id": 159,
        "name": "menu.channelList",
        "parentId": 139,
        "actionUrl": "/channelList",
        "menuDesc": null,
        "iconCss": "bar-chart",
        "sortOrder": 50,
        "enabled": 1,
        "children": null,
        "checkOut": false
      }
    ],
    "checkOut": false
  },
  {
    "id": 334,
    "name": "menu.riskControlManage",
    "parentId": 0,
    "actionUrl": "/riskConfigManage",
    "menuDesc": null,
    "iconCss": "setting",
    "sortOrder": 70,
    "enabled": 1,
    "children": [
      {
        "id": 403,
        "name": "menu.risk.model.setting",
        "parentId": 334,
        "actionUrl": "/risk-model-setting",
        "menuDesc": null,
        "iconCss": "radar-chart",
        "sortOrder": 50,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 375,
        "name": "menu.riskControlModelScoreData",
        "parentId": 334,
        "actionUrl": "/riskControlModel",
        "menuDesc": null,
        "iconCss": "export",
        "sortOrder": 51,
        "enabled": 1,
        "children": null,
        "checkOut": false
      }
    ],
    "checkOut": false
  },
  {
    "id": 163,
    "name": "menu.systemManage",
    "parentId": 0,
    "actionUrl": "/systemManage",
    "menuDesc": null,
    "iconCss": "setting",
    "sortOrder": 75,
    "enabled": 1,
    "children": [
      {
        "id": 174,
        "name": "menu.generalConf",
        "parentId": 163,
        "actionUrl": "/configManage",
        "menuDesc": null,
        "iconCss": "setting",
        "sortOrder": 50,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 387,
        "name": "menu.balanceQuery",
        "parentId": 163,
        "actionUrl": "/balanceQuery",
        "menuDesc": null,
        "iconCss": "dollar",
        "sortOrder": 51,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 384,
        "name": "menu.collect.team.manage",
        "parentId": 163,
        "actionUrl": "/collect-team-manage",
        "menuDesc": null,
        "iconCss": "cluster",
        "sortOrder": 52,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 166,
        "name": "menu.roleManage",
        "parentId": 163,
        "actionUrl": "/roleManage",
        "menuDesc": null,
        "iconCss": "disconnect",
        "sortOrder": 53,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 165,
        "name": "menu.departmentManage",
        "parentId": 163,
        "actionUrl": "/departmentManage",
        "menuDesc": null,
        "iconCss": "team",
        "sortOrder": 54,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 167,
        "name": "menu.operatorManage",
        "parentId": 163,
        "actionUrl": "/peopleManage",
        "menuDesc": null,
        "iconCss": "user-add",
        "sortOrder": 55,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 376,
        "name": "menu.operationLogManage",
        "parentId": 163,
        "actionUrl": "/operationLogManage",
        "menuDesc": null,
        "iconCss": "user-add",
        "sortOrder": 56,
        "enabled": 1,
        "children": null,
        "checkOut": false
      },
      {
        "id": 409,
        "name": "menu.login.account.manage",
        "parentId": 163,
        "actionUrl": "/loginAccountMange",
        "menuDesc": null,
        "iconCss": "setting",
        "sortOrder": 57,
        "enabled": 1,
        "children": null,
        "checkOut": false
      }
    ],
    "checkOut": false
  },
  {
    "id": 161,
    "name": "menu.commonOperations",
    "parentId": 0,
    "actionUrl": "/operatorManage",
    "menuDesc": null,
    "iconCss": "tool",
    "sortOrder": 80,
    "enabled": 1,
    "children": [
      {
        "id": 162,
        "name": "menu.export",
        "parentId": 161,
        "actionUrl": "/exportOperator",
        "menuDesc": null,
        "iconCss": "export",
        "sortOrder": 50,
        "enabled": 1,
        "children": null,
        "checkOut": false
      }
    ],
    "checkOut": false
  }
]

console.log("[api-dlh-web] conf", conf);

export const Application = {
  isLocalhost: function () {
    return window.location.hostname === "localhost"
  },
  getEnvironmentName: function (){
    const envMachine = this.isLocalhost() ? "localhost" : "production";
    return `${envMachine}:${conf.country}`;
  }
}

const UserActions = {
  "select": `User Select`,
  "copy": `User Copy`,
  "copyColumnText": `User Copy Column Text`,
  "pasta": `User Pasta`,
  "cut": `User Cut`,
  "openDevtool": "User Open Devtool",
  "closeDevtool": "User Close Devtool",
  "blurBrowser": "User Blur Browser",
  "focusBrowser": "User Focus Browser",
}
const getMenuMapPageDic = () => {
  let menuMapPageDic = {
    "/index": "首頁",
  }
  personalList.map((firstLevelMenu) => {
    if(firstLevelMenu.children && firstLevelMenu.children.length > 0) {
      firstLevelMenu.children.map(secondLevelMenu => {
        menuMapPageDic = {
          ...menuMapPageDic,
          [secondLevelMenu.actionUrl]: adminI18n[secondLevelMenu.name.trim()]
        }
      })
    }
  })
  // console.log("menuMapPageDic", menuMapPageDic);
  const replaceMap = {}
  replaceMap["/appSettingManage"] = "/cms/app-manage";
  replaceMap["/userInfoManage"] = "/cms/user";
  replaceMap["/userLastCheck"] = "/cms/user-review";
  replaceMap["/userCheckRecord"] = "/cms/user-review-record";
  replaceMap["/blackListManage"] = "/cms/blacklist";
  replaceMap["/whiteListManage"] = "/cms/whitelist";

  replaceMap["/channelList"] = "/cms/channel";
  replaceMap["/merchant-manage"] = "/cms/merchant";
  replaceMap["/product-manage"] = "/cms/product";

  replaceMap["/risk-model-setting"] = "/cms/risk-setting";

  replaceMap["/orderList"] = "/cms/order";
  replaceMap["/businessRepeatCheck"] = "/cms/order-review";
  replaceMap["/businessLastCheck"] = "/cms/order-final-review";
  replaceMap["/checkRecord"] = "/cms/order-review-record";

  replaceMap["/activity-setting"] = "/cms/activity-ads";
  replaceMap["/pay-receipt"] = "/cms/pay-receipt";
  replaceMap["/loginAccountMange"] = "/cms/loginAccountMange";

  replaceMap["/riskControlStatistic"] = "/cms/riskControlStatistic";
  replaceMap["/newCustomerRiskPaymentRate"] = "/cms/new-customer-repayment-rate";
  replaceMap["/Registrations"] = "/cms/Registrations";
  replaceMap["/reloanStatistics"] = "/cms/reloanStatistics";

  replaceMap["/todayOrderDistribute"] = "/cms/today-distribution";
  replaceMap["/overdueOrderDistribute"] = "/cms/overdue-distribution";

  Object.keys(menuMapPageDic).map(key => {
    if(replaceMap[key]) {
      menuMapPageDic[replaceMap[key]] = menuMapPageDic[key];
      delete menuMapPageDic[key];
    }
  })
  // console.log("menuMapPageDic", menuMapPageDic);
  return menuMapPageDic;
}
const menuMapPageDic = getMenuMapPageDic();

const getPageName = () => {
  // NOTE: ex. /login, /cms/user, /cms/product
  const route = location.hash.replace("#", "");
  const pageName = menuMapPageDic[route]
  // console.log("pageName", pageName);
  return pageName;
}

// window.addEventListener("hashchange", () => {
//   getPageName();
// })

export const SentryModule = {
  enable: true,
  isMonitoring: false,
  getReplayConfig: function () {
    return {
      maskAllText: false,
      maskAllInputs: false,
      blockAllMedia: false,
    }
  },
  sendCopyColumnTextMessage: function (selectionContent) {
    // NOTE: message
    Sentry.captureMessage(UserActions.copyColumnText, {
      level: "info",
      tags: {
        pageName: getPageName(),
        userAction: "copyColumnText",
        selectContent: selectionContent,
      },
    })
  },
  init: function () {
    const envName = Application.getEnvironmentName();
    // console.log("[api-dlh-web][sentry] environment", envName);
    // console.log("[api-dlh-web][sentry] isLocalhost", Application.isLocalhost());
    const replay = new Sentry.Replay(this.getReplayConfig());
    replay.start();
    // console.log("replay.name", replay.name);
    // console.log("replay.options", replay.options);
    // console.log("replay.recordingOptions", replay.recordingOptions);

    const sentryConfig = {
      dsn: "https://c10ab5774259474a9832879e2c3bfeae@web.sijneokd.com/2",
      environment: envName,
      integrations: [new BrowserTracing(), replay],
      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 1.0,
      // Session Replay
      replaysSessionSampleRate: 1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
      replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
    }
    if(!Application.isLocalhost()) {
      sentryConfig.release = appInfo.COMMITHASH;
    }

    if(this.enable) {
      Sentry.init(sentryConfig);
      console.log("[api-dlh-web] sentry.init");
    }
    // NOTICE: Tag: can search these
    // Tag values have a maximum length of 200 characters and they cannot contain the newline (\n) character.
    // NOTICE: Context: cannot search these
  },
  // NOTICE: 傳送任意訊息
  sendSelectionMessage: async function (selectionContent) {
    const that = this;
    const finalSelectionContent = selectionContent.replace(/\n/g, " ");

    Sentry.configureScope((scope) => {

      const login = JSON.parse(Cookies.get("loginInfo")).data;
      const getInfo = JSON.parse(Cookies.get("adminUser")).data;

      // NOTE: copy content
      if(finalSelectionContent.length > 200) {

        // NOTE: attachment
        const filePath = `Selection-${Application.getEnvironmentName()}-${login.phoneNo}-${new Date().toISOString()}.txt`;

        scope.addAttachment({
          data: finalSelectionContent,
          // attachmentType: "image/octet-stream",
          // contentType: "image/png",
          // contentType: "",
          filename: filePath,
        })

        // NOTE: breadcrumb
        // that.addBreadcrumb({
        //   category: "User Selection",
        //   message: filePath,
        // });

        // NOTE: message
        Sentry.captureMessage(UserActions.select, {
          level: "info",
          tags: {
            pageName: getPageName(),
            userAction: "select",
            selectContent: filePath,
            // ...that.getCommonTagsInfo(),
            // privateMode: detectIncognitoResult.isPrivate,
          },
        })
      } else {
        // that.addBreadcrumb({
        //   category: "User Selection",
        //   message: finalSelectionContent,
        // });

        // NOTE: message
        Sentry.captureMessage(UserActions.select, {
          level: "info",
          tags: {
            pageName: getPageName(),
            userAction: "select",
            selectContent: finalSelectionContent,
            // ...that.getCommonTagsInfo(),
            // privateMode: detectIncognitoResult.isPrivate,
          },
        })
      }
      scope.clearAttachments();
    })
  },
  // NOTE: 使用者選擇文字後 mouseup， (後續並不知道是否有利用右鍵進行複製)
  startToMonitorUserMouseSelection: function () {
    console.log("startToMonitorUserMouseSelection")
    const that = this;
    let isSelecting = false;
    let selection = null;

    function callback() {
      const selectionContent = document.getSelection().toString();
      // console.log("[sentry][user] selectionContent", selectionContent)
      that.sendSelectionMessage(selectionContent).then(() => {

      })
    }

    function handleSelectStart(event) {
      // console.log(event);
      isSelecting = true;
    }

    function handleMouseUp(event) {
      // console.log(event, isSelecting);
      if (isSelecting && !window.getSelection().isCollapsed) {
        callback((selection = window.getSelection()));
        isSelecting = false;
      }
    }

    function handleSelectionChange(event) {
      // console.log('change', isSelecting);
      if (window.getSelection().isCollapsed && null !== selection) {
        callback((selection = null));
      }
    }

    window.addEventListener('selectstart', handleSelectStart);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('selectionchange', handleSelectionChange);

    // document.onselectionchange = () => {
    //   console.log(document.getSelection());
    // };

  },
  // stopToMonitorContextmenu: function () {
  //
  // },

  // NOTICE: 取得選擇的文字，並傳送
  // sendSelectText: async function (eventTitle) {
  //   // NOTICE: screenshot
  //   // this.screenshot();
  //
  //   // NOTICE: selection
  //   const selectionContent = window.getSelection().toString();
  //   // console.log("eventTitle", eventTitle);
  //   // console.log("selectionContent", selectionContent);
  //
  //   await this.sendSelectionMessage(eventTitle, selectionContent);
  // },

  settingUserInfo: async function () {
    const login = JSON.parse(Cookies.get("loginInfo")).data;
    const getInfo = JSON.parse(Cookies.get("adminUser")).data
    // console.log("fdasfdsafas")
    if(!login || !getInfo) return;
    // console.log("fdasfdsafasfdf8o2qhiljflidsa")
    const detectIncognitoResult = await detectIncognito();
    // console.log("detectIncognitoResult.browserName", detectIncognitoResult.browserName);
    // console.log("detectIncognitoResult.isPrivate", detectIncognitoResult.isPrivate);

    // const blockAdBlockInfo = blockAdBlock.check();
    // console.log("blockAdBlockInfo", blockAdBlockInfo);

    const userInfo = {
      // NOTE: 使用地區、工作站(真假)
      // country: 編譯給定的 ENV
      "user.regionId": getInfo.regionId,
      "user.stationId": getInfo.stationId,
      // IP: sentry 預設會紀錄
      // NOTE: 裝置
      "user.isPrivate": detectIncognitoResult.isPrivate,
      // NOTE: 帳號授權資訊
      "user.passwordLogin": getInfo.passwordLogin,
      "user.googleAuthFlag": login.googleAuthFlag,
    }
    // console.log("[sentry] userInfo", userInfo);
    // Sentry.setTags(userInfo);
    Sentry.setContext("Custom - User Info", userInfo)

    const accountInfo = {
      // NOTE: 帳號個人資訊
      id: login.operatorId,
      username: login.phoneNo,
    }
    // console.log("[sentry] accountInfo", accountInfo);
    Sentry.setUser(accountInfo);

    const adminUserInfo = {
      // NOTE: 商戶、部門、角色、催收部門、催收組別
      "admin.merchantId": login.merchantId,
      "admin.departmentId": getInfo.departmentId,
      "admin.deptManager": getInfo.deptManager,
      "admin.roleId": getInfo.roleId,
      "admin.role": login.role,
      "admin.collectTeamId": getInfo.collectTeamId,
      "admin.collectGroupId": getInfo.collectGroupId,
    }
    // console.log("[sentry] adminUserInfo", adminUserInfo);
    // NOTE: replays didn't support setContext
    Sentry.setContext("Custom - Admin Info", adminUserInfo)
    // Sentry.setTags(adminUserInfo);
  },

  // NOTICE: 使用者選擇文字後，進行鍵盤複製
  startToMonitorUserKeyboard: function () {
    const windowsKeys = ['ctrl+c', 'ctrl+v', 'ctrl+x'];
    const macKeys = ['command+c', 'command+v', 'command+x'];

    const bindUserClipboard = {
      "windows": windowsKeys.join(","),
      "mac": macKeys.join(","),
    }

    const that = this;

    const processCopyAction = function () {
      // NOTICE: 再傳送鍵盤複製的事件
      // that.addBreadcrumb({
      //   category: "User Copy",
      //   message: `keyboard`,
      // });
      Sentry.captureMessage(UserActions.copy, {
        level: "info",
        tags: {
          pageName: getPageName(),
          userAction: "copy",
        }
      })
    }
    const processPasteAction = function () {
      // NOTICE: 傳送鍵盤貼上的事件
      // that.addBreadcrumb({
      //   category: "User Pasta",
      //   message: "keyboard",
      // });
      Sentry.captureMessage(UserActions.pasta, {
        level: "info",
        tags: {
          pageName: getPageName(),
          userAction: "pasta",
        }
      })
    }
    const processCutAction = function () {
      // NOTICE: 傳送鍵盤剪下的事件
      // that.addBreadcrumb({
      //   category: "User Cut",
      //   message: "keyboard",
      // });
      Sentry.captureMessage(UserActions.cut, {
        level: "info",
        tags: {
          pageName: getPageName(),
          userAction: "cut",
        }
      })
    }

    // hotkeys("*", function (event, handler){
    //   console.log("handler", handler);
    // });

    hotkeys([bindUserClipboard.windows, bindUserClipboard.mac].join(","), function (event, handler){
      // console.log("handler.key", handler.key);
      switch (handler.key) {
        case windowsKeys[0]:
        case macKeys[0]:
        {
          processCopyAction();
          break;
        }
        case windowsKeys[1]:
        case macKeys[1]:
        {
          processPasteAction();
          break;
        }
        case windowsKeys[2]:
        case macKeys[2]:
        {
          processCutAction();
          break;
        }
        default:
          break;
      }
    });

  },
  stopToMonitorUser: function () {

  },
  startToMonitorBrowserActions: function () {
    // NOTE: Page Visibility API , https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
    // document.addEventListener("visibilitychange", function() {
    //   // NOTICE: 可以偵測切換 Tab，全螢幕滑動
    //   if (document.hidden){
    //     console.log("Browser tab is hidden")
    //   } else {
    //     console.log("Browser tab is visible")
    //   }
    // });

    window.addEventListener("visibilitychange", function() {
      // NOTICE: 可以偵測 Browser 是否離開或顯示 、切換 Tab，全螢幕滑動
      if (document.hidden){
        // console.log("Browser is hidden")
        Sentry.captureMessage(UserActions.blurBrowser, {
          level: "info",
          tags: {
            pageName: getPageName(),
            userAction: "blurBrowser",
          },
        })
      } else {
        // console.log("Browser is visible")
        Sentry.captureMessage(UserActions.focusBrowser, {
          level: "info",
          tags: {
            pageName: getPageName(),
            userAction: "focusBrowser",
          },
        })
      }
    });

    // NOTICE: 開啟使用者工具時，不會有此事件
    // window.addEventListener("blur", (event) => {
    //   console.log("Browser is blur");
    // });

    // NOTICE: 開啟使用者工具時，不會有此事件
    // window.addEventListener("focus", () => {
    //   console.log("Browser is focus");
    // })

    // NOTICE: 使用者是否開啟除錯工具
    window.addEventListener('devtoolschange', event => {
      // console.log('Is DevTools open:', event.detail.isOpen);
      // console.log('DevTools orientation:', event.detail.orientation);
      const idDevToolsOpen = event.detail.isOpen;

      if(idDevToolsOpen) {
        Sentry.captureMessage(UserActions.openDevtool, {
          level: "warning",
          tags: {
            pageName: getPageName(),
            userAction: "openDevtool",
          },
        })
      } else {
        Sentry.captureMessage(UserActions.closeDevtool, {
          level: "warning",
          tags: {
            pageName: getPageName(),
            userAction: "closeDevtool",
          },
        })
      }

    });

  },
  userLogin: function () {
    if(!Cookies.get("loginInfo") || !Cookies.get("adminUser")) {
      return;
    }
    if(!this.isMonitoring) {
      this.isMonitoring = true;
      this.settingUserInfo().then(() => {
        this.startToMonitorBrowserActions();
        this.startToMonitorUserMouseSelection();
        this.startToMonitorUserKeyboard();
      })
    } else {
      console.log("register repeat!")
    }
  },
  userLogout: function () {
    Sentry.setUser(null);
  },
  getCommonTagsInfo: function () {
    const login = JSON.parse(Cookies.get("loginInfo")).data;
    // const detectIncognitoResult = await detectIncognito();
    return {
      "user.phoneNo": login.phoneNo,
    }
  },
  addBreadcrumb: function ({category, message, data, type}) {
    Sentry.addBreadcrumb({
      type,
      level: "info",
      // event_id?: string;
      category,
      message,
      data,
      // timestamp?: number;
    });
  },
  sendBreadcrumbAndEvent: function () {

  },
  screenshot: function (eventTitle) {
    // html2canvas(document.getElementById('capture')).then(function(canvas) {
    //   const screenShotData = canvas.toDataURL("image/png", 0.5).replace("image/png", "image/octet-stream");
    //   scope.addAttachment({
    //     data: screenShotData,
    //     // attachmentType: "image/octet-stream",
    //     // contentType: "image/png",
    //     contentType: "image/octet-stream",
    //     filename: `Copy-${Application.getEnvironmentName()}-Keyboard-${login.phoneNo}-${new Date().toISOString()}.png`,
    //   })
    //   scope.addAttachment({
    //   data: selection,
    //   attachmentType: "image",
    //   contentType: "text",
    //   filename: `Copy-${Application.getEnvironmentName()}-Keyboard-${login.phoneNo}-${new Date().toISOString()}.png`,
    //   })
    // });
  },
}
window.SentryModule = SentryModule;
