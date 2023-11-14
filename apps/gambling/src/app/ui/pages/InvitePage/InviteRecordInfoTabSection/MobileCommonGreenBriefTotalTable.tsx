import {IBoardData} from "./index";
import {MobileGreenBackgroundShadowContainer as Pernambucana} from "./env/pernambucana/MobileGreenBackgroundShadowContainer";
import {MobileGreenBackgroundShadowContainer as Coco } from "./env/coco/MobileGreenBackgroundShadowContainer";
import {environment} from "../../../../../environments/environment";

const MobileGreenBackgroundShadowContainer = environment.assetPrefix === "coco777bet" ? Coco : Pernambucana


export const MobileCommonGreenBriefTotalTable = (props: IBoardData) => {
  return (
    <MobileGreenBackgroundShadowContainer className={"flex flex-col rounded-2xl px-4 py-2 text-white"}>

      <div className={"flex flex-row justify-between  mb-2"}>
        <div className={"flex flex-col"}>
          <span className={"text-xl text-[#ffffff]"}>R$ {props.data.totalReward || 0.00}</span>
          <span className="text-sm">Prêmio total</span>
        </div>

        <div className={"flex flex-col"}>
          <span className={"text-xl text-[#ffffff]"}>R$ {props.data.paidReward || 0.00}</span>
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
