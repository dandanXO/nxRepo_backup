export interface PostNewCustomersDailyConversionRatesDownloadRequestBody {
    channelId?: number | '';   // 渠道Id
    endTime?: string;          // 结束时间
    merchantId?: number | '';  // 商戶Id
    startTime?: string;        // 开始时间
}