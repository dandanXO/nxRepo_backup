import {PostBankBindSaveRequest, PostPKBankBindSaveRequest} from "../../../../../api/postBankBindSave";
import {GetBindCardDropListResponse} from "../../../../../api/GetBindCardDropList";

export type IUseBindBankAccountPage = {
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

export type IPakistanUseBindBankAccountPage = {
  // NOTE: 取得電子錢包列表
  bindCardDropListData?: GetBindCardDropListResponse;
}


export type IUseBindBankAccountPageForBengal = {
  triggerPostBankBindSaveToBengalMutation: any;
}
