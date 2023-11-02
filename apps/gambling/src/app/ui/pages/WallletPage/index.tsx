import styled from "styled-components";
import {TabItem, Tabs} from "../../components/TabItem";
import {useEffect, useState} from "react";
import cx from "classnames";
import {useNavigate} from "react-router";
import {PageOrModalPathEnum} from "../../PageOrModalPathEnum";
import useBreakpoint from "../../hooks/useBreakpoint";
import {LeftOutlined} from "@ant-design/icons";
import {DepositPanel} from "./DepositPanel";
import {WithdrawPanel} from "./WithdrawPanel";
import {RecordPanel} from "./RecordPanel";
import {useGetRechargeMutation, useGetWithdrawLimitMutation} from "../../../external";
import {AppLocalStorage} from "../../../persistant/localstorage";
import {useSelector} from "react-redux";
import {RootState} from "../../../reduxStore";

import {useAllowLoginRouterRules} from "../../router/useAllowLoginRouterRules";
import {IUserStore} from "../../../gateway/socket";
import {
  accountPromotedSwingSelector, accountPromotedWithdrawableSelector,
  totalBalanceSheetSelector,
  totalReasableSelector
} from "../../../reduxStore/appSlice";
import {useAutoUpdateBalance} from "../../hooks/useAutoUpdateBalance";

const TotalSectionContainer = styled.div`
  background: rgba(255,255,255,.1);
  border-radius: 19px;
  border: 1px solid rgba(255,255,255,.5);
`

const TotalSectionTopContent = styled.div`
  background: linear-gradient(180deg,#4CA7FF 0%,#256EFF 100%);
  border-radius: 19px;
  border: 1px solid rgba(255,255,255,.3);
`

const TotalSectionBottomContent = styled.div`

`

const StyledDepositSectionNotice = styled.div`
  //background: linear-gradient(90deg,rgba(9,11,15,.16) 0%,rgba(247,186,23,.16) 54%,rgba(9,11,15,.16) 100%);
  //style={{ color: '#00718c', fontFamily: 'myriadpro-bold' }}
  color: #ffffff;
  margin-bottom: 16px;
  padding: 6px 10px;
  text-align: left;
  line-height: 18px;
`
export const DepositSectionNotice = (props: {
  children?: React.ReactNode;
  className?: string;
}) => {
  const {isMobile} = useBreakpoint();
  return (
    <StyledDepositSectionNotice
      className={cx(props.className,{

      })}
    >
      {props.children}
    </StyledDepositSectionNotice>
  )
}


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


const StyledRecordButton = styled.button.attrs<{className?: string;}>((props) => ({
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
  font-family: HelveticaNeue-Bold-02;

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
        className={cx(props.className, "text-[#fff]",{
          "text-transparent": props.active || hover,
          "font-bold": props.active || hover,
          "font-medium": props.active || hover,
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

  const {updateBalance} = useAutoUpdateBalance();


  const [panelMode, setPanelMode] = useState<"deposit" | "withdraw" | "record">("deposit");


  const navigate = useNavigate();
  const {isMobile} = useBreakpoint();

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
      {/*<div className={"pb-[100px]"}>*/}

        {isMobile && (
          <div className={"px-4 bg-[#294E3B] sticky top-0 left-0 right-0 z-20 flex flex-row justify-start items-center"}>

            <LeftOutlined className={"mr-4 text-white text-base"} onClick={() => {
              navigate(PageOrModalPathEnum.MyPage);
            }}/>

            <div className={"py-2 w-full"}>
              <Tabs className={"game-type-tab-list bg-[black] w-full"}>
                <TabItem className="flex-1" name={"Depósito"} active={panelMode === "deposit"} onClick={() => {
                  setPanelMode("deposit")
                }}/>
                <TabItem className="flex-1" name={"Retirar"} active={panelMode === "withdraw"} onClick={() => {
                  setPanelMode("withdraw")
                }}/>
                <TabItem className="flex-1" name={"Registro"} active={panelMode === "record"} onClick={() => {
                  setPanelMode("record")
                }}/>
              </Tabs>
            </div>
          </div>
        )}

        <div className={"p-2 md:p-8"}>
          {!isMobile && (
            <TotalSectionContainer className={"flex flex-col min-h-[250px] text-white mb-6"}>

              <TotalSectionTopContent className={"flex-1 flex flex-row justify-between items-center px-16"}>

                <div className={"flex-1 text-3xl"}>Total Da Conta</div>

                <div className={"flex-1 flex flex-col justify-center items-center"}>
                  <div className={"flex flex-col text-2xl"}>{totalBalanceSheetValue}</div>
                  <div className={"flex flex-col text-2xl"}>Balanço Total</div>
                </div>

                <div className={"flex-1 flex flex-col justify-center items-center"}>
                  <div className={"flex flex-col text-2xl"}>{totalReasableValue}</div>
                  <div className={"flex flex-col text-2xl"}>Retirável Total</div>
                </div>
              </TotalSectionTopContent>

              <TotalSectionBottomContent className={"flex-1 flex flex-row justify-between items-center px-6"}>

                <div className={"text-xl mr-2"}>
                  <div>Depositar conta</div>
                  <div>(Atividade)</div>
                </div>

                <div className={"flex-1 flex flex-col justify-center items-center mr-2"}>
                  <div className={"flex flex-col text-base"}>{totalBalanceSheetValue - 0}</div>
                  <div className={"flex flex-col text-base"}>Balanço</div>
                </div>

                <div className={"flex-1 flex flex-col justify-center items-center mr-2"}>
                  <div className={"flex flex-col text-base"}>{totalReasableValue - 0}</div>
                  <div className={"flex flex-col text-base"}>Retirável</div>
                </div>

                <div className={"mr-16"}/>

                <div className={"text-xl"}>
                  <div>Conta </div>
                  <div>Promovida</div>
                </div>

                <div className={"flex-1 flex flex-col justify-center items-center mr-2"}>
                  <div className={"flex flex-col text-base"}>{accountPromotedSwingValue}</div>
                  <div className={"flex flex-col text-base"}>Balanço</div>
                </div>

                <div className={"flex-1 flex flex-col justify-center items-center"}>
                  <div className={"flex flex-col text-base"}>{accountPromotedWithdrawableValue}</div>
                  <div className={"flex flex-col text-base"}>Retirável</div>
                </div>
              </TotalSectionBottomContent>

            </TotalSectionContainer>
          )}

          {!isMobile && (
            <section id={"tab-item"}>
              <Tabs className={"game-type-tab-list"}>
                <TabItem name={"Depósito"} active={panelMode === "deposit"} size={"big"} onClick={() => {
                  setPanelMode("deposit")
                }}
                />
                <TabItem name={"Retirar"} active={panelMode === "withdraw"} size={"big"} onClick={() => {
                  setPanelMode("withdraw")
                }}/>
                <TabItem name={"Registro"} active={panelMode === "record"} size={"big"} onClick={() => {
                  setPanelMode("record")
                }}/>
              </Tabs>
            </section>
          )}

          {panelMode === "deposit" ? (
            <DepositPanel data={rechargeData?.data}/>
          ): panelMode === "withdraw" ? (
            <WithdrawPanel onClickToWithdrawRecord={() => {
              setPanelMode("record");
              setRecordPanelMode("withdraw");
            }}/>
          ) : (
            <RecordPanel recordPanelMode={recordPanelMode}/>
          )}

        </div>

      {/*</div>*/}


    </>
  )
}



