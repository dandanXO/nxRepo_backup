export interface PatchProductRequestParams {
    productId: number
}

export interface PatchProductRequestBody {
    loanMaxThreshold?: number;      // 新客最大放款量
    reLoanMaxThreshold?: number;    // 次新客最大放款量: 第二次借款的老客
    weight?: number;                // 權重
}