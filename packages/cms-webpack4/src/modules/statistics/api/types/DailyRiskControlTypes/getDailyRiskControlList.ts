export interface GetDailyRiskControlListRequestQuery {
    endTime?: string;                 // 結束時間
    startTime?: string;               // 開始時間
    riskControlModel?: string;        // 风控名稱
}

export interface GetDailyRiskControlListResponse {
    total: GetDailyRiskControlList;
    list: GetDailyRiskControlList[];
};

export interface GetDailyRiskControlList {
    day?: string;              // 日期
    excellentCount?: string;   // 极好數量
    excellentRate?: string;    // 极好比例
    goodCount?: string;        // 良好數量
    goodRate?: string;         // 良好比例
    normalCount?: string;      // 正常數量
    normalRate?: string;       // 正常比例
    ordinaryCount?: string;    // 普通數量
    ordinaryRate?: string;     // 普通比例
    rejectCount?: string;      // 拒绝數量
    rejectRate?: string;       // 拒绝比例
    requestCount?: string;     // 风控请求数
    successCount?: string;     // 回调数
}