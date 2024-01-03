import React from "react";
import useBreakpoint from "../../../../hooks/useBreakpoint";
import {DepositPanel} from "../../components/deposit/DepositPanel";
import {WithdrawPanel} from "../../components/withdraw/WithdrawPanel";
import {RecordPanel} from "../../components/record/RecordPanel";

import {useAllowLoginRouterRules} from "../../../../router/hooks/useAllowLoginRouterRules";
import {TotalSectionContainer} from "./TotalSectionContainer";
import {IWalletPage} from "../pernambucana/WalletPage";
import TabDeposit from './assets/icon-tab-deposit.png'
import TabWithdraw from './assets/icon-tab-withdraw.png'
import TabRecord from './assets/icon-tab-record.png'
import {PageContainer} from "../../../../components-bs/PageContainer";
import {TabItem} from "../../../../components-bs/TabItem/env/riojungle/TabItem";
import {Tabs} from "../../../../components/Tabs";

export const WalletPage = (props: IWalletPage) => {

  useAllowLoginRouterRules();
  const { isMobile } = useBreakpoint();
  return (
    <PageContainer y={false} className="py-3 md:py-5 lg:py-8">
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
    </PageContainer>
  )
}



