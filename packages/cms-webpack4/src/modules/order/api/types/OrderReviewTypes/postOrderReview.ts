export interface PostOrderReviewRequestQuerystring {
    reason?: string;    //原因
    status?: 0 | 1 | 2; // 審核結果，0:拒絕 1:通過 2:黑單
    userIds?: number[]  // 用戶ID們
}

export type PostOrderReviewErrorReponse = OrderReviewError[]

export interface OrderReviewError {
    errorMessage?; string;
    userId?: number
}