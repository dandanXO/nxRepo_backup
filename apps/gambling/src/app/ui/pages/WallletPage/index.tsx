import React, {useEffect, useState} from "react";

import {useGetRechargeMutation} from "../../../external";
import {AppLocalStorage} from "../../../persistant/localstorage";
import {useSelector} from "react-redux";

import {useAllowLoginRouterRules} from "../../router/useAllowLoginRouterRules";
import {
  accountPromotedSwingSelector,
  accountPromotedWithdrawableSelector,
  totalBalanceSheetSelector,
  totalReasableSelector
} from "../../../reduxStore/appSlice";

import { usePageNavigate } from "../../hooks/usePageNavigate";
import {renderByPlatform} from "../../utils/renderByPlatform";

import { WalletPage as PWalletPage} from "./env/pernambucana/WalletPage"
import { WalletPage as WWallletPage } from "./env/wild/WalletPage";
import { WalletPage as CWallletPage } from "./env/coco/WalletPage";
import {AppLocalStorageKey} from "../../../persistant/AppLocalStorageKey";

export type IPanelType = "deposit" | "withdraw" | "record";
export type IRecordPanelType = 'deposit' | 'withdraw';

export const WallletPage = () => {

  useAllowLoginRouterRules();

  const {onClickToIndex} = usePageNavigate();


  const [panelMode, setPanelMode] = useState<IPanelType>("deposit");


  const [triggerGetRecharge, { data: rechargeData, isLoading, isSuccess, isError }] = useGetRechargeMutation();
  useEffect(() => {
    if (panelMode === "deposit") {
      triggerGetRecharge({ type: 'all', token: AppLocalStorage.getItem(AppLocalStorageKey.token) || '' })
    }
  }, [panelMode])
  // const { userAmount, user: {withdrawAmount} } = useSelector((state: RootState) => state.app.userStore as IUserStore)

  const totalBalanceSheetValue = useSelector(totalBalanceSheetSelector);
  const totalReasableValue = useSelector(totalReasableSelector);

  const accountPromotedSwingValue = useSelector(accountPromotedSwingSelector);
  const accountPromotedWithdrawableValue = useSelector(accountPromotedWithdrawableSelector);

  const [recordPanelMode, setRecordPanelMode] = useState<IRecordPanelType>('deposit');


  return renderByPlatform({
    "wild777bet": (
      <WWallletPage />
    ),
    "coco777bet": (
      <CWallletPage />
    ),
  }, (
    <PWalletPage onClickToIndex={onClickToIndex} panelMode={panelMode} setPanelMode={setPanelMode} rechargeData={rechargeData} recordPanelMode={recordPanelMode} setRecordPanelMode={setRecordPanelMode}/>
  ))


}



