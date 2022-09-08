/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type {  } from '../models';
import type { ApiResult_Map_string_string_ } from '../models/ApiResult_Map_string_string_';
import type { BaseRs } from '../models/BaseRs';
import type { BaseRs_object_ } from '../models/BaseRs_object_';
import type { BaseRs_Page_JointDebtDTO_ } from '../models/BaseRs_Page_JointDebtDTO_';
import type { BaseRs_Page_RiskControlModelListVo_ } from '../models/BaseRs_Page_RiskControlModelListVo_';
import type { GetOrderListRequest } from '../models/GetOrderListRequest';
import type { OrderNoBatchRequest } from '../models/OrderNoBatchRequest';
import type { OverdueReductionRequest } from '../models/OverdueReductionRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AdminOrderActionService {

    /**
     * 添加减免
     * 添加减免
     * @param request request
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static orderReductionUsingPost(
        request: OverdueReductionRequest,
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/order/addOnlineRefundPayRecords',
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 线下添加还款
     * 线下添加还款
     * @param json {"orderNo":"hs-1070213636643746","payType":"1还款2减免还款","totalMoney":"638","payName":"1支付宝3微信支付","payTime":"2018-05-18 17:07:52","payTradeNo":"20180518200040011100990085016135","remark":""}
     * @returns BaseRs_object_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addPayRecordsUsingPost(
        json: string,
    ): CancelablePromise<BaseRs_object_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/order/addPayRecords',
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 获取待还款订单
     * 根据条件获取待还款订单
     * @param json {"pageNum":1,"pageSize":10,"orderNo":"","userTrueName":"","userPhone":""}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static getRemainToOnlineRefundListUsingPost(
        json: string,
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/order/can-reduction',
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 导出订单
     * 导出订单
     * @param json json
     * @returns any OK
     * @throws ApiError
     */
    public static customerDownloadUsingPost(
        json: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/order/customerDownload',
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 导出订单
     * 导出订单
     * @param json json
     * @returns any OK
     * @throws ApiError
     */
    public static downloadUsingPost(
        json: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/order/download',
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 导出订单
     * 导出订单
     * @param json json
     * @returns any OK
     * @throws ApiError
     */
    public static downloadOnlineReliefListUsingPost(
        json: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/order/downloadOnlineReliefList',
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 获取线上还款减免记录
     * 获取线上还款减免记录
     * @param json {"status":1,"pageNum":1,"pageSize":10,"phoneNo":"","startTime":"","endTime":"","userName":"","orderNo":"","payTradeNo":""}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static getOnlineReliefListUsingPost(
        json: string,
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/order/getOnlineReliefList',
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 获取全部订单列表
     * 获取全部订单列表
     * @param request request
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static getOrderListUsingPost(
        request: GetOrderListRequest,
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/order/getOrderList',
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 获取终审订单列表
     * 获取终审订单列表
     * @param json {"pageNum":1,"pageSize":10}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static getOrderListFinalReviewUsingPost(
        json: string,
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/order/getOrderListFinalReview',
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 获取复审订单列表
     * 获取复审订单列表
     * @param json {"pageNum":1,"pageSize":10}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static getOrderListReviewUsingPost(
        json: string,
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/order/getOrderListReview',
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 获取订单放款记录
     * 获取订单放款记录
     * @param json {"orderNo":""}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static getOrderLoanInfoUsingPost(
        json: string,
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/order/getOrderLoanInfo',
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @deprecated
     * 获取用户运营商认证状态
     * 获取用户运营商认证状态
     * @param json {"orderNo":""}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static getOrderUserYysStatusUsingPost(
        json: string,
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/order/getOrderUserYYSStatus',
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 获取放款失败的订单
     * 获取放款失败的订单
     * @param json {"pageNum":1,"pageSize":10,"orderNo":"","userTrueName":"","userPhone":""}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static getPayFailedOrderUsingPost(
        json: string,
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/order/getPayFailedOrder',
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 获取待还款订单
     * 根据条件获取待还款订单
     * @param json {"pageNum":1,"pageSize":10,"orderNo":"","userTrueName":"","userPhone":""}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static getRemainToOnlineRefundListUsingPost1(
        json: string,
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/order/getRemainToOnlineRefundList',
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 获取待还款订单
     * 根据条件获取待还款订单
     * @param json {"pageNum":1,"pageSize":10,"orderNo":"","userTrueName":"","userPhone":""}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static getRemainToPayOrderListUsingPost(
        json: string,
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/order/getRemainToPayOrderList',
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 获取用户列表
     * 获取用户列表
     * @param request request
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static getUserListUsingPost(
        request: ,
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/order/getUserList',
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 输入减免金额校验
     * 输入减免金额校验
     * @param json {"status":1,"pageNum":1,"pageSize":10,"phoneNo":"","startTime":"","endTime":"","userName":"","orderNo":"","payTradeNo":""}
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static inputAmountCheckUsingPost(
        json: string,
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/order/inputAmountCheck',
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 批次放弃放款
     * 批次放弃放款
     * @param request request
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static loanRefuseUsingPost(
        request: OrderNoBatchRequest,
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/order/loan/refuse',
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 批次放款失败的重新放款
     * 批次放款失败的重新放款
     * @param request request
     * @returns ApiResult_Map_string_string_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static loanRepayUsingPost(
        request: OrderNoBatchRequest,
    ): CancelablePromise<ApiResult_Map_string_string_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/order/loan/repay',
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 添加减免
     * 添加减免
     * @param request request
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static orderReductionUsingPost1(
        request: OverdueReductionRequest,
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/order/overdue-reduction',
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 放款失败的重新放款
     * 放款失败的重新放款
     * @param json {"orderNo":""}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static reLoanPayUsingPost(
        json: string,
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/order/reLoanPay',
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 重置用户银行卡状态
     * @param json json
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static resetUserBankStatusUsingPost(
        json: string,
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/order/resetUserBankStatus',
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * @deprecated
     * 重置用户运营商认证状态
     * 重置用户运营商认证状态
     * @param json {"userId":""}
     * @returns string OK
     * @returns any Created
     * @throws ApiError
     */
    public static resetUserYysStatusUsingPost(
        json: string,
    ): CancelablePromise<string | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/order/resetUserYysStatus',
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 主动重置订单放款状态为失败
     * 主动重置订单放款状态为失败
     * @param orderNo orderNo
     * @param token token
     * @returns BaseRs OK
     * @throws ApiError
     */
    public static restOrderStatusFailUsingGet(
        orderNo?: string,
        token?: string,
    ): CancelablePromise<BaseRs> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/hs/admin/order/restOrderStatusFail',
            query: {
                'orderNo': orderNo,
                'token': token,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 风控模型分数据
     * 风控模型分数据
     * @param json json
     * @returns BaseRs_Page_RiskControlModelListVo_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static riskControlAndRePaymentUsingPost(
        json: string,
    ): CancelablePromise<BaseRs_Page_RiskControlModelListVo_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/order/riskControlAndRePayment',
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 风控模型分数据下载
     * 风控模型分数据下载
     * @param json json
     * @returns any OK
     * @throws ApiError
     */
    public static riskControlAndRePaymentDownloadUsingPost(
        json: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/order/riskControlAndRePaymentDownload',
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 风控共债信息
     * 风控共债信息
     * @param json json
     * @returns BaseRs_Page_JointDebtDTO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static getRiskJointDebtRecordUsingPost(
        json: string,
    ): CancelablePromise<BaseRs_Page_JointDebtDTO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/order/riskJointDebtRecord',
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 风控共债信息下载
     * 风控共债信息下载
     * @param json json
     * @returns any OK
     * @throws ApiError
     */
    public static riskJointDebtRecordDownloadUsingPost(
        json: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/order/riskJointDebtRecordDownload',
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 重置回冲订单放款状态为拒绝
     * 四方错误，导致放款成功，要将放款成功订单调整为放款拒绝，多适用于客户银行卡错误，但四方API错误认为放款成功
     * @param json json
     * @returns BaseRs OK
     * @throws ApiError
     */
    public static setDuplicateCallbackRecordRejectUsingGet(
        json: any,
    ): CancelablePromise<BaseRs> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/hs/admin/order/setDuplicateCallbackRecord2Reject',
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 重置回冲订单放款状态为拒绝
     * 四方错误，导致放款成功，要将放款成功订单调整为放款拒绝，多适用于客户银行卡错误，但四方API错误认为放款成功
     * @param json json
     * @returns BaseRs OK
     * @throws ApiError
     */
    public static setDuplicateCallbackRecordRejectUsingHead(
        json: any,
    ): CancelablePromise<BaseRs> {
        return __request(OpenAPI, {
            method: 'HEAD',
            url: '/hs/admin/order/setDuplicateCallbackRecord2Reject',
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * 重置回冲订单放款状态为拒绝
     * 四方错误，导致放款成功，要将放款成功订单调整为放款拒绝，多适用于客户银行卡错误，但四方API错误认为放款成功
     * @param json json
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static setDuplicateCallbackRecordRejectUsingPost(
        json: any,
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/order/setDuplicateCallbackRecord2Reject',
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 重置回冲订单放款状态为拒绝
     * 四方错误，导致放款成功，要将放款成功订单调整为放款拒绝，多适用于客户银行卡错误，但四方API错误认为放款成功
     * @param json json
     * @returns BaseRs OK
     * @returns any Created
     * @throws ApiError
     */
    public static setDuplicateCallbackRecordRejectUsingPut(
        json: any,
    ): CancelablePromise<BaseRs | any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/hs/admin/order/setDuplicateCallbackRecord2Reject',
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 重置回冲订单放款状态为拒绝
     * 四方错误，导致放款成功，要将放款成功订单调整为放款拒绝，多适用于客户银行卡错误，但四方API错误认为放款成功
     * @param json json
     * @returns BaseRs OK
     * @throws ApiError
     */
    public static setDuplicateCallbackRecordRejectUsingDelete(
        json: any,
    ): CancelablePromise<BaseRs> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/hs/admin/order/setDuplicateCallbackRecord2Reject',
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * 重置回冲订单放款状态为拒绝
     * 四方错误，导致放款成功，要将放款成功订单调整为放款拒绝，多适用于客户银行卡错误，但四方API错误认为放款成功
     * @param json json
     * @returns BaseRs OK
     * @throws ApiError
     */
    public static setDuplicateCallbackRecordRejectUsingOptions(
        json: any,
    ): CancelablePromise<BaseRs> {
        return __request(OpenAPI, {
            method: 'OPTIONS',
            url: '/hs/admin/order/setDuplicateCallbackRecord2Reject',
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * 重置回冲订单放款状态为拒绝
     * 四方错误，导致放款成功，要将放款成功订单调整为放款拒绝，多适用于客户银行卡错误，但四方API错误认为放款成功
     * @param json json
     * @returns BaseRs OK
     * @throws ApiError
     */
    public static setDuplicateCallbackRecordRejectUsingPatch(
        json: any,
    ): CancelablePromise<BaseRs> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/hs/admin/order/setDuplicateCallbackRecord2Reject',
            body: json,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * 用户信息导出订单
     * 用户信息导出订单
     * @param downloadRequest downloadRequest
     * @returns any OK
     * @throws ApiError
     */
    public static userDownloadUsingPost(
        downloadRequest: ,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/hs/admin/order/userDownload',
            body: downloadRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
