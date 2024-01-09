import cx from "classnames";
import {DownOutlined, QuestionCircleFilled, UpOutlined} from "@ant-design/icons";
import styled from "styled-components";
import {environment} from "../../../../../../environments/environment";
import useBreakpoint from "../../../../pageTemplate/hooks/useBreakpoint";


const StyledTotalSectionContainer = styled.div`
  border-radius: 19px;
  border: 2px solid rgba(255,255,255,.5);
  background: var(--dashboard-base);
  color:var(--dashboard-block2);
`;

const TotalSectionTopContent = styled.div`
  background-image: url(assets/${environment.uVersion}/Group.png) ,linear-gradient(to top, var(--btn-gradient1-from) 30%, var(--btn-gradient1-to) 100%);
  border-radius: 19px;
`;

const TotalSectionBottomContent = styled.div`

`;

type ITotalSectionContainer = {
  expand: boolean;
  setExpand: (expand: boolean) => void;
  totalBalanceSheetValue: number;
  totalReasableValue: number;
  accountPromotedSwingValue: number;
  accountPromotedWithdrawableValue: number;
}

export const TotalSectionContainer = (props: ITotalSectionContainer) => {
  const {isMobile} = useBreakpoint();

  return (
    <StyledTotalSectionContainer className={"flex flex-col text-white mb-6"}>

      <TotalSectionTopContent
        className={"flex-1 flex flex-col p-4 md:py-0 md:flex-row  justify-around items-center px-5 font-bold w-full"}
        onClick={() => {
          if(isMobile) props.setExpand(!props.expand);
        }}
      >

        <div className={"w-full flex-1 flex flex-row justify-between items-center md:h-[168px] mb-2"}>
          <div className={"text-left md:text-center text-base md:text-3xl"}>TOTAL DA CONTA</div>
          <section
            className={cx(
              "md:hidden text-white text-base md:text-2xl",
              "px-4",
              "title-control flex flex-row justify-between items-center mb-2",
            )}
          >
            {!props.expand ? (
              <UpOutlined/>
            ): (
              <DownOutlined />
            )}
          </section>
        </div>

        <div className={"w-full flex-[2] flex flex-row "}>
          <div className={"flex-1 flex flex-col justify-center items-center"}>
            <div className={"flex flex-col text-xl md:text-3xl"}>{props.totalBalanceSheetValue.toFixed(2)}</div>
            <div className={"flex flex-col text-sm md:text-2xl"}>Balanço Total</div>
          </div>

          <div className={"flex-1 flex flex-col justify-center items-center"}>
            <div className={"flex flex-col text-xl md:text-3xl"}>{props.totalReasableValue.toFixed(2)}</div>
            <div className={"flex flex-col text-sm md:text-2xl"}>Retirável Total</div>
          </div>
        </div>
      </TotalSectionTopContent>

      {props.expand && (
        <TotalSectionBottomContent className={"flex flex-row flex-wrap justify-between items-center py-5 px-5 text-base md:text-medium"}>

          <div className={"w-full flex flex-row flex-nowrap flex-1 basis-1/2 justify-evenly mr-1"}>
            <div className={"basis-1/3 max-w-[33%] shrink-0 whitespace-nowrap flex flex-row justify-end items-center"}>
              <div className={"mr-2 md:mr-0 text-sm text-base"}>
                <div>Depositar</div>
                <div>conta</div>
                <div>(Atividade)</div>
              </div>
              <QuestionCircleFilled className={"md:hidden"}/>
            </div>
            <div className={"basis-1/3 max-w-[33%] shrink-0 flex flex-col justify-center items-center "}>
              <div className={"flex flex-col text-xl md:text-2xl"}>{props.totalBalanceSheetValue.toFixed(2)}</div>
              <div className={"flex flex-col text-sm md:text-base"}>Balanço</div>
            </div>

            <div className={"basis-1/3 max-w-[33%] shrink-0 flex flex-col justify-center items-center "}>
              <div className={"flex flex-col text-xl md:text-2xl"}>{props.totalReasableValue.toFixed(2)}</div>
              <div className={"flex flex-col text-sm md:text-base"}>Retirável</div>
            </div>

          </div>

          <div className={"w-full flex flex-row flex-nowrap flex-1 basis-1/2 justify-evenly mr-1"}>
            <div className={"basis-1/3 max-w-[33%] shrink-0 whitespace-nowrap flex flex-row justify-end items-center"}>
              <div className={"mr-2 md:mr-0 text-sm text-base"}>
                <div>Conta </div>
                <div>Promovida</div>
              </div>
              <QuestionCircleFilled className={"md:hidden"}/>
            </div>

            <div className={"basis-1/3 max-w-[33%] shrink-0 flex flex-col justify-center items-center "}>
              <div className={"flex flex-col text-xl md:text-2xl"}>{props.accountPromotedSwingValue.toFixed(2)}</div>
              <div className={"flex flex-col text-sm md:text-base"}>Balanço</div>
            </div>

            <div className={"basis-1/3 max-w-[33%] shrink-0 flex flex-col justify-center items-center"}>
              <div className={"flex flex-col text-xl md:text-2xl"}>{props.accountPromotedWithdrawableValue.toFixed(2)}</div>
              <div className={"flex flex-col text-sm md:text-base"}>Retirável</div>
            </div>

          </div>

        </TotalSectionBottomContent>
      )}


    </StyledTotalSectionContainer>
  )
}
