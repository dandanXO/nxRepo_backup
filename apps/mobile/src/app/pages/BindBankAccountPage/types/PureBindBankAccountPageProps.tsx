import {PostBankBindSaveRequest, PostPKBankBindSaveRequest} from "../../../api/postBankBindSave";
import {GetBindCardDropListResponse} from "../../../api/GetBindCardDropList";

export type PureBindBankAccountPageProps = {
  // NOTE: 綁定
  cardholderName: string;
  postBankBindSave?: (requestBody: PostBankBindSaveRequest) => any;
  postBankBindSaveToPK?: (requestBody: PostPKBankBindSaveRequest) => any;

  // NOTE: 電子錢包
  // NOTE: 綁定電子錢包
  triggerPostBankBindSaveToPKMutation?: (requestBody: PostPKBankBindSaveRequest) => any;

  // NOTE: 取得電子錢包列表
  bindCardDropListData?: GetBindCardDropListResponse;

}

// export type IndiaPureBindBankAccountPageProps = PureBindBankAccountPageProps & {
//   india: "india";
//   postBankBindSave: (requestBody: PostPKBankBindSaveRequest) => any;
// }
//
// export type PKPureBindBankAccountPageProps = PureBindBankAccountPageProps & {
//   pakistan: "pakistan";
//   postBankBindSaveToPK: (requestBody: PostPKBankBindSaveRequest) => any;
// }

// export const isIndia = (p: any): p is IndiaPureBindBankAccountPageProps => !!p.india
// export const isToggle = (p: any): p is PKPureBindBankAccountPageProps => !!p.pakistan


