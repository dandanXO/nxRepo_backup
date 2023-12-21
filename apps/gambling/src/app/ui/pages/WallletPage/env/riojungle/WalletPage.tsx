import React, { ReactElement } from "react";
import useBreakpoint from "../../../../hooks/useBreakpoint";
import { DepositPanel } from "../../components/deposit/DepositPanel";
import { WithdrawPanel } from "../../components/withdraw/WithdrawPanel";
import { RecordPanel } from "../../components/record/RecordPanel";

import { useAllowLoginRouterRules } from "../../../../router/useAllowLoginRouterRules";
import { TotalSectionContainer } from "./TotalSectionContainer";
import cx from "classnames";
import { BackNavigation } from "../../../../components/BackNavigation/BackNavigation";
import { IWalletPage } from "../pernambucana/WalletPage";
import TabDeposit from './assets/icon-tab-deposit.png'
import TabWithdraw from './assets/icon-tab-withdraw.png'
import TabRecord from './assets/icon-tab-record.png'
import { Container } from "../../../../components/container/Container";
import { TabItem } from "../../../../components/TabItem/env/riojungle/TabItem";



const Tabs = (props: { children: ReactElement[] }) => {
  return (
    <div className="bg-[#333333] flex flex-row rounded-[100px]">
      {props.children}
    </div>
  )
}

export const WalletPage = (props: IWalletPage) => {

  useAllowLoginRouterRules();
  const { isMobile } = useBreakpoint();
  return (
    <Container y={false} className="py-3 md:py-5 lg:py-8">
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
    </Container>
  )
}



