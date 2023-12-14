import { TabItem, Tabs } from "../../../../components/TabItem/TabItem";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { PageOrModalPathEnum } from "../../../../PageOrModalPathEnum";
import useBreakpoint from "../../../../hooks/useBreakpoint";
import { LeftOutlined } from "@ant-design/icons";
import { DepositPanel } from "../../components/deposit/DepositPanel";
import { WithdrawPanel } from "../../components/withdraw/WithdrawPanel";
import { RecordPanel } from "../../components/record/RecordPanel";
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
import { TotalSectionContainer } from "../../components/TotalSectionContainer";
import { CommonTableTabG } from "../../../../components/TabItem/CommonTableTabG";
import cx from "classnames";
import {BackNavigation} from "../../../../components/BackNavigation/BackNavigation";
import { usePageNavigate } from "../../../../hooks/usePageNavigate";
import {AppLocalStorageKey} from "../../../../../persistant/AppLocalStorageKey";
import {IWalletPage} from "../pernambucana/WalletPage";

export const WalletPage = (props: IWalletPage) => {

  useAllowLoginRouterRules();

  const {onClickToIndex} = usePageNavigate();
  const { isMobile } = useBreakpoint();


  return (
    <>
      {isMobile && (
        <BackNavigation onClick={onClickToIndex}/>
      )}

      <div className={"m-auto w-[94%] pb-16"}>
        <TotalSectionContainer />

        <div id={"tab-item"}>
          <Tabs className={"game-type-tab-list flex font-bold my-4 md:my-5 justify-between md:justify-center items-center"}>
            <CommonTableTabG className={cx('mr-2',{"flex-1":isMobile})} color={'#d3abff'} active={props.panelMode === "deposit"} onClick={() => {props.setPanelMode("deposit")}}>Depósito</CommonTableTabG>
            <CommonTableTabG className={cx('mr-2',{"flex-1":isMobile})}  color={'#d3abff'} active={props.panelMode === "withdraw"}  onClick={() => {props.setPanelMode("withdraw")}} >Retirar</CommonTableTabG>
            <CommonTableTabG className={cx({"flex-1":isMobile})}color={'#d3abff'} active={props.panelMode === "record"}  onClick={() => {props.setPanelMode("record")}} >Registro</CommonTableTabG>
          </Tabs>
        </div>
        <div className={''}>

          {props.panelMode === "deposit" ? (
            <DepositPanel data={props.rechargeData?.data} />
          ) : props.panelMode === "withdraw" ? (
            <WithdrawPanel onClickToWithdrawRecord={() => {
              props.setPanelMode("record");
              props.setRecordPanelMode("withdraw");
            }} />
          ) : (
            <RecordPanel recordPanelMode={props.recordPanelMode} />
          )}
        </div>


      </div>

    </>
  )
}



