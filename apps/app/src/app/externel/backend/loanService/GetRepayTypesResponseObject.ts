import {GetRepayTypesPayPlats} from './GetRepayTypesPayPlats';

export interface GetRepayTypesResponseObject {
  /** 支付平台 */
  payPlats?: GetRepayTypesPayPlats[];
  /** 支付类型名称 */
  payType?: string;
  /** 支付类型别名 */
  payTypeAlias?: string;
}
