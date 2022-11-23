export interface PostOrderReviewRequestQuerystring {
    orderNos?: string[];
    reason?: string;    //原因
    remark?: string;
    status?: 0 | 1; // 審核結果，0:拒絕 1:通過
}

export type PostOrderReviewErrorReponse = OrderReviewError[]

export interface OrderReviewError {
    errorMessage?; string;
    userId?: number
}