import {RightOutlined} from "@ant-design/icons";
import { useNavigate } from "react-router";
import { PageOrModalPathEnum } from "../../../../../PageOrModalPathEnum";
import {IBoardData} from "../../index";
import styled from "styled-components";

export const MobileCommonTotalTableContainer = styled.div`
  border: 2px solid transparent;
  background-clip: padding-box,border-box;
  background-origin: padding-box,border-box;
  background-image: linear-gradient(0deg,#2E104C,#3F28AF),linear-gradient(180deg,#5A3AF7,#500E8D);

`


export const MobileCommonTotalTable = (props: IBoardData) => {
  const navigate = useNavigate();
  return (
    <MobileCommonTotalTableContainer className={"flex flex-col rounded-2xl px-3 py-5 text-white"}>

    <div className={"flex flex-row justify-around  mb-2"}>
      <div className={"flex flex-col"}>
        <span className={"text-xl text-[#ffffff]"}>R$ {props.data.totalReward}</span>
        <span className="text-sm">Prêmio total</span>
      </div>

      <div className={"flex flex-col"}>
        <div className={"text-xl text-[#ffffff] flex items-center justify-around"}>
          <span>R$ {props.data.paidReward} </span>
          <RightOutlined className="text-xs ml-1" onClick={() => {
            navigate(PageOrModalPathEnum.InviteSettlementRecordPage);
          }} />
        </div>
        <span className="text-sm">Bônus já liquidados</span>

      </div>
    </div>

    <div className={"text-center flex flex-col"}>
      <span className={"text-xl text-[#ffffff]"}>R$ {props.data.waitForCalReward}</span>
      <span className="text-xs whitespace-nowrap">
          <span>Bônus aguardando liquidação(Atualizar a cada 24 horas)</span>
        </span>
    </div>

  </MobileCommonTotalTableContainer>
  )
}
