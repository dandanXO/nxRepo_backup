export interface PostUserReviewRequestQuerystring {
    reason?: string;    //原因
    status?: 0 | 1 | 2; // 審核結果，0:拒絕 1:通過 2:黑單
    userIds?: number[]  // 用戶ID們
}

export type PostUserReviewErrorReponse = UserReviewError[]

export interface UserReviewError {
    errorMessage?; string;
    userId?: number
}