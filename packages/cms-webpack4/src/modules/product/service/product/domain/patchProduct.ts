export interface PatchProductRequestBody {
    newGuestMaxThreshold?: number; // 新客最大放款量
    renewMaxThreshold?: number; // 次新客最大放款量: 第二次借款的老客
    weight?: number; // 權重
    newGuestProductDisplayStatus?: boolean; // 新客優先滿足顯示開關
    renewProductDisplayStatus?: boolean; // 次新客優先滿足顯示開關
}
