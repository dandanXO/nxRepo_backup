import {RightOutlined} from "@ant-design/icons";
import { useNavigate } from "react-router";
import { PageOrModalPathEnum } from "../../../../../PageOrModalPathEnum";
import {IBoardData} from "../../index";
import styled from "styled-components";
import { environment } from "apps/gambling/src/environments/environment";


const MobileCommonTotalTableContainer = styled.div`
  //background: linear-gradient(45deg,#478E51 0%,#5DDC54 100%);
  //box-shadow: inset 0 -0.16rem 0.34rem #72fc6c;
  background: url("assets/${environment.assetPrefix}/h5_invite_dashboard_2.png") center center no-repeat;
  background-size: cover;
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
