import { GetPageableResponse } from '../../../shared/api/commonReponse';

export interface GetCollectOverDuePhoneUrgeListQueryString {
    appName?: string; // APP名稱
    collectorId?: number; // 跟進人員ID
    followUpResult?: string; // 跟進結果
    merchantId?: number; // 商戶ID
    orderLabel?: string; // 逾期訂單標籤
    overdueDays?: number; // 逾期天數
    phone?: string; // 用户手机号
    stage?: string; // 催收阶段(逾期阶段)
    userName?: string; // 用户姓名
}

export interface GetCollectOverDuePhoneUrgeListResponse extends GetPageableResponse {
    records: CollectOverDuePhoneUrgeListItem[];
}

export interface CollectOverDuePhoneUrgeListItem {
    appName?: string; // APP名称
    collectorName?: string; // 跟进人
    contactable?: boolean; // 是否可联
    followUpCount?: number; // 跟进次数
    followUpResult?: string; // 跟进结果
    lastOpenAppTime?: string; // 最新打开app时间
    latestRepaymentCodeAcquisitionTime?: string; // 最新还款码获取时间
    merchantName?: string; // merchantName
    orderLabel?: string; // 订单标签
    orderNo?: string; // 订单编号
    outstandingBalance?: string; // 当前帐单金额
    overDueId?: number; // 逾期訂單ID
    overdueDays?: number; // 逾期天数
    phone?: string; // 手机号
    ptpTime?: string; // PTP时间
    recentTrackingTime?: string; // 上次跟进时间
    stage?: string; // 催收阶段(逾期阶段)
    trackingRecord?: string; // 跟进纪录
    userId?: number; // 用戶ID
    userName?: string; // 用户姓名
}
