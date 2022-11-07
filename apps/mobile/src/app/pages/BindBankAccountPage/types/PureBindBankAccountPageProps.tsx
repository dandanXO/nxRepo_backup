import {PostBankBindSaveRequest, PostPKBankBindSaveRequest} from "../../../api/postBankBindSave";

export type PureBindBankAccountPageProps = {
  // postBankBindSave: (requestBody: PostBankBindSaveRequest) => any;
  cardholderName: string;
  postBankBindSave?: (requestBody: PostBankBindSaveRequest) => any;
  postBankBindSaveToPK?: (requestBody: PostPKBankBindSaveRequest) => any;
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


