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
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import useBreakpoint from "../../../../hooks/useBreakpoint";
import ConfirmDrawer from "../../../../components-bs/Drawers/ConfirmDrawer";
import { IconTooltip } from "../../../../components/Tooltips/IconTooltip";

const StyledTotalSectionContainer = styled.div`
  border-radius: 19px;
  border: 2px solid transparent;
  background: linear-gradient(0deg,#2E104C,#3F28AF),linear-gradient(180deg,#5A3AF7,#500E8D);
  color:white;
  background-clip: padding-box,border-box;
  background-origin: padding-box,border-box;
`;

const TotalSectionTopContent = styled.div`
  border-radius: 19px;
`;

const TotalSectionBottomContent = styled.div`

`;


const MobileTotalDetailItem = (props: any) => {
  const { titleText, balanceValue, removableValue, noticeText } = props;
  const [noticeShow, setNoticeShow] = useState(false)


  return (
    <div className={"flex flex-col flex-nowrap flex-1 p-2.5"} onClick={() => setNoticeShow(!noticeShow)}>
      <div className={"whitespace-nowrap flex flex-row items-center "}>
        <div className={"font-[Heebo] font-bold"}>{titleText}</div>

        <div className={"text-xs ml-0.5 -translate-y-2"}><QuestionCircleOutlined /></div>
      </div>
      <div className={"flex flex-row items-center text-sm"}>
        <div className={"flex flex-col text-sm md:text-base mr-1"}>Balanço: </div>
        <div className={"flex flex-col text-sm md:text-base"}> R$ {balanceValue}</div>
      </div>
      <div className={"flex flex-row items-center "}>
        <div className={"flex flex-col text-sm md:text-base mr-1"}>Retirável: </div>
        <div className={"flex flex-col text-sm md:text-base"}> R$ {removableValue}</div>
      </div>
      {
        noticeShow && (
          <ConfirmDrawer
            title='Descrição detalhada'
            content={noticeText}
            buttonText='Eu vejo'
            onClose={()=>setNoticeShow(false)}
          />
        )
      }
    </div>
  )

}

const TotalDetailItem = (props: any) => {
  const { titleText, balanceValue, removableValue } = props;

  return (
    <div className={"flex flex-row flex-nowrap flex-1 items-center flex-0 shrink-0 basis-1/2"}>
      <div className={"whitespace-nowrap flex flex-row justify-center flex-0 shrink-0 basis-[35%] p-3"}>
        <div className={"font-[Heebo] text-base md:text-xl"}>{titleText}</div>
      </div>
      <div className={"flex flex-col items-center flex-0 shrink-0 basis-[25%] p-3"}>
        <div className={"flex flex-col text-base md:text-lg whitespace-nowrap"}> R$ {balanceValue}</div>
        <div className={"flex flex-col text-sm md:mt-2.5"}>Balanço</div>
      </div>
      <div className={"flex flex-col items-center flex-0 shrink-0 basis-[25%] p-3"}>
        <div className={"flex flex-col text-base md:text-lg whitespace-nowrap"}> R$ {removableValue}</div>
        <div className={"flex flex-col text-sm md:mt-2.5"}>Retirável</div>
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

      <TotalSectionTopContent className={"flex-1 flex flex-col p-4 md:py-0 md:flex-row  justify-around items-center px-5 font-bold w-full relative"}>
        <div className={cx("w-full flex-1 flex flex-row items-center md:h-[124px] md:justify-center")}>
          <div className={cx("text-left text-base  md:text-3xl", {
            'absolute top-0 left-0 text-xs py-[3px] px-2.5 bg-[#0000001a] rounded-br': isMobile,
            '[text-shadow:_0_3px_0_rgb(0_0_0)]': !isMobile
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
            <div className={"flex flex-col text-xl md:text-3xl font-[Heebo] font-bold"}>R$ {totalBalanceSheetValue.toFixed(2)}</div>
            <div className={cx("flex flex-col text-sm md:text-xl", {
              'text-[#ffffffb3] font-normal': isMobile,

            })}>Balanço Total</div>
          </div>

          <div className={"flex-1 flex flex-col justify-center items-center"}>
            <div className={"flex flex-col text-xl md:text-3xl font-[Heebo] font-bold"}>R$ {totalReasableValue.toFixed(2)}</div>
            <div className={cx("flex flex-col text-sm md:text-xl", {
              'text-[#ffffffb3] font-normal': isMobile
            })}>Retirável Total</div>
          </div>
        </div>
      </TotalSectionTopContent>

      {isMobile &&
        (<TotalSectionBottomContent className={"border-t border-[#d3abff4d] flex flex-row flex-wrap justify-between items-center text-base md:text-medium text-[#d3abff]"}>
          <MobileTotalDetailItem
            titleText={'Depositar conta'}
            balanceValue={totalBalanceSheetValue.toFixed(2)}
            removeableValue={totalReasableValue.toFixed(2)}
            noticeText={'Uma conta que consiste no valor da recarga, recompensas pela participação em atividades, vitórias e derrotas no jogo, etc. '}
          />
          <MobileTotalDetailItem
            titleText={'Conta Promovida'}
            balanceValue={accountPromotedSwingValue.toFixed(2)}
            removeableValue={accountPromotedWithdrawableValue.toFixed(2)}
            noticeText={'Uma conta composta por recompensas por convidar amigos e retorno de comissões com base no valor da transação dos usuários convidados. '}
          />
        </TotalSectionBottomContent>
        )}
      {!isMobile &&
        (<TotalSectionBottomContent className={"border-t border-[#d3abff4d] flex flex-row flex-wrap justify-between items-center text-base text-[#d3abff] py-3"}>
          <TotalDetailItem titleText={(<div className="flex flex-col justify-center items-center">
            <div>Depositar conta</div>
            <div className="whitespace-nowrap">
              <span className="mr-1">(Atividade)</span>
              <IconTooltip icon={<QuestionCircleOutlined className={'text-sm'}/>} id={"deposit-tooltip"} content="Uma conta que consiste no valor da recarga, recompensas pela participação em atividades, vitórias e derrotas no jogo, etc." />
            </div>
          </div>
          )}
            balanceValue={totalBalanceSheetValue.toFixed(2)}
            removeableValue={totalReasableValue.toFixed(2)}
          />
          <TotalDetailItem
            titleText={(<div className="flex flex-col justify-center items-center">
              <div>Conta Promovida</div>
              <div className="whitespace-nowrap">
                <span className="mr-1">(Atividade)</span>
                <IconTooltip icon={<QuestionCircleOutlined className={'text-sm'}/>} id={"Conta-tooltip"} content="Uma conta composta por recompensas por convidar amigos e retorno de comissões com base no valor da transação dos usuários convidados. " />
              </div>

            </div>
            )}
            balanceValue={accountPromotedSwingValue.toFixed(2)}
            removeableValue={accountPromotedWithdrawableValue.toFixed(2)}
          />
        </TotalSectionBottomContent>)}
    </StyledTotalSectionContainer>
  )
}
