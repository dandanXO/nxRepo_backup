// GetRepayPayPlats
interface GetRepayTypesResponseObject {
    /** 支付平台 */
    payPlats?: GetRepayTypesPayPlats[];
    /** 支付类型名称 */
    payType?: string;
    /** 支付类型别名 */
    payTypeAlias?: string;
}
export type GetRepayTypesResponse = GetRepayTypesResponseObject[];

export interface GetRepayTypesPayPlats {
    /** platClass */
    platClass?: string;
    /** 平台名稱 */
    platName?: string;
}
