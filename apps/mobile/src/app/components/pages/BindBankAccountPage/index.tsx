import React from "react";
import {useGetBindCardDropListQuery, usePostBankBindSaveMutation, usePostBankBindSaveToPKMutation} from "../../../api";
import { useLocationOrderQueryString } from "@frontend/mobile/shared/ui";
import {environment} from "../../../../environments/environment";
import {IndiaCountry} from "../../../../environments/countries/IndiaCountry";

import {PakistanCountry} from "../../../../environments/countries/PakistanCountry";
import {IndiaBindBankAccountPage} from "./i18n/components/IndiaBindBankAccountPage";
import {PakistanBindBankAccountPage} from "./i18n/components/PakistanBindBankAccountPage";
import {renderByCountry} from "../../../i18n";

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
    }, (
      <IndiaBindBankAccountPage
        postBankBindSave={postBankBindSave}
        cardholderName={cardholderName ?? ""}
      />
    ))
};

export default BindBankAccountPage;
