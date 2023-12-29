import React, {useEffect, useState} from "react";

import {useGetRechargeMutation} from "../../../external";
import {AppLocalStorage} from "../../../persistant/localstorage";
import {useSelector} from "react-redux";

import {useAllowLoginRouterRules} from "../../router/useAllowLoginRouterRules";
import {
  accountPromotedSwingSelector,
  accountPromotedWithdrawableSelector,
  toDepositAccountRemovableSelector,
  toDepositAccountSwingSelector,
  totalBalanceSheetSelector,
  totalReasableSelector
} from "../../../reduxStore/appSlice";

import { usePageNavigate } from "../../hooks/usePageNavigate";
import {renderByPlatform} from "../../utils/renderByPlatform";

import { WalletPage as PWalletPage} from "./env/pernambucana/WalletPage"
import { WalletPage as WWallletPage } from "./env/wild/WalletPage";
import { WalletPage as CWallletPage } from "./env/coco/WalletPage";
import { WalletPage as RWallletPage } from './env/riojungle/WalletPage';
import {AppLocalStorageKey} from "../../../persistant/AppLocalStorageKey";
import queryString from 'query-string';

export type IPanelType = "deposit" | "withdraw" | "record";
export type IRecordPanelType = 'deposit' | 'withdraw';

export const WallletPage = () => {

  useAllowLoginRouterRules();

  const {onClickToIndex} = usePageNavigate();

  // NOTE: querystring
  const panelType = queryString.parse(window.location.search)?.panelType || "deposit";
  const [panelMode, setPanelMode] = useState<IPanelType>(panelType as IPanelType);

  const [triggerGetRecharge, { data: rechargeData, isLoading, isSuccess, isError }] = useGetRechargeMutation();
  useEffect(() => {
    if (panelMode === "deposit") {
      triggerGetRecharge({ type: 'all', token: AppLocalStorage.getItem(AppLocalStorageKey.token) || '' })
    }
  }, [panelMode])

  // const { userAmount, user: {withdrawAmount} } = useSelector((state: RootState) => state.app.userStore as IUserStore)

  const [recordPanelMode, setRecordPanelMode] = useState<IRecordPanelType>('deposit');

  const totalBalanceSheetValue = useSelector(totalBalanceSheetSelector);
  const totalReasableValue = useSelector(totalReasableSelector);
  const toDepositAccountSwingValue = useSelector(toDepositAccountSwingSelector);
  const toDepositAccountRemovableValue = useSelector(toDepositAccountRemovableSelector);
  const accountPromotedSwingValue = useSelector(accountPromotedSwingSelector);
  const accountPromotedWithdrawableValue = useSelector(accountPromotedWithdrawableSelector);

  const totalSectionValues = {
    total:{
      balance: useSelector(totalBalanceSheetSelector)||0,
      retrievable: useSelector(totalReasableSelector)||0,
    },
    deposit:{
      balance: useSelector(toDepositAccountSwingSelector)||0,
      retrievable: useSelector(toDepositAccountRemovableSelector)||0,
    },
    promotion:{
      balance: useSelector(accountPromotedSwingSelector)||0,
      retrievable: useSelector(accountPromotedWithdrawableSelector)||0,
    }
  };

  return renderByPlatform({
    "wild777bet": (
      <WWallletPage onClickToIndex={onClickToIndex} panelMode={panelMode} setPanelMode={setPanelMode} rechargeData={rechargeData} recordPanelMode={recordPanelMode} setRecordPanelMode={setRecordPanelMode}/>
    ),
    "coco777bet": (
      <CWallletPage onClickToIndex={onClickToIndex} panelMode={panelMode} setPanelMode={setPanelMode} rechargeData={rechargeData} recordPanelMode={recordPanelMode} setRecordPanelMode={setRecordPanelMode}/>
    ),
    "riojungle777bet": (
      <RWallletPage onClickToIndex={onClickToIndex} panelMode={panelMode} setPanelMode={setPanelMode} rechargeData={rechargeData} recordPanelMode={recordPanelMode} setRecordPanelMode={setRecordPanelMode} totalSectionValues={totalSectionValues}/>
    )
  }, (
    <PWalletPage onClickToIndex={onClickToIndex} panelMode={panelMode} setPanelMode={setPanelMode} rechargeData={rechargeData} recordPanelMode={recordPanelMode} setRecordPanelMode={setRecordPanelMode}/>
  ))


}



