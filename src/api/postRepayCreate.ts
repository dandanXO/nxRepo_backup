// postRepayCreate
export interface PostRepayCreateRequestBody {
    /** 訂單號 */
    orderNo?: string;
    /** 支付类型 */
    payType?: string;
    /** 是否展期 */
    extend?: Boolean;
    /** 客戶選擇的還款金額 */
    repayAmount?:number;
    /** 还款结清后是否自动下单 */
    forceApplyAfterRepay?:boolean;
}

export interface PostRepayCreateResponse {
    /** 訂單號 */
    orderNo?: string;
    /** 支付中心單號 */
    pcOrderNo: string;
    /** 支付商平台流水号 */
    platOrderId: string;
    /** 用户姓名 */
    username: string;
    /** 手機號 */
    phoneNo: string;
    /** 支付类型 */
    payType?: string;
    /** 支付訂單金額 */
    repayAmount: number;
    /** 下一步跳轉網址 */
    nextUrl: string;
 
}

// export const mockPostRepayReceiptResponse: PostRepayCreateResponse = {
//     // "receipt": null,
//     // "previewUrl": null
// }
