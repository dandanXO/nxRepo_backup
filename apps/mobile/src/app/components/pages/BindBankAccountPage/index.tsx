import React from "react";
import {
  useGetBindCardDropListQuery,
  usePostBankBindSaveMutation,
  usePostBankBindSaveToBangladeshMutation,
  usePostBankBindSaveToPKMutation
} from "../../../api";
import {useLocationOrderQueryString} from "@frontend/mobile/shared/ui";
import {IndiaCountry} from "../../../../environments/config/countries/IndiaCountry";

import {PakistanCountry} from "../../../../environments/config/countries/PakistanCountry";
import {IndiaBindBankAccountPage} from "./i18n/components/IndiaBindBankAccountPage";
import {PakistanBindBankAccountPage} from "./i18n/components/PakistanBindBankAccountPage";
import {renderByCountry} from "../../../i18n";
import {BangladeshCountry} from "../../../../environments/config/countries/BangladeshCountry";
import {BangladeshBindBankAccountPage} from "./i18n/components/BangladeshBindBankAccountPage";

const BindBankAccountPage = () => {
    // NOTICE: Common
    // NOTE: cardholderName
    const pageQueryString = useLocationOrderQueryString();
    const cardholderName = pageQueryString.cardholderName;

    // NOTICE: India
    // NOTE: 綁定銀行卡
    const [postBankBindSave] = usePostBankBindSaveMutation();

    // NOTICE: Pakistan
    // NOTE: 綁定銀行卡
    const [postBankBindSaveToPK] = usePostBankBindSaveToPKMutation();

    // NOTICE: Bangladesh
    // NOTE: 綁定手機
    const [triggerPostBankBindSaveToBangladeshMutation] = usePostBankBindSaveToBangladeshMutation();

    // NOTE: 取得電子錢包列表
    const {currentData: bindCardDropListData,
      isLoading: isBindCardDropListDataLoading,
      isFetching: isBindCardDropListDataFetching,
    } = useGetBindCardDropListQuery({});

    // NOTE: 綁定電子錢包
    const [triggerPostBankBindSaveToPKMutation, { isLoading }] = usePostBankBindSaveToPKMutation();


    return renderByCountry({
      // NOTICE: default 0 index
      [IndiaCountry.country]: (
        <IndiaBindBankAccountPage
          postBankBindSave={postBankBindSave}
          cardholderName={cardholderName ?? ""}
        />
      ),
      [PakistanCountry.country]: (
        <PakistanBindBankAccountPage
          postBankBindSaveToPK={postBankBindSaveToPK}
          triggerPostBankBindSaveToPKMutation={triggerPostBankBindSaveToPKMutation}
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
        postBankBindSave={postBankBindSave}
        cardholderName={cardholderName ?? ""}
      />
    ))
};

export default BindBankAccountPage;
