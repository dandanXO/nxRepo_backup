import styled from "styled-components";
import {IBoardData} from "./index";



const GreenBackgroundShadowContainer = styled.div`
  background: linear-gradient(45deg,#478E51 0%,#5DDC54 100%);
  box-shadow: inset 0 -0.16rem 0.34rem #72fc6c;
`

export const MobileCommonGreenTable = (props: IBoardData) => {
  return (
    <GreenBackgroundShadowContainer className={"flex flex-col rounded-2xl px-4 py-2 text-white"}>

      <div className={"flex flex-row justify-between  mb-2"}>
        <div className={"flex flex-col"}>
          <span className={"text-2xl text-[#ffffff]"}
                style={{fontWeight: 'bold'}}>R$ {props.data.totalReward || 0.00}</span>
          <span className="text-sm" style={{fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.75)'}}>Prêmio total</span>
        </div>

        <div className={"flex flex-col"}>
          <span className={"text-2xl text-[#ffffff]"}
                style={{fontWeight: 'bold'}}>R$ {props.data.paidReward || 0.00}</span>
          <span className="text-sm"
                style={{fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.8)'}}>Bônus já liquidados</span>
        </div>
      </div>

      <div className={"flex flex-col"}>
        <span className={"text-2xl text-[#ffffff]"}
              style={{fontWeight: 'bold'}}>R$ {props.data.waitForCalReward || 0.00}</span>
        <span className="text-sm" style={{fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.75)'}}>
            <span>Bônus aguardando liquidação<br/>(Atualizar a cada 24 horas)</span>
          </span>
      </div>

    </GreenBackgroundShadowContainer>
  )
}
