import styled from "styled-components";
import {DownOutlined, QuestionCircleOutlined, RightOutlined} from "@ant-design/icons";
import cx from "classnames";
import {useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../reduxStore";
import {IUserStore} from "../../../gateway/socket";
import {
  accountPromotedSwingSelector, accountPromotedWithdrawableSelector,
  toDepositAccountRemovableSelector,
  toDepositAccountSwingSelector,
  totalBalanceSheetSelector,
  totalReasableSelector
} from "../../../reduxStore/appSlice";
import {environment} from "../../../../environments/environment";
import { formatMoney } from "../../utils/formatMoney";

const Container = styled.div`
  //width: 94%;
  //margin: 0.2rem auto 0.3rem;
  //border-radius: 0.2rem;
  //position: relative;
  //padding: 0.2rem 0;
  //box-sizing: border-box;
  //overflow: hidden;
  background: url("assets/${environment.assetPrefix}/block_di.png") center center no-repeat;
  //border: 0.02rem solid rgba(255,255,255,.3);
`
export const BlueBoard = () => {

  const [expand, setExpand] = useState(false);

  // const { userAmount, user: {withdrawAmount} } = useSelector((state: RootState) => state.app.userStore as IUserStore)

  const totalBalanceSheetValue = useSelector(totalBalanceSheetSelector);
  const totalReasableValue = useSelector(totalReasableSelector);
  const toDepositAccountSwingValue = useSelector(toDepositAccountSwingSelector);
  const toDepositAccountRemovableValue = useSelector(toDepositAccountRemovableSelector);
  const accountPromotedSwingValue = useSelector(accountPromotedSwingSelector);
  const accountPromotedWithdrawableValue = useSelector(accountPromotedWithdrawableSelector);

  return (
    <Container className={cx(
      "py-2",
      "flex rounded-xl flex flex-col mb-2"
    )}>

      <section
        className={cx(
        "px-4",
          "title-control flex flex-row justify-between items-center mb-2",
        )}
        onClick={() => {
          setExpand(!expand);
        }}
      >
        <span className={"font-bold text-[#00718c]"}>Total Da Conta</span>

        {!expand ? (
          <RightOutlined/>
        ): (
          <DownOutlined />
        )}

      </section>

      <section
        className={cx(
    "px-4 py-2",
          "info-1 mb-2", {
          "border-b-[1px] border-black": expand,
        })}
       onClick={() => {
         setExpand(!expand);
       }}
      >
        <section className={"info-total flex flex-row"}>
          <section className={"left flex-1 flex flex-col"}>
            <span className={"value-money text-base"}>R$ {formatMoney(totalBalanceSheetValue)}</span>
            <span className={"title-money text-xs text-[#00718c]"}>Balanço Total</span>
          </section>

          <section className={"right flex-1 flex flex-col"}>
            <span className={"value-money text-base"}>R$ {formatMoney(totalReasableValue)}</span>
            <span className={"title-money text-xs text-[#00718c]"}>Retirável Total</span>
          </section>
        </section>
      </section>

      {expand && (
        <>
          <section className={cx(
            "px-4 py-2",
            "info-1 mb-2", {
              "border-b-[1px] border-black": expand,
            })}>
            <section className={"info-total flex flex-row"}>

              <section className={"left flex-1 flex flex-col"}>
            <span className={"value-money font-extralight"}>
              <div className={"flex flex-row justify-center items-center"}>
                <div className={"mr-2"}>
                  <div className={"text-[#00718c]"}>Depositar</div>
                  <div className={"text-[#00718c]"}>Conta</div>
                </div>
                <QuestionCircleOutlined />
              </div>
            </span>
              </section>

              <section className={"right flex-1 flex flex-col"}>
                <span className={"value-money font-extralight"}>{toDepositAccountSwingValue}</span>
                <span className={"title-money font-extralight text-[#00718c]"}>Balanço</span>
              </section>

              <section className={"right flex-1 flex flex-col"}>
                <span className={"value-money font-extralight"}>{toDepositAccountRemovableValue}</span>
                <span className={"title-money font-extralight text-[#00718c]"}>Retirável</span>
              </section>

            </section>
          </section>


          <section className={"info-2"}>
            <section className={"info-total flex flex-row"}>

              <section className={"left flex-1 flex flex-col"}>
            <span className={"value-money font-extralight"}>
              <div className={"flex flex-row justify-center items-center"}>
                <div className={"mr-2"}>
                  <div className={"text-[#00718c]"}> Conta </div>
                  <div className={"text-[#00718c]"}> Promovida </div>
                </div>
                <QuestionCircleOutlined />
              </div>
            </span>
              </section>

              <section className={"right flex-1 flex flex-col"}>
                <span className={"value-money font-extralight"}>{accountPromotedSwingValue}</span>
                <span className={"title-money font-extralight text-[#00718c]"}>Balanço</span>
              </section>

              <section className={"right flex-1 flex flex-col"}>
                <span className={"value-money font-extralight"}>{accountPromotedWithdrawableValue}</span>
                <span className={"title-money font-extralight text-[#00718c]"}>Retirável</span>
              </section>

            </section>
          </section>
        </>
      )}

    </Container>
  )
}
