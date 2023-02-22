import { GetPageableResponse } from "../../../../shared/api/commonReponse";
export interface GetNewCustomersDailyConversionRatesRequestQuerystring {
    channelId?: number | '';          // 渠道Id
    endTime?: string;                 // 结束时间
    startTime?: string;               // 开始时间
    merchantId?: number | '';         // 商戶Id
    
    // api是舊的，要接 page跟size(而不是swagger上面寫pageNumber、pageSize)
    page?: number;
    size?: number;
    sortField?: string;
    sortOrder?: string;

}

export interface GetNewCustomersDailyConversionRatesResponse {
    records: NewCustomersDailyConversionRates[];
}
export interface NewCustomersDailyConversionRates {

    applyCount?: string;                    // 订单申请量
    applyRate?: string;                     // 申请转化率
    appsCount?: string;                     // AppList认证數
    appsCountRate?: string;                 // AppList认证率
    authCount?: string;                     // 紧急联系人认证數
    authRate?: string;                      // 紧急联系人认证率
    bankCount?: string;                     // 绑卡认证數
    bankRate?: string;                      // 绑卡认证率
    cdrCount?: string;                      // 信通话认证數
    cdrCountRate?: string;                  // 短信通话认证率
    contactCount?: string;                  // 通讯录认证數
    contactRate?: string;                   // 通讯录认证百分比
    day?: string;                           // 日期
    examPassCount?: string;                 // 风控通过數
    examPassCountRate?: string;             // 风控通过(百分比)
    idCardCount?: string;                   // 实名认证數
    idCardRate?: string;                    // 实名认证率
    innerRiskControlPassCount?: string;     // 內部风控通过數
    innerRiskControlPassRate?: string;      // 內部风控通过率
    livenessCount?: string;                 // Face id认证數
    livenessCountRate?: string;             // Face id认证率
    loanCount?: string;                     // 新客放款量
    loanRate?: string;                      // 放款转化率
    otpCount?: string;                      // OTP发送量
    outerRiskControlPassCount?: string;     // 外部风控通过數
    outerRiskControlPassRate?: string;      // 外部风控通过率
    panCount?: string;                      // panCount
    panCountRate?: string;                  // panCountRate
    photoCount?: string;                    // 相冊认证數
    photoCountRate?: string;                // 相冊认证百分比
    registerCount?: string;                 // 註冊量
    registerRate?: string;                  // 註冊百分比
    repayCount?: string;                    // 已還數量
    repayRate?: string;                     // 還款转化率
    yysCount?: string;                      // yysCount
    yysRate?: string;                       // yysRate

}

export type GetNewCustomersDailyConversionRatesProps = GetNewCustomersDailyConversionRatesResponse & GetPageableResponse;
