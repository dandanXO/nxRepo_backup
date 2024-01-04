import {BackNavigation} from "../../../../components-bs/BackNavigation/BackNavigation";
import {TabItem, Tabs} from "../../../../components-bs/TabItem/TabItem";
import {TotalSectionContainer} from "../../components/TotalSectionContainer";
import {tcx} from "../../../../utils/tcx";
import {DepositPanel} from "../../components/deposit/DepositPanel";
import {WithdrawPanel} from "../../components/withdraw/WithdrawPanel";
import {RecordPanel} from "../../components/record/RecordPanel";
import React from "react";
import useBreakpoint from "../../../../hooks/useBreakpoint";
import {IPanelType, IRecordPanelType} from "../../index";
import { GetRechargeResponseOption, RechargeResponseConfig ,GetRechargeResponse} from "apps/gambling/src/app/external/RechargeInfoGetEndpoint";

export type TotalSectionType = 'total' | 'deposite' | 'promotion'
export interface ITotalSectionValues {
  [key: string]: {
    balance: number;
    retrievable: number;
  };
}

export interface IRechargeData{
  "config": RechargeResponseConfig[],
  "options": GetRechargeResponseOption;
}

export type IWalletPage = {
  onClickToIndex: () => void;
  panelMode: IPanelType;
  setPanelMode: (type: IPanelType) => void;
  rechargeData: any;

  recordPanelMode: IRecordPanelType;
  setRecordPanelMode: (type: IRecordPanelType) => void;
  totalSectionValues?: ITotalSectionValues;

}
export const WalletPage = (props: IWalletPage) => {
  const { isMobile } = useBreakpoint();
console.log(props?.rechargeData)
  return (
    <>
      {isMobile && (
        <div className={"pt-4 px-4 pb-4 bg-main sticky top-0 left-0 right-0 z-20 flex flex-col justify-start items-start"}>

          <BackNavigation onClick={props.onClickToIndex}/>

          <div className={"w-full"}>
            <Tabs className={"game-type-tab-list w-full"}>
              <TabItem pureColor={true} className="flex-1 mr-2" size="small" name={"Depósito"} active={props.panelMode === "deposit"} onClick={() => {
                props.setPanelMode("deposit")
              }} />
              <TabItem pureColor={true} className="flex-1 mr-2" size="small"  name={"Retirar"} active={props.panelMode === "withdraw"} onClick={() => {
                props.setPanelMode("withdraw")
              }} />
              <TabItem pureColor={true} className="flex-1 mr-2" size="small"  name={"Registro"} active={props.panelMode === "record"} onClick={() => {
                props.setPanelMode("record")
              }} />
            </Tabs>
          </div>
        </div>
      )}

      <div className={"p-4 md:p-8"}>
        <TotalSectionContainer/>
        {!isMobile && (
          <section id={"tab-item"}>
            <Tabs className={"game-type-tab-list"}>
              <TabItem pureColor={true} className="mr-3" name={"Depósito"} active={props.panelMode === "deposit"} size={"big"} onClick={() => {
                props.setPanelMode("deposit")
              }}
              />
              <TabItem pureColor={true} className="mr-3" name={"Retirar"} active={props.panelMode === "withdraw"} size={"big"} onClick={() => {
                props.setPanelMode("withdraw")
              }} />
              <TabItem pureColor={true} className="mr-3" name={"Registro"} active={props.panelMode === "record"} size={"big"} onClick={() => {
                props.setPanelMode("record")
              }} />
            </Tabs>
          </section>
        )}
        <div className={tcx("",
          [`p-8 border border-solid border-main-primary-main lg:p-14 mt-10 bg-[var(--game-block)] rounded-2xl `, !isMobile]
        )}>

          {props.panelMode === "deposit" ? (
            <DepositPanel data={props?.rechargeData?.data} />
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
