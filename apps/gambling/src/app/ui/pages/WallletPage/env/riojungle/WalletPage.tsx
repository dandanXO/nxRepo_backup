import React, { ReactElement } from "react";
import useBreakpoint from "../../../../hooks/useBreakpoint";
import { DepositPanel } from "./DepositPanel";
import { WithdrawPanel } from "../../WithdrawPanel";
import { RecordPanel } from "../../RecordPanel";

import { useAllowLoginRouterRules } from "../../../../router/useAllowLoginRouterRules";
import { TotalSectionContainer } from "./TotalSectionContainer";
import cx from "classnames";
import { BackNavigation } from "../../../../components/BackNavigation/BackNavigation";
import { IWalletPage } from "../pernambucana/WalletPage";
import TabDeposit from './assets/icon-tab-deposit.png'
import TabWithdraw from './assets/icon-tab-withdraw.png'
import TabRecord from './assets/icon-tab-record.png'



const Tabs = (props: { children: ReactElement[] }) => {
  return (
    <div className="bg-[#333333] flex flex-row rounded-[100px]">
      {props.children}
    </div>
  )
}
const TabItem = (props: { active: boolean; icon: string; name: string; onClick: () => void }) => {
  return (
    <div onClick={props.onClick} className={cx(`text-white text-xs lg:text-sm flex flex-row justify-center items-center py-2.5 px-4 rounded-[100px]`,
      { 'shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)] bg-[#8547eb] ': props.active })}>
      <img className="w-[20px] mr-2" src={props.icon} alt="tab-icon" />
      <div>{props.name}</div>
    </div>
  )
}


export const WalletPage = (props: IWalletPage) => {

  useAllowLoginRouterRules();

  const { isMobile } = useBreakpoint();

  return (
    <>
      <div className='mx-4 md:mx-24'>
        <BackNavigation
          className='pl-0 pt-5 pb-6 text-2xl'
          onClick={props.onClickToIndex}
          title={isMobile ? (<div className='absolute left-0 w-full text-center font-bold text-lg'>Conta</div>) : undefined}
        />
      </div>

      <div className={"m-4 mt-0 md:mx-24 pb-20"}>
        <TotalSectionContainer totalSectionValues={props.totalSectionValues} />

        <div id={"tab-item"} className="w-full flex justify-center items-center my-3 md:my-5">
          <Tabs>
            <TabItem active={props.panelMode === "deposit"} onClick={() => { props.setPanelMode("deposit") }} icon={TabDeposit} name={'Depósito'} />
            <TabItem active={props.panelMode === "withdraw"} onClick={() => { props.setPanelMode("withdraw") }} icon={TabWithdraw} name={'Retirar'} />
            <TabItem active={props.panelMode === "record"} onClick={() => { props.setPanelMode("record") }} icon={TabRecord} name={'Registro'} />
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



