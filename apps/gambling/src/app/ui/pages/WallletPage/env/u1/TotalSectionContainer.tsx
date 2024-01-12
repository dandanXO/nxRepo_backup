import styled from "styled-components";
import { useSelector } from "react-redux";
import {
  accountPromotedSwingSelector, accountPromotedWithdrawableSelector,
  toDepositAccountRemovableSelector,
  toDepositAccountSwingSelector,
  totalBalanceSheetSelector,
  totalReasableSelector
} from "../../../../../reduxStore/appSlice";
import cx from "classnames";
import { QuestionCircleFilled, QuestionCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import useBreakpoint from "../../../../pageTemplate/hooks/useBreakpoint";
import ConfirmDrawer from "../../../../components-bs/Drawers/ConfirmDrawer";
import { IconTooltip } from "../../../../components/Tooltips/IconTooltip";
import { formatLocaleMoney } from "../../../../utils/format";

const StyledTotalSectionContainer = styled.div`
  border-radius: 16px;
  border: 1px solid var(--stroke-dashboard-main);
  background: var(--background-dashboard-main, linear-gradient(180deg, var(--background-dashboard-main-from) 0%, var(--background-dashboard-main-via) 85.42%, var(--background-dashboard-main-to) 100%));
  box-shadow: 4px 4px 4px 0px #ffffff40 inset, -4px -4px 4px 0px #ffffff40 inset;

`;

const TotalSectionTopContent = styled.div`
  border-radius: 19px;
`;

const TotalSectionBottomContent = styled.div`

`;


const MobileTotalDetailItem = (props: any) => {
  const { titleText, balanceValue, removeableValue, noticeText } = props;
  const [noticeShow, setNoticeShow] = useState(false)


  return (
    <div className={"flex flex-col flex-nowrap flex-1 px-3.5 pt-5 pb-3.5 "} onClick={() => setNoticeShow(!noticeShow)}>
      <div className={"whitespace-nowrap flex flex-row items-center mb-3"}>
        <div className={"font-[Heebo] font-bold text-sm"}>{titleText}</div>

        <div className={"text-sm flex self-baseline"}><QuestionCircleFilled  className="text-xs ml-2 self-baseline"/></div>
      </div>
      <div className={"flex flex-row items-center text-xs mb-2.5"}>
        <div className={"flex flex-col text-xs md:text-base mr-1"}>Balanço: </div>
        <div className={"flex flex-col text-xs md:text-base"}> R$ {balanceValue}</div>
      </div>
      <div className={"flex flex-row items-center text-xs mb-2"}>
        <div className={"flex flex-col text-xs md:text-base mr-1"}>Retirável: </div>
        <div className={"flex flex-col text-xs md:text-base"}> R$ {removeableValue}</div>
      </div>
      {
        noticeShow && (
          <ConfirmDrawer
            title='Descrição detalhada'
            content={noticeText}
            buttonText='Eu vejo'
            onClose={() => setNoticeShow(false)}
          />
        )
      }
    </div>
  )

}

const TotalDetailItem = (props: any) => {
  const { titleText, balanceValue, removeableValue } = props;

  return (
    <div className={"flex flex-row flex-nowrap flex-1 items-center flex-0 shrink-0 basis-1/2 "}>
      <div className={"whitespace-nowrap flex flex-row justify-center flex-0 shrink-0 basis-[35%] p-3"}>
        <div className={"font-[Heebo] text-base md:text-xl"}>{titleText}</div>
      </div>
      <div className={"flex flex-col items-center flex-0 shrink-0 basis-[25%] p-3"}>
        <div className={"flex flex-col text-base md:text-lg whitespace-nowrap"}> R$ {balanceValue}</div>
        <div className={"flex flex-col text-sm md:mt-2"}>Balanço</div>
      </div>
      <div className={"flex flex-col items-center flex-0 shrink-0 basis-[25%] p-3"}>
        <div className={"flex flex-col text-base md:text-lg whitespace-nowrap"}> R$ {removeableValue}</div>
        <div className={"flex flex-col text-sm md:mt-2"}>Retirável</div>
      </div>
    </div>
  )

}

export const TotalSectionContainer = () => {

  const totalBalanceSheetValue = useSelector(totalBalanceSheetSelector);
  const totalReasableValue = useSelector(totalReasableSelector);
  const toDepositAccountSwingValue = useSelector(toDepositAccountSwingSelector);
  const toDepositAccountRemovableValue = useSelector(toDepositAccountRemovableSelector);
  const accountPromotedSwingValue = useSelector(accountPromotedSwingSelector);
  const accountPromotedWithdrawableValue = useSelector(accountPromotedWithdrawableSelector);
  const { isMobile } = useBreakpoint();


  return (
    <StyledTotalSectionContainer className={"flex flex-col text-white relative"}>

      <TotalSectionTopContent className={"flex-1 flex flex-col p-3.5 md:p-6 md:flex-row justify-around items-center w-full relative"}>
        <div className={cx("w-full flex-1 flex flex-row items-center md:justify-center mb-3")}>
          <div className={cx("text-left text-xs md:text-3xl md:font-bold", {
          })}>Total Da Conta</div>
          <section
            className={cx(
              "md:hidden text-white text-base md:text-2xl",
              "px-4",
              "title-control flex flex-row justify-between items-center mb-2",
            )}
          >
          </section>
        </div>

        <div className={"w-full flex-[2] flex flex-row "}>
          <div className={"flex-1 flex flex-col justify-center items-center"}>
            <div className={"flex flex-col text-xl md:text-3xl font-[Heebo] font-bold"}>R$ {formatLocaleMoney(totalBalanceSheetValue)}</div>
            <div className={cx("flex flex-col text-sm md:text-xl mt-3 md:mt-4 text-white font-noraml")}>Balanço Total</div>
          </div>

          <div className={"flex-1 flex flex-col justify-center items-center"}>
            <div className={"flex flex-col text-xl md:text-3xl font-[Heebo] font-bold"}>R$ {formatLocaleMoney(totalReasableValue)}</div>
            <div className={cx("flex flex-col text-sm md:text-xl  mt-3 md:mt-4  text-white font-noraml")}>Retirável Total</div>
          </div>
        </div>
      </TotalSectionTopContent>
      <div className="border-b border-solid border-white mx-3.5 md:mx-6"></div>
      {isMobile &&
        (<TotalSectionBottomContent className={" flex flex-row flex-wrap justify-between items-center text-base md:text-medium text-[var(--secondary-assistant)]"}>
          <MobileTotalDetailItem
            titleText={'Depositar conta'}
            balanceValue={formatLocaleMoney(toDepositAccountSwingValue)}
            removeableValue={formatLocaleMoney(toDepositAccountRemovableValue)}
            noticeText={'Uma conta que consiste no valor da recarga, recompensas pela participação em atividades, vitórias e derrotas no jogo, etc. '}
          />
          <MobileTotalDetailItem
            titleText={'Conta Promovida'}
            balanceValue={formatLocaleMoney(accountPromotedSwingValue)}
            removeableValue={formatLocaleMoney(accountPromotedWithdrawableValue)}
            noticeText={'Uma conta composta por recompensas por convidar amigos e retorno de comissões com base no valor da transação dos usuários convidados. '}
          />
        </TotalSectionBottomContent>
        )}
      {!isMobile &&
        (<TotalSectionBottomContent className={" flex flex-row flex-wrap justify-between items-center text-base text-[var(--secondary-assistant)] p-3"}>
          <TotalDetailItem titleText={(<div className="flex flex-col justify-center items-center">
            <div>Depositar conta</div>
            <div className="whitespace-nowrap flex items-center">
              <span className="mr-1 self-end">(Atividade)</span>
              <IconTooltip icon={<QuestionCircleFilled className={'text-2xl'} />} id={"deposit-tooltip"} content="Uma conta que consiste no valor da recarga, recompensas pela participação em atividades, vitórias e derrotas no jogo, etc." />
            </div>
          </div>
          )}
            balanceValue={formatLocaleMoney(toDepositAccountSwingValue)}
            removeableValue={formatLocaleMoney(toDepositAccountRemovableValue)}
          />
          <TotalDetailItem
            titleText={(<div className="flex flex-col justify-center items-center">
              <div>Conta Promovida</div>
              <div className="whitespace-nowrap flex items-center">
                <span className="mr-1 self-end">(Atividade)</span>
                <IconTooltip icon={<QuestionCircleFilled className={'text-2xl'} />} id={"Conta-tooltip"} content="Uma conta composta por recompensas por convidar amigos e retorno de comissões com base no valor da transação dos usuários convidados. " />
              </div>

            </div>
            )}
            balanceValue={formatLocaleMoney(accountPromotedSwingValue)}
            removeableValue={formatLocaleMoney(accountPromotedWithdrawableValue)}
          />
        </TotalSectionBottomContent>)}
    </StyledTotalSectionContainer>
  )
}
