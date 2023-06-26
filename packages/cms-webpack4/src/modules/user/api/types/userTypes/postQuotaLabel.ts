export interface PostQuotaLabelRequestBody {
    quotaLabelId?: number; //額度標籤ID ; 非0代表新增 , 傳0代表移除
    userIds?: number[]; //用戶ids
}
