import styled from "styled-components";
import {IBoardData} from "./index";


const BlueBoardContainer = styled.div`
  background: linear-gradient(45deg,#194BCA 0%,#5392FE 100%);
  box-shadow: inset 0 -8px 17px #0ab8f5;
`

const GreenBoardContainer = styled.div`
  background: linear-gradient(45deg,#478E51 0%,#5DDC54 100%);
  box-shadow: inset 0 -8px 17px #72fc6c;
`

const OrangeBoardContainer = styled.div`
  background: linear-gradient(45deg,#FC6728 0%,#F7B122 100%);
  box-shadow: inset 0 -8px 17px #ffb558;
`

export const DesktopColorfulBoard = (props:IBoardData) => {
  return (
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
  )
}

