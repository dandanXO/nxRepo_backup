import moment from "moment/moment";
import {ITabType} from "./index";
import {CommonTableTabG} from "./env/CommonTableTabG";

import {MobileOrangeBackgroundShadowContainer as PMobileOrangeBackgroundShadowContainer} from "./env/pernambucana/MobileOrangeBackgroundShadowContainer";
import {MobileOrangeBackgroundShadowContainer as WMobileOrangeBackgroundShadowContainer} from "./env/wild/MobileOrangeBackgroundShadowContainer";
import {MobileOrangeBackgroundShadowContainer as CMobileOrangeBackgroundShadowContainer} from "./env/coco/MobileOrangeBackgroundShadowContainer";
import {renderByPlatform} from "../../../utils/renderByPlatform";

const MobileOrangeBackgroundShadowContainer = renderByPlatform({
  "wild777bet": WMobileOrangeBackgroundShadowContainer,
  "coco777bet": CMobileOrangeBackgroundShadowContainer,
}, PMobileOrangeBackgroundShadowContainer)


type IMobileCommonOrangeTable = ITabType & { records: any; isProxy: boolean; }


export const MobileCommonOrangeDailyTable = (props: IMobileCommonOrangeTable) => {

  return (
    <MobileOrangeBackgroundShadowContainer className={"px-4 pb-2 flex flex-col rounded-2xl text-[#ffffff] text-left"}>
      <div className={"flex flex-row text-lg font-bold justify-around mb-2"}>
        <CommonTableTabG className={""} active={props.type === "1"} onClick={() => props.onClick("1")}>Nível 1</CommonTableTabG>
        <CommonTableTabG className={""} active={props.type === "2"} onClick={() => props.onClick("2")}>Nível 2</CommonTableTabG>
        <CommonTableTabG className={""} active={props.type === "3"} onClick={() => props.onClick("3")}>Nível 3</CommonTableTabG>
      </div>

      {props.isProxy && (
        <div className={"flex flex-row justify-end"}>
          <span className={"text-2xl text-[#ffffff]"}>Dividends: R$ {props.records && props.records[0] && props.records[0].dividendos || 0.00}</span>
        </div>
      )}

      <div className={"text-[transparent]"}>
        <span className={"bg-white rounded-xl text-[#fc6728] px-2 py-1 items-center"}>
          <span className={"mr-2"}>{moment().format("YYYY/MM/DD")}</span>
          {/* <DownOutlined className={""}/>  切換下拉，會呼叫invite day api ，先隱藏功能 */}
        </span>
      </div>
      <div className={"flex flex-col mb-2 mt-2"}>
        <span className={"text-2xl text-[#ffffff]"}>R$ {props.records && props.records[0] && props.records[0].totalReward || 0.00}</span>
        <span className="font-hairline">Obter bônus</span>
      </div>

      {props.type === "1" && (
        <div className={"flex flex-row justify-between mb-2"}>
          <div className={"flex flex-col"}>
            <span className={"text-lg text-[#ffffff]"}>{props.records && props.records[0] && props.records[0].numRecharge || 0.00}</span>
            <span className="font-hairline">Usuário de recarga</span>
          </div>

          <div className={"flex flex-col"}>
            <span className={"text-lg text-[#ffffff]"}>R$ {props.records && props.records[0] && props.records[0].firstRecharge || 0.00}</span>
            <span className="font-hairline">Obter bônus</span>
          </div>
        </div>
      )}

      <div className={"flex flex-row justify-between mb-2"}>
        <div className={"flex flex-col"}>
          <span className={"text-lg text-[#ffffff]"}>R$ {props.records && props.records[0] && props.records[0].gameRecharge || 0.00}</span>
          <span className="font-hairline">Valor da transação do jogo</span>
        </div>

        <div className={"flex flex-col"}>
          <span className={"text-lg text-[#ffffff]"}>R$ {props.records && props.records[0] && props.records[0].gameRechargeReward || "0.00"}</span>
          <span className="font-hairline">Obter bônus</span>
        </div>
      </div>

    </MobileOrangeBackgroundShadowContainer>
  )
}
