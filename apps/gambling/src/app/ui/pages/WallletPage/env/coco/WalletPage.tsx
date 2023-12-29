import {Tabs} from "../../../../components/TabItem/TabItem";
import React from "react";
import useBreakpoint from "../../../../hooks/useBreakpoint";
import {DepositPanel} from "../../components/deposit/DepositPanel";
import {WithdrawPanel} from "../../components/withdraw/WithdrawPanel";
import {RecordPanel} from "../../components/record/RecordPanel";

import {useAllowLoginRouterRules} from "../../../../router/hooks/useAllowLoginRouterRules";
import {TotalSectionContainer} from "../../components/TotalSectionContainer";
import {CommonTableTabG} from "../../../../components/TabItem/CommonTableTabG";
import cx from "classnames";
import {BackNavigation} from "../../../../components/BackNavigation/BackNavigation";
import {IWalletPage} from "../pernambucana/WalletPage";


export const WalletPage = (props: IWalletPage) => {

  useAllowLoginRouterRules();

  const {isMobile} = useBreakpoint();

  return (
    <>
      <div className='mx-4 md:mx-24'>
        <BackNavigation
          className='pl-0 pt-5 pb-6 text-2xl'
          onClick={props.onClickToIndex}
          title={isMobile?(<div className='absolute left-0 w-full text-center font-bold text-lg'>Conta</div>): undefined}
        />
      </div>

      <div className={"m-4 mt-0 md:mx-24 pb-20"}>
        <TotalSectionContainer />

        <div id={"tab-item"}>
          <Tabs className={"game-type-tab-list flex font-medium mt-3 mb-[18px] md:my-8 justify-between md:justify-center items-center"}>
            <CommonTableTabG className={cx("px-4 lg:px-[80px] flex-1 lg:!text-lg lg:flex-none mr-2 lg:mr-4")} active={props.panelMode === "deposit"} onClick={() => {props.setPanelMode("deposit")}}>Depósito</CommonTableTabG>
            <CommonTableTabG className={cx("px-4 lg:px-[80px] flex-1 lg:!text-lg lg:flex-none mr-2 lg:mr-4")} active={props.panelMode === "withdraw"} onClick={() => {props.setPanelMode("withdraw")}} >Retirar</CommonTableTabG>
            <CommonTableTabG className={cx("px-4 lg:px-[80px] flex-1 lg:!text-lg lg:flex-none")} active={props.panelMode === "record"} onClick={() => {props.setPanelMode("record")}} >Registro</CommonTableTabG>
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



