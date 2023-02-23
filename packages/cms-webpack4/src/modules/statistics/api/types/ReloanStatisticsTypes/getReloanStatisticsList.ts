export interface GetReloanStatisticsListRequestQuerystring {

    appName?: string;                 // APP名称
    merchantId?: number | '';         // 商戶Id
    productId?: number | '';          // 產品Id
    repayStartDate?: string;          // 还款日期起
    repayEndDate?: string;            // 还款日期迄
}

export type GetReloanStatisticsListResponse = GetReloanStatisticsList[];

export interface GetReloanStatisticsList {

    addDateNewUserOrderCount?: string;                // 纯新客订单数
    addDateReLoanOrderCount?: string;                 // 复借订单数
    addDateRenewOrderCount?: string;                  // 次新客订单数
    expireDate?: string;                              // 到期日
    expireDateNewUserOrderCount?: string;             // 新客到期订单数
    expireDateNewUserOrderUserCount?: string;         // 新客到期用户数
    expireDateNewUserRepayOrderCount?: string;        // 新客还款订单数
    expireDateOldUserOrderCount?: string;             // 老客到期订单数
    expireDateOldUserOrderRepayCount?: string;        // 老客还款订单数
    expireDateOldUserOrderUserCount?: string;         // 老客到期用户数
    expireDateOrderCount?: string;                    // 到期总订单数
    expireDateOrderUserCount?: string;                // 到期总用户数
    expireDateRepayNewUserOrderUserCount?: string;    // 新客还款用户数
    expireDateRepayOldUserOrderUserCount?: string;    // 老客还款用户数
    expireDateRepayOrderCount?: string;               // 还款总订单数
    expireDateRepayOrderUserCount?: string;           // 还款总用户数
    orderReLoanRate?: string;                         // 订单复借率
    reLoanUserCount?: string;                         // 复借用户数
    userReLoanRate?: string;                          // 用户复借率

}

