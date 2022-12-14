import { createHashHistory, createBrowserHistory } from "history";
import { Modal, message } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import React from 'react';
import { FormattedMessage } from "react-intl";
import { intlMsg } from '../locales/api/IntlMsg';
import * as utilSaga from './saga';
import * as utilAction from './action';
import * as utilReducer from './reducer';


const msgArry = {
    1: <FormattedMessage id='prompt.infor' />
}

const confirm = Modal.confirm;
const getUserConfirmation = (message, callback) => {
    confirm({
        title: msgArry[1],
        content: message,
        onOk () {
            callback(true);
        },
        onCancel () {
            callback(false);
        }
    });
};
let modelRef = null;
const showModal = msg => {
    if (modelRef) {
        return;
    }
    const txt = intlMsg("prompt.infor");
    modelRef = Modal.warning({
        title: txt,
        content: intlMsg(msg)
    });
    setTimeout(function () {
        modelRef.destroy();
        modelRef = null;
    }, 1500);
};

//history对象
// NOTICE: not working
// export const history = microApp ? createHashHistory({ getUserConfirmation }) : createBrowserHistory({ getUserConfirmation });

// NOTICE: Mode: MicroApp
export const history = createHashHistory({ getUserConfirmation });

// NOTICE: Mode: Single
// export const history = createBrowserHistory({ getUserConfirmation });

//判断是否登录
export const getLoginInfo = () => {
    return Cookies.get("loginInfo") ? JSON.parse(Cookies.get("loginInfo")) : "";
};

//取得登入帳號資訊
export const getAdminUserInfo = async () => {
  return JSON.parse(Cookies.get("adminUser"))
}

export const getIsSuperAdmin = () => {
  return JSON.parse(localStorage.getItem("isSuperAdmin"))
}

export const getAllMerchants = () => {
  return JSON.parse(localStorage.getItem("merchantsData"))
}

export const userLogout = () => {
  Cookies.remove('loginInfo');
  Cookies.remove("adminUser");
  delete axios.defaults.headers["Authorization"];
  localStorage.removeItem("isSuperAdmin");
  localStorage.removeItem("merchantsData");
}

const filterUrl = [
    "dueInfoDownLoad",
    "/order/download",
    "riskReviewDownLoad",
    "customerDownload",
    "/riskFee/download",
    "overduePayOrderDownload",
    "loanListDownload",
    "repaymentistDownload",
    "dcListDownload",
    "downLoadStatistics",
    "overdueStatisticDownLoad",
    "s1Download",
    "atosStatisticDownLoad",
    "summaryStatistic",
    "dayRegisterStatisticDownLoad",
    "refusedReasonStatisticDownLoad",
    "autoDeductionsStatisticDownLoad",
    "overdueStatisticDownLoad",
    "overDueListDownLoad",
    "overDueListDownLoad2",
    "overDueListDownLoadCheck",
    "overDueListDownLoadPrepare",
    "todayListDownLoad",
    "todayPayOrderDownLoad",
    "dayOrderReportDownLoad",
    "orderStatisticDownLoad",
    "overdueCollectionDownLoad1",
    "overdueCollectionDownLoad2",
    "userDownload",
    "downloadResetRecordList",
    "downLoadAssetDetail",
    "downLoadPayOrder",
    "downLoadSettleOrder",
    "getChannelSourceUVStatisticDownload",
    "riskControlAndRePaymentDownload",
    "riskJointDebtRecordDownload",
    "riskUserReviewDownLoad",
    "whiteDownload",
];

// REFACTOR: Axios
const BASE_URL = "/";
axios.defaults.baseURL = BASE_URL;
axios.defaults.headers["Content-Type"] = "application/json";
// axios.defaults.timeout=6000;
axios.interceptors.response.use(
    function (response) {

        const {
            data,
            config: { url }
        } = response;

        // NOTICE: 过滤下载订单接口
        if (filterUrl.find(item => url.indexOf(item) !== -1)) {
            return data;
        }

        /**
         * 目前暫時沒有用到 統計渠道頁面沒有使用，當有要重新使用時再打開並確認後面data.code 這段。
        *  by ArJay 2020.03.09
        * */
        /** for 標準化處理做準備， 目前只用在UVStatistics */
        // if (response.status >= 200 && response.status < 300 && !data.code) {
        //   return response;
        // }

        // NOTICE: code !== 200
        if (Number(data.code) !== 200 && data.code !== undefined) {

            // NOTICE: session过期
            if (Number(data.code) === 400) {
                // showModal('session过期，请重新登录！');
                setTimeout(() => {
                    userLogout();
                    history.push("/login");
                }, 1500);
                return;
            }

            if (Number(data.code) === 401) {
                // showModal('session过期，请重新登录！');
                setTimeout(() => {
                    history.push("/googleauth");
                }, 1500);
                return;
            }

            //数据格式{code:500, data:{msg:'aa'}} 或者{code:500,message:'aa'}
            const obj = data.data;
            let msg;
            //{code:500,message:'aa'}这种格式
            if (!obj) {
                msg = data["message"];
            } else {
                if (typeof obj === "string") {
                    try {
                        const realObj = JSON.parse(obj);
                        msg = realObj["msg"];
                    } catch (e) {
                        //msg = "系统错误";
                        msg = intlMsg("system.err");
                    }
                } else {
                    msg = obj["msg"];
                }
            }
            showModal(msg || intlMsg("system.err"));
        }

        // NOTICE: code == 200
        return response["data"];
    },
    function (error) {
        showModal(intlMsg("system.err"));
        // console.log(error.response);
        return Promise.resolve(error);
    }
);

export { axios };




const covertUrlParams = url => {
    if (!url) {
        return {};
    }
    const str = url.replace(/\?/, "");
    const arr = str.split("&");

    return arr.reduce((prev, current) => {
        const paramsArr = current.split("=");
        prev[paramsArr[0]] = paramsArr[1] === undefined ? "" : paramsArr[1];
        return prev;
    }, {});
};
export { covertUrlParams };

const orderStatus = {
    0: <FormattedMessage id="order.status.zero" />,
    1: <FormattedMessage id="order.status.one" />,
    2: <FormattedMessage id="order.status.two" />,
    3: <FormattedMessage id="order.status.three" />,
    4: <FormattedMessage id="order.status.four" />,
    5: <FormattedMessage id="order.status.five" />,
    6: <FormattedMessage id="order.status.six" />,
    7: <FormattedMessage id="order.status.seven" />,
    8: <FormattedMessage id="order.status.eight" />,
    9: <FormattedMessage id="order.status.nine" />,
    10: <FormattedMessage id="order.status.ten" />,
    11: <FormattedMessage id="order.status.eleven" />,
    12: <FormattedMessage id="order.status.twelve" />,
};

const userStatus = {
    14: <FormattedMessage id="user.status.fourteen" />,
    15: <FormattedMessage id="user.status.fifteen" />,
    16: <FormattedMessage id="user.status.sixteen" />,
    17: <FormattedMessage id="user.status.seventeen" />,
    18: <FormattedMessage id="user.status.eighteen" />,
    19: <FormattedMessage id="user.status.nineteen" />,
    20: <FormattedMessage id="user.status.twenty" />,
};


const checkRecordStatus = {
    0: <FormattedMessage id="record.status.zero" />,
    1: <FormattedMessage id="record.status.one" />,
    2: <FormattedMessage id="record.status.two" />,
    3: <FormattedMessage id="record.status.three" />,
    4: <FormattedMessage id="record.status.four" />,
    5: <FormattedMessage id="record.status.five" />,
    6: <FormattedMessage id="record.status.six" />,
    7: <FormattedMessage id="record.status.seven" />
};


const emerRelation = {

    1: <FormattedMessage id="emer.relation.parent" />,
    2: <FormattedMessage id="emer.relation.friend" />,
    3: <FormattedMessage id="emer.relation.colleague" />,
    4: <FormattedMessage id="emer.relation.relative" />,

};

/**
 * {"1": "unmarried", "2": "married", "3": "divorced", "4": "widowed"}
 */
const maritalStatus = {

    1: <FormattedMessage id="marital.status.unmarried" />,
    2: <FormattedMessage id="marital.status.married" />,
    3: <FormattedMessage id="marital.status.divorced" />,
    4: <FormattedMessage id="marital.status.widowed" />,

};


/**
 *
 * {"1": "0-15000",
 *  "2": "15001-25000",
 *  "3": "25001-35000",
 *  "4": "35001-45000",
 *  "5": "45001-55000",
 * "6": "55000 above"}
 *
 */
const salaryRange = {

    1: <FormattedMessage id="salary.range.one" />,
    2: <FormattedMessage id="salary.range.two" />,
    3: <FormattedMessage id="salary.range.three" />,
    4: <FormattedMessage id="salary.range.four" />,
    5: <FormattedMessage id="salary.range.five" />,
    6: <FormattedMessage id="salary.range.six" />,

};

const education = {
    1: <FormattedMessage id="education.10pass" />,
    2: <FormattedMessage id="education.12pass" />,
    3: <FormattedMessage id="education.12pass" />,
    4: <FormattedMessage id="education.bachelor" />,
    5: <FormattedMessage id="education.master" />,
    6: <FormattedMessage id="education.doctorate" />,
}

const position = {
    1: <FormattedMessage id="position.ordinaryStaff" />,
    2: <FormattedMessage id="position.executive" />,
    3: <FormattedMessage id="position.supervisor" />,
    4: <FormattedMessage id="position.manager" />,
    5: <FormattedMessage id="position.director" />,
    6: <FormattedMessage id="position.other" />
}

const repaymentType = {
    "3": <FormattedMessage id="page.search.list.normal.repayment" />,
    "4": <FormattedMessage id="page.search.list.normal.partial.repayment" />,
    "5": <FormattedMessage id="windowPage.full.repayment.overdue" />,
    "6": <FormattedMessage id="windowPage.part.repayment.overdue" />,
    "8": <FormattedMessage id="windowPage.extend.virtual" />
};

export { orderStatus, userStatus, checkRecordStatus, emerRelation, maritalStatus, salaryRange, education, position, repaymentType };

const showMsg = msg => {
    message.success(msg);
};
export { showMsg };

/*
export async function getData(url, method = 'get', params) {
    if (typeof url === 'undefined') {
        throw Error('url is required');
    }
    if(Object.prototype.toString.call(params) !== '[object object]') {
        throw Error('params is object');
    }
    const realUrl = BASE_URL + url;
    let requestMethod;
    const index = ['get', 'post'].indexOf(method.toLowerCase());
    requestMethod = index === -1 ? 'get' : method.toLowerCase();


    const requestOption = {
        url: realUrl,
        method: requestMethod,
        responseType: 'json'
    };
    if (requestMethod === 'get') {
       requestOption['params'] = params;
    }
    if(requestMethod === 'post') {
        requestOption['data'] = params;
    }

    try {
        const response = await axios(requestOption);

    } catch(e) {

    }




}*/

/**
 * 金额格式化
 * @param money
 * @returns {string}
 */
const convertMoneyFormat = (money) => {
    money = Number(money);
    if (!money) {
        return "0.00";
    }
    const str = money.toFixed(2) + '';
    const intSum = str.substring(0, str.indexOf(".")).replace(/\B(?=(?:\d{3})+$)/g, ',');//取到整数部分
    const dot = str.substring(str.length, str.indexOf("."))//取到小数部分搜索
    const ret = intSum + dot;
    return ret;
}

export { convertMoneyFormat, utilAction, utilReducer, utilSaga };
