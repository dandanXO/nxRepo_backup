import React from "react";

import {useLocationOrderQueryString} from "@frontend/mobile/shared/ui";

import {IndiaBindBankAccountPage} from "./i18n/components/IndiaBindBankAccountPage";
import {PakistanBindBankAccountPage} from "./i18n/components/PakistanBindBankAccountPage";

import {BangladeshBindBankAccountPage} from "./i18n/components/BangladeshBindBankAccountPage";
import {
  useLazyGetBindCardDropListQuery,
  usePostBankBindSaveMutation,
  usePostBankBindSaveToBangladeshMutation,
  usePostBankBindSaveToPKMutation
} from "../../../api/rtk"
import {renderByCountry} from "../../../modules/i18n";
import {IndiaCountry} from "../../../domain/country/constants/IndiaCountry";
import {PakistanCountry} from "../../../domain/country/constants/PakistanCountry";
import {BangladeshCountry} from "../../../domain/country/constants/BangladeshCountry";
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

    // NOTICE: Bangladesh
    // NOTE: 綁定手機
    const [triggerPostBankBindSaveToBangladeshMutation] = usePostBankBindSaveToBangladeshMutation();

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
      // NOTICE: REFACTOR ME
      [BangladeshCountry.country]: (
        <BangladeshBindBankAccountPage
          triggerPostBankBindSaveToBangladeshMutation={triggerPostBankBindSaveToBangladeshMutation}
        />
      )
    }, (
      <IndiaBindBankAccountPage
        isLoadingPostBankBindSave={isLoadingPostBankBindSave}
        postBankBindSave={postBankBindSave}
        cardholderName={cardholderName ?? ""}
      />
    ))
};

export default BindBankCardPage;
