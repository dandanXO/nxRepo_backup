import styled from "styled-components";
import { IBoardData } from "./index";
import { environment } from "../../../../../environments/environment"
import { ReactElement, ReactNode } from "react";
import { RecordButton2, RecordButton3 } from "../../../components/Buttons/RecordButton";
import { PageOrModalPathEnum } from "../../../PageOrModalPathEnum";
import { useNavigate } from "react-router";
import { Button } from "antd";


const BlueBoardContainer = styled.div`
  //background: linear-gradient(45deg,#194BCA 0%,#5392FE 100%);
  //box-shadow: inset 0 -8px 17px #0ab8f5;
  background: url("assets/${environment.assetPrefix}/invite_dashboard_1.png") center center no-repeat;
`

const GreenBoardContainer = styled.div`
  //background: linear-gradient(45deg,#478E51 0%,#5DDC54 100%);
  //box-shadow: inset 0 -8px 17px #72fc6c;
  background: url("assets/${environment.assetPrefix}/invite_dashboard_2.png") center center no-repeat;
`

const OrangeBoardContainer = styled.div`
  //background: linear-gradient(45deg,#FC6728 0%,#F7B122 100%);
  //box-shadow: inset 0 -8px 17px #ffb558;
  background: url("assets/${environment.assetPrefix}/invite_dashboard_3.png") center center no-repeat;
`
interface IBoardContainer {
  children: ReactNode | ReactNode[];
}
const BoardContainer = (props: IBoardContainer) => {
  return (<div className={`
  flex flex-col flex-1 rounded-2xl justify-center items-center text-white 
  mx-1
  basis-[30%]
  h-[140px]
  text-center
  bg-gradient-to-b 
  from-[var(--background-dashboard-main-from)]
  via-[var(--background-dashboard-main-via)] 
  to-[var(--background-dashboard-main-to)] 
  border border-solid border-[var(--background-dashboard-main-to)]
  shadow-[0px_0px_8px_0px_rgba(0,0,0,0.25),4px_4px_4px_0px_rgba(255,255,255,0.25)_inset,-4px_-4px_4px_0px_rgba(255,255,255,0.25)_inset]
  `}>
    {props.children}
  </div>)
}

export const DesktopColorfulBoard = (props: IBoardData) => {
  const navigate = useNavigate();

  if (environment.assetPrefix === 'coco777bet') {
    return (
      <>

        <section className={"flex flex-row justify-end mb-4"}>
          <RecordButton3
            onClick={() => { navigate(PageOrModalPathEnum.InviteSettlementRecordPage) }}
            className={"text-white px-4 py-2"}>
            Registro
          </RecordButton3>
        </section>
        <section className={"flex flex-row w-full mb-4"}>
          <BoardContainer>
            <div className={"text-4xl text-white"}>R${props.data.totalReward || 0.00}</div>
            <div className={"text-base text-white mt-3"}>Prêmio total</div>
          </BoardContainer>
          <BoardContainer>
            <div className={"text-4xl text-white"}>R${props.data.paidReward || 0.00}</div>
            <div className={"text-base text-white mt-3"}>Bônus já liquidados</div>
          </BoardContainer>
          <BoardContainer>
            <div className={"text-4xl text-white"}>R${props.data.waitForCalReward || 0.00}</div>
            <div className={"text-base text-white leading-none mt-3"}>Bônus aguardando liquidação</div>
            <div className={"text-base text-white "}>(Atualizar a cada 24 horas)</div>
          </BoardContainer>
        </section>
      </>
    )
  }
  return (
    <>

      <section className={"flex flex-row w-full mb-4"}>
        <BlueBoardContainer className={"bg-blue flex flex-col flex-1 min-h-[220px] rounded-2xl text-lg justify-center items-center text-white mr-4 p-4"}>
          <div className={"text-3xl text-[#ffffff]"}>R${props.data.totalReward || 0.00}</div>
          <div className={"text-[#ffffff]"}>Prêmio total</div>
        </BlueBoardContainer>

        <GreenBoardContainer className={"bg-blue flex flex-col flex-1 min-h-[220px] rounded-2xl text-lg justify-center items-center text-white mr-4 p-4"}>
          <div className={"text-3xl text-[#ffffff]"}>R${props.data.paidReward || 0.00}</div>
          <div className={"text-[#ffffff]"}>Bônus já liquidados</div>
        </GreenBoardContainer>

        <OrangeBoardContainer className={"bg-blue flex flex-col flex-1 min-h-[220px] rounded-2xl text-lg justify-center items-center text-white mr-4 p-4"}>
          <div className={"text-3xl text-[#ffffff]"}>R${props.data.waitForCalReward || 0.00}</div>
          <div className={"text-[#ffffff]"}>Bônus aguardando liquidação</div>
          <div className={"text-[#ffffff]"}>(Atualizar a cada 24 horas)</div>
        </OrangeBoardContainer>
      </section>
      <section className={"flex flex-row justify-end mb-4"}>
        <RecordButton2
          onClick={() => {
            navigate(PageOrModalPathEnum.InviteSettlementRecordPage);
          }}
          className={"text-white px-4 py-2"}>Registro</RecordButton2>
      </section>
    </>
  )
}

