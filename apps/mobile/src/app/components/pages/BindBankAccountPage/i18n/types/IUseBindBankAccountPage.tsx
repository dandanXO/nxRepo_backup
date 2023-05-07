import {
    PostBankBindSaveRequest,
    PostPKBankBindSaveRequest,
} from "../../../../../api/postBankBindSave";
import { GetBindCardDropListResponse } from "../../../../../api/GetBindCardDropList";

export type IUseBindBankAccountPage = {
    // NOTE: 綁定
    cardholderName: string;

    isLoadingPostBankBindSave?: boolean;
    postBankBindSave?: (requestBody: PostBankBindSaveRequest) => any;

    isLoadingPostBankBindSaveToPK?: boolean;
    postBankBindSaveToPK?: (requestBody: PostPKBankBindSaveRequest) => any;

    // NOTE: 電子錢包
    // NOTE: 綁定電子錢包
    isPostBankBindSaveToPKMutationLoading?: boolean;
    triggerPostBankBindSaveToPKMutation?: (
        requestBody: PostPKBankBindSaveRequest
    ) => any;

    // NOTE: 取得電子錢包列表
    bindCardDropListData?: GetBindCardDropListResponse;

    triggerGetBindCardDropListQuery?: any;
};

export type IPakistanUseBindBankAccountPage = {
    // NOTE: 取得電子錢包列表
    bindCardDropListData?: GetBindCardDropListResponse;
};

export type IUseBindBankAccountPageForBangladesh = {
    triggerPostBankBindSaveToBangladeshMutation: any;
};
