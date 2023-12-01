import {Tabs} from "../../../../components/TabItem/TabItem";
import React from "react";
import useBreakpoint from "../../../../hooks/useBreakpoint";
import {DepositPanel} from "../../DepositPanel";
import {WithdrawPanel} from "../../WithdrawPanel";
import {RecordPanel} from "../../RecordPanel";

import {useAllowLoginRouterRules} from "../../../../router/useAllowLoginRouterRules";
import {TotalSectionContainer} from "../../TotalSectionContainer";
import {CommonTableTabG} from "../../../../components/TabItem/CommonTableTabG";
import cx from "classnames";
import {BackNavigation} from "../../../../components/BackNavigation/BackNavigation";
import {IWalletPage} from "../pernambucana/WalletPage";


export const WalletPage = (props: IWalletPage) => {

  useAllowLoginRouterRules();

  const {isMobile} = useBreakpoint();

  return (
    <>
      <div className='mx-auto w-[94%]'>
        <BackNavigation
          className='pl-0 pt-5 pb-6 text-2xl'
          onClick={props.onClickToIndex}
          title={isMobile?(<div className='absolute left-0 w-full text-center font-bold text-lg'>Conta</div>): undefined}
        />
      </div>

      <div className={"m-auto w-[94%] pb-16"}>
        <TotalSectionContainer />

        <div id={"tab-item"}>
          <Tabs className={"game-type-tab-list flex font-bold my-4 md:my-5  justify-center items-center"}>
            <CommonTableTabG className={cx("px-4 md:px-[80px] flex-1 md:flex-none")} color={'#d3abff'} active={props.panelMode === "deposit"} onClick={() => {props.setPanelMode("deposit")}}>Depósito</CommonTableTabG>
            <CommonTableTabG className={cx("px-4 md:px-[80px] flex-1 md:flex-none")} color={'#d3abff'} active={props.panelMode === "withdraw"} onClick={() => {props.setPanelMode("withdraw")}} >Retirar</CommonTableTabG>
            <CommonTableTabG className={cx("px-4 md:px-[80px] flex-1 md:flex-none")} color={'#d3abff'} active={props.panelMode === "record"} onClick={() => {props.setPanelMode("record")}} >Registro</CommonTableTabG>
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



