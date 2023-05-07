export type PostLoanQuotaRefreshResponse = {
    effective: boolean;
    // 用户额度是否有效

    quotaExpireTime: string;
    // 用户额度有效时间
};
