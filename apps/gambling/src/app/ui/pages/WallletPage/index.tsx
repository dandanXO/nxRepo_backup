import styled from "styled-components";
import { TabItem, Tabs } from "../../components/TabItem";
import { useEffect, useState } from "react";
import cx from "classnames";
import { useNavigate } from "react-router";
import { PageOrModalPathEnum } from "../../PageOrModalPathEnum";
import useBreakpoint from "../../hooks/useBreakpoint";
import { LeftOutlined } from "@ant-design/icons";
import { DepositPanel } from "./DepositPanel";
import { WithdrawPanel } from "./WithdrawPanel";
import { RecordPanel } from "./RecordPanel";
import { useGetRechargeMutation, useGetWithdrawLimitMutation } from "../../../external";
import { AppLocalStorage } from "../../../persistant/localstorage";
import { useSelector } from "react-redux";
import { RootState } from "../../../reduxStore";

import { useAllowLoginRouterRules } from "../../router/useAllowLoginRouterRules";
import { IUserStore } from "../../../gateway/socket";
import {
  accountPromotedSwingSelector, accountPromotedWithdrawableSelector,
  totalBalanceSheetSelector,
  totalReasableSelector
} from "../../../reduxStore/appSlice";
import { useAutoUpdateBalance } from "../../hooks/useAutoUpdateBalance";
import { tcx } from "../../utils/tcx";
import {TotalSectionContainer} from "./TotalSectionContainer";






export const DepositConfirmButton = styled.div`
  cursor: pointer;
  background: linear-gradient(270deg,#FFA303 0%,#E51606 100%);
  box-shadow: inset 0 0 10px rgba(255,255,255,.5);
  border-radius: 10px;
  width: 400px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 60px auto 0;
  transition: all .1s ease-in-out;
`;


const StyledRecordButton = styled.button.attrs<{ className?: string; }>((props) => ({
  className: cx(props.className, "text-transparent"),
}))`
  width: 115px;
  height: 40px;
  border-radius: 10px;
  background: transparent;
  margin-right: 15px;

  display: flex;
  justify-content: center;
  align-items: center;
  color: #6c7083;

  letter-spacing: 0;
  font-size: 16px;

`

export type IRecordButton = {
  name?: string;
  active: boolean;
  className?: string;
  // size?: "normal" | "big",
  onClick?: () => void;
  children?: React.ReactNode;
}
export const RecordButton = (props: IRecordButton) => {
  const [hover, setHover] = useState(false);
  return (
    <StyledRecordButton
      onClick={() => props.onClick && props.onClick()}
      className={cx({
        // "w-[114px] text-xl": props.size === "big",
      })}
      // active={props.active}
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseOut={() => {
        setHover(false)
      }}
    >
      <div
        className={cx(props.className, "text-white", {
          // "text-transparent": props.active || hover,
          "font-bold": props.active || hover,
          "font-medium": props.active || hover,
          "border-b-[1px] border-main-secondary-main ": props.active,
          "text-main-secondary-main": props.active || hover,
        })}
      >{props.children}</div>
    </StyledRecordButton>
  )
}

export const ViewButton = styled.div`
  width: 60px;
  height: 54px;
  //background: linear-gradient(58deg,#09DA25 0%,#099F2C 100%);
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  margin-left: 30px;
`

export const WallletPage = () => {

  useAllowLoginRouterRules();

  const { updateBalance } = useAutoUpdateBalance();


  const [panelMode, setPanelMode] = useState<"deposit" | "withdraw" | "record">("deposit");


  const navigate = useNavigate();
  const { isMobile } = useBreakpoint();

  const [triggerGetRecharge, { data: rechargeData, isLoading, isSuccess, isError }] = useGetRechargeMutation();
  useEffect(() => {
    if (panelMode === "deposit") {
      triggerGetRecharge({ type: 'all', token: AppLocalStorage.getItem("token") || '' })
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
        <div className={"pt-4 px-4 pb-4 bg-main sticky top-0 left-0 right-0 z-20 flex flex-col justify-start items-start"}>
          <LeftOutlined className={"mb-4 text-white"} onClick={() => {
            navigate(PageOrModalPathEnum.MyPage);
          }} />

          <div className={"w-full"}>
            <Tabs className={"game-type-tab-list w-full"}>
              <TabItem pureColor={true} className="flex-1 mr-2" size="small" name={"Depósito"} active={panelMode === "deposit"} onClick={() => {
                setPanelMode("deposit")
              }} />
              <TabItem pureColor={true} className="flex-1 mr-2" size="small"  name={"Retirar"} active={panelMode === "withdraw"} onClick={() => {
                setPanelMode("withdraw")
              }} />
              <TabItem pureColor={true} className="flex-1 mr-2" size="small"  name={"Registro"} active={panelMode === "record"} onClick={() => {
                setPanelMode("record")
              }} />
            </Tabs>
          </div>
        </div>
      )}

      <div className={"p-4 md:p-8"}>
        {!isMobile && (
          <TotalSectionContainer/>
        )}

        {!isMobile && (
          <section id={"tab-item"}>
            <Tabs className={"game-type-tab-list"}>
              <TabItem pureColor={true} className="mr-3" name={"Depósito"} active={panelMode === "deposit"} size={"big"} onClick={() => {
                setPanelMode("deposit")
              }}
              />
              <TabItem pureColor={true} className="mr-3" name={"Retirar"} active={panelMode === "withdraw"} size={"big"} onClick={() => {
                setPanelMode("withdraw")
              }} />
              <TabItem pureColor={true} className="mr-3" name={"Registro"} active={panelMode === "record"} size={"big"} onClick={() => {
                setPanelMode("record")
              }} />
            </Tabs>
          </section>
        )}
        <div className={tcx("",
          [`p-8 border border-solid border-main-primary-main lg:p-14 mt-10 bg-[var(--game-block)] rounded-2xl `, !isMobile]
        )}>

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



