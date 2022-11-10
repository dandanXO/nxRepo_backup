import React from "react";
import {useGetBindCardDropListQuery, usePostBankBindSaveMutation, usePostBankBindSaveToPKMutation} from "../../api";
import { useLocationOrderQueryString } from "@frontend/mobile/shared/ui";
import {I18nBindBankAccountPage} from "./i18n/I18nBindBankAccountPage";

const BindBankAccountPage = () => {
    // NOTICE: India
    const [postBankBindSave] = usePostBankBindSaveMutation();
    // NOTICE: Pakistan
    const [postBankBindSaveToPK] = usePostBankBindSaveToPKMutation();

  // NOTE: 綁定電子錢包
  const [triggerPostBankBindSaveToPKMutation, { isLoading }] = usePostBankBindSaveToPKMutation();


  // NOTE: 取得電子錢包列表
  const {currentData: bindCardDropListData,
    isLoading: isBindCardDropListDataLoading,
    isFetching: isBindCardDropListDataFetching,
  } = useGetBindCardDropListQuery({});

    // NOTE: cardholderName
    const pageQueryString = useLocationOrderQueryString();
    const cardholderName = pageQueryString.cardholderName;

    return (
      <I18nBindBankAccountPage
        postBankBindSave={postBankBindSave}
        postBankBindSaveToPK={postBankBindSaveToPK}
        triggerPostBankBindSaveToPKMutation={triggerPostBankBindSaveToPKMutation}
        bindCardDropListData={bindCardDropListData}
        cardholderName={cardholderName ?? ""}
        />
    )
};

export default BindBankAccountPage;
