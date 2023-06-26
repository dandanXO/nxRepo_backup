export interface OrderReviewTypes {
    addTime?: string; // 申請時間
    appName?: string; // APP名稱
    applyChannel?: string; // 申請渠道
    deviceMoney?: number; // 申請金額
    dummy?: boolean; // 空放訂單
    id?: number; // 訂單ID
    lendMoney?: number; // 到帳金額
    oldMember?: boolean; // 老客下單
    orderNo?: string; // 訂單號
    phoneNo?: string; // 手機號
    productName?: string; // 產品名稱
    merchantName?: string; // 商户名
    provider?: string; // 風控應用
    riskRank?: string; // 風控標籤
    userName?: string; // 姓名
    userId?: number; // userid
}
