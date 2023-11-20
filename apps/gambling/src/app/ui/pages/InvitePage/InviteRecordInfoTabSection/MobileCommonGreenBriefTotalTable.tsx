import {RightOutlined} from "@ant-design/icons";
import { useNavigate } from "react-router";
import { PageOrModalPathEnum } from "../../../PageOrModalPathEnum";
import {IBoardData} from "./index";

import {renderByPlatform} from "../../../utils/renderByPlatform";
import {MobileGreenBackgroundShadowContainer as PMobileGreenBackgroundShadowContainer} from "./env/pernambucana/MobileGreenBackgroundShadowContainer";
import {MobileGreenBackgroundShadowContainer as WMobileGreenBackgroundShadowContainer} from "./env/wild/MobileGreenBackgroundShadowContainer";
import {MobileGreenBackgroundShadowContainer as CMobileGreenBackgroundShadowContainer } from "./env/coco/MobileGreenBackgroundShadowContainer";

const MobileGreenBackgroundShadowContainer = renderByPlatform({
  "wild777bet": WMobileGreenBackgroundShadowContainer,
  "coco777bet": CMobileGreenBackgroundShadowContainer,
}, PMobileGreenBackgroundShadowContainer)

export const MobileCommonGreenBriefTotalTable = (props: IBoardData) => {
  const navigate = useNavigate();
  return (
    <MobileGreenBackgroundShadowContainer className={"flex flex-col rounded-2xl px-4 py-2 text-white"}>

      <div className={"flex flex-row justify-between  mb-2"}>
        <div className={"flex flex-col"}>
          <span className={"text-xl text-[#ffffff]"}>R$ {props.data.totalReward || 0.00}</span>
          <span className="text-sm">Prêmio total</span>
        </div>

        <div className={"flex flex-col"}>
          <div className={"text-xl text-[#ffffff] flex items-center"}>
            <span>R$ {props.data.paidReward || 0.00} </span>
            <RightOutlined className="text-xs ml-1" onClick={() => {
              navigate(PageOrModalPathEnum.InviteSettlementRecordPage);
            }} />
          </div>
          <span className="text-sm">Bônus já liquidados</span>

        </div>
      </div>

      <div className={"text-center flex flex-col"}>
        <span className={"text-xl text-[#ffffff]"}>R$ {props.data.waitForCalReward || 0.00}</span>
        <span className="text-sm">
            <span>Bônus aguardando liquidação(Atualizar a cada 24 horas)</span>
          </span>
      </div>

    </MobileGreenBackgroundShadowContainer>
  )
}
