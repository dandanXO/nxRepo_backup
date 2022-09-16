export interface GetAvailableMerchantResponse extends Array<GetAvailableMerchantResponseList> {
    data: GetAvailableMerchantResponseList[];
  }
export interface GetAvailableMerchantResponseList {
    /** 商户号 */
    mchNo?: string;

    /** 商户编号 */
    merchantId?: number;
    
    /** 商户名称 */
    name?: string;

}