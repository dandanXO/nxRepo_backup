export type GetCollectOverDueOrderDetailQueryString = {
    collectId?: string;
}

export type GetCollectOverDueOrderDetailResponse = {
    expireTime: string;
    amountDue: number
};
