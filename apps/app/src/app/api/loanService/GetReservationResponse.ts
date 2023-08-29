export type GetReservationResponse = {
    available: boolean;              // 是否可预约
    availableAmount: number;         // 可用额度
    products: ReservationProduct[];  // 预约產品  
};

export interface ReservationProduct {
    disbursalAmount: number;   // 到账金额
    dueDate: string;           // example: MM-dd-yyyy 到期日
    logoUrl: string;           // Logo URL
    productAmount: number;     // 产品借款金额
    productId: number;         // 产品ID
    productName: string        // 产品名稱
    required: boolean;         // 是否为必选
    terms: number;
    chargeFeeDetails?: IChargeFeeDetails[]
}

export interface IChargeFeeDetails {
  title: string;
  feeAmount: number;
  key: string;
  chargeStage: string;
  counting?: number;
}
