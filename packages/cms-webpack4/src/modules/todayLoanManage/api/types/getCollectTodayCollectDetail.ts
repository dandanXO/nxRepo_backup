import { GetPageableResponse } from '../../../shared/api/commonReponse';

export interface GetCollectTodayCollectDetailQueryString {
    collectId?: number; // 跟進人
    collectStage?: string; // 逾期階段
    collectTeamId?: number; // 催收团队
    endTime?: string; // 跟进开始日期
    merchantId?: number; // 商户id
    startTime?: string; // 跟进开始日期
}

export interface GetCollectTodayCollectDetailResponse {
    records: GetCollectTodayCollectDetailRecords;
    statistics: GetCollectTodayCollectDetailStatistics;
}

export interface GetCollectTodayCollectDetailRecords extends GetPageableResponse {
    records: GetCollectTodayCollectDetail[];
}

export interface GetCollectTodayCollectDetail {
    collectStage?: string; // 逾期階段
    collectTeam?: string; // 催收團隊
    collector?: string; // 催收人
    coverageRate?: string; // 覆蓋率
    extensionRate?: string; // 展期率
    followUpAmount?: number; // 跟進金額
    followUpDate?: string; // 跟進日
    followUpTimes?: number; // 跟進次數
    fullRepaymentOrders?: number; // 全還筆數
    initialLoginTime?: string; // 當日首次登入時間
    merchantName?: string; // 商戶名
    numberOfExtensionOrders?: number; // 展期筆數
    numberOfFollowUps?: number; // 跟進筆數
    orderPaymentRate?: string; // 單數回收率
    paymentAmountRatio?: string; // 金額回收率
    receiptAmount?: number; // 回收金額
    totalNumberOfRepaymentsReceived?: number; // 總回收筆數
}

export interface GetCollectTodayCollectDetailStatistics {
    collector?: number;
    extensionRate?: string;
    followUpAmount?: number;
    fullRepaymentOrders?: number;
    numberOfExtensionOrders?: number;
    numberOfFollowUps?: number;
    orderPaymentRate?: string;
    paymentAmountRatio?: string;
    receiptAmount?: number;
    totalNumberOfRepaymentsReceived?: number;
}
