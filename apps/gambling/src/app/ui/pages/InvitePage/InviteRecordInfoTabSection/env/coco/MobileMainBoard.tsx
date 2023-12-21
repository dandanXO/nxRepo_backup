import { RightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { PageOrModalPathEnum } from "../../../../../PageOrModalPathEnum";
import { IBoardData } from "../../index";
import styled from "styled-components";


const MobileMainBoardContainer = styled.div`
border-radius: 16px;
border: 1px solid var(--background-dashboard-main, #5754F3);
background: var(--background-dashboard-main, linear-gradient(180deg, #5754F3 0%, #121C78 85.42%, #0D1DA4 100%));
box-shadow: -4px -4px 4px 0px rgba(255, 255, 255, 0.25) inset, 4px 4px 4px 0px rgba(255, 255, 255, 0.25) inset;
`

export const MobileMainBoard = (props: IBoardData) => {

  const navigate = useNavigate();

  return (
    <MobileMainBoardContainer className={"flex flex-col rounded-2xl px-3 py-5 text-white"}>
      <div className={"flex flex-row justify-around mb-2"}>
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
    </MobileMainBoardContainer>
  )
}
