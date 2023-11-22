import { TabItem, Tabs } from "../../../../components/TabItem/TabItem";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { PageOrModalPathEnum } from "../../../../PageOrModalPathEnum";
import useBreakpoint from "../../../../hooks/useBreakpoint";
import { LeftOutlined } from "@ant-design/icons";
import { DepositPanel } from "../../DepositPanel";
import { WithdrawPanel } from "../../WithdrawPanel";
import { RecordPanel } from "../../RecordPanel";
import { useGetRechargeMutation } from "../../../../../external";
import { AppLocalStorage } from "../../../../../persistant/localstorage";
import { useSelector } from "react-redux";

import { useAllowLoginRouterRules } from "../../../../router/useAllowLoginRouterRules";
import {
  accountPromotedSwingSelector,
  accountPromotedWithdrawableSelector,
  totalBalanceSheetSelector,
  totalReasableSelector
} from "../../../../../reduxStore/appSlice";
import { tcx } from "../../../../utils/tcx";
import { TotalSectionContainer } from "../../TotalSectionContainer";
import { CommonTableTabG } from "../../../../components/TabItem/CommonTableTabG";
import cx from "classnames";
import {BackNavigation} from "../../../../components/BackNavigation/BackNavigation";
import {Container} from "../../../../components/container/Container";
import { usePageNavigate } from "../../../../hooks/usePageNavigate";
import {AppLocalStorageKey} from "../../../../../persistant/AppLocalStorageKey";


export const WalletPage = () => {

  useAllowLoginRouterRules();
  const {onClickToIndex} = usePageNavigate();

  const [panelMode, setPanelMode] = useState<"deposit" | "withdraw" | "record">("deposit");


  const navigate = useNavigate();
  const { isMobile } = useBreakpoint();

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

  const [recordPanelMode, setRecordPanelMode] = useState<
    'deposit' | 'withdraw'
  >('deposit');

  return (
    <>

      {isMobile && (
        <BackNavigation onClick={onClickToIndex}/>
      )}

      <div className={"m-auto w-[94%] pb-16"}>
        <TotalSectionContainer />

        <div id={"tab-item"}>
          <Tabs className={"game-type-tab-list flex font-bold my-4 md:my-5  justify-center items-center"}>
            <CommonTableTabG className={cx({"flex-1":isMobile})} color={'#d3abff'} active={panelMode === "deposit"} onClick={() => {setPanelMode("deposit")}}>Depósito</CommonTableTabG>
            <CommonTableTabG className={cx({"flex-1":isMobile})}  color={'#d3abff'} active={panelMode === "withdraw"}  onClick={() => {setPanelMode("withdraw")}} >Retirar</CommonTableTabG>
            <CommonTableTabG className={cx({"flex-1":isMobile})}color={'#d3abff'} active={panelMode === "record"}  onClick={() => {setPanelMode("record")}} >Registro</CommonTableTabG>
          </Tabs>
        </div>
        <div className={''}>

          {panelMode === "deposit" ? (
            <DepositPanel data={rechargeData?.data} />
          ) : panelMode === "withdraw" ? (
            <WithdrawPanel onClickToWithdrawRecord={() => {
              setPanelMode("record");
              setRecordPanelMode("withdraw");
            }} />
          ) : (
            <RecordPanel recordPanelMode={recordPanelMode} />
          )}
        </div>


      </div>

    </>
  )
}



