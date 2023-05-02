import React from "react";

import {useLocationOrderQueryString} from "@frontend/mobile/shared/ui";

import {IndiaBindBankAccountPage} from "./components/i18n/IndiaBindBankAccountPage";
import {PakistanBindBankAccountPage} from "./components/i18n/PakistanBindBankAccountPage";

import {
  useLazyGetBindCardDropListQuery,
  usePostBankBindSaveMutation,
  usePostBankBindSaveToBangladeshMutation,
  usePostBankBindSaveToPKMutation
} from "../../../api/rtk"
import {renderByCountry} from "../../../modules/i18n";
import {IndiaCountry} from "../../../../../../../libs/shared/domain/src/country/IndiaCountry";
import {PakistanCountry} from "../../../../../../../libs/shared/domain/src/country/PakistanCountry";
import {BangladeshCountry} from "../../../../../../../libs/shared/domain/src/country/BangladeshCountry";
import { useSelector } from "react-redux";


const BindBankCardPage = () => {
    // NOTICE: Common
    // NOTE: cardholderName
    const pageQueryString = useLocationOrderQueryString();
    // const cardholderName = pageQueryString.cardholderName;
    const cardholderName = useSelector((state:any) => state.indexPage.user.userName) || pageQueryString.cardholderName;

    // NOTICE: India
    // NOTE: 綁定銀行卡
    const [postBankBindSave, { isLoading: isLoadingPostBankBindSave}] = usePostBankBindSaveMutation();

    // NOTICE: Pakistan
    // NOTE: 綁定銀行卡
    const [postBankBindSaveToPK, { isLoading: isLoadingPostBankBindSaveToPK}] = usePostBankBindSaveToPKMutation();


    // NOTE: 取得電子錢包列表(IN 沒有, PK 有, BD未來有)
    const [triggerGetBindCardDropListQuery, {currentData: bindCardDropListData,
      isLoading: isBindCardDropListDataLoading,
      isFetching: isBindCardDropListDataFetching,
    } ] = useLazyGetBindCardDropListQuery({})

    // NOTE: 綁定電子錢包
    const [triggerPostBankBindSaveToPKMutation, { isLoading: isPostBankBindSaveToPKMutationLoading}] = usePostBankBindSaveToPKMutation();

    return renderByCountry({
      // NOTICE: default 0 index
      [IndiaCountry.country]: (
        <IndiaBindBankAccountPage
          isLoadingPostBankBindSave={isLoadingPostBankBindSave}
          postBankBindSave={postBankBindSave}
          cardholderName={cardholderName ?? ""}
        />
      ),
      [PakistanCountry.country]: (
        <PakistanBindBankAccountPage
          isLoadingPostBankBindSaveToPK={isLoadingPostBankBindSaveToPK}
          postBankBindSaveToPK={postBankBindSaveToPK}
          isPostBankBindSaveToPKMutationLoading={isPostBankBindSaveToPKMutationLoading}
          triggerPostBankBindSaveToPKMutation={triggerPostBankBindSaveToPKMutation}
          triggerGetBindCardDropListQuery={triggerGetBindCardDropListQuery}
          bindCardDropListData={bindCardDropListData}
          cardholderName={cardholderName ?? ""}
        />
      ),
    }, (
        <PakistanBindBankAccountPage
        isLoadingPostBankBindSaveToPK={isLoadingPostBankBindSaveToPK}
        postBankBindSaveToPK={postBankBindSaveToPK}
        isPostBankBindSaveToPKMutationLoading={isPostBankBindSaveToPKMutationLoading}
        triggerPostBankBindSaveToPKMutation={triggerPostBankBindSaveToPKMutation}
        triggerGetBindCardDropListQuery={triggerGetBindCardDropListQuery}
        bindCardDropListData={bindCardDropListData}
        cardholderName={cardholderName ?? ""}
      />
    ))
};

export default BindBankCardPage;
