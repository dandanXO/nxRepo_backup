import {ITabType} from "./index";
import {
  MobileBlueBackgroundShadowContainer as Pernambucana
} from "./env/pernambucana/MobileBlueBackgroundShadowContainer";
import {MobileBlueBackgroundShadowContainer as Coco} from "./env/coco/MobileBlueBackgroundShadowContainer";

import {environment} from "../../../../../environments/environment";
import {CommonTableTabG} from "./env/CommonTableTabG";


const MobileBlueBackgroundShadowContainer = environment.assetPrefix === "coco777bet" ? Coco : Pernambucana;

export interface ITotal {
  data: {
    // 總邀請獎勵
    totalReward:string;
    // 邀請玩家總數
    numRecharge: number;
    // 邀請首充獎勵
    firstRecharge?: string;
    // 邀請玩家總流水
    gameRecharge: string;
    // 邀請玩家總流水獎金
    gameRechargeReward: string;

    dividendos: string;
  };
  isProxy: boolean;
}

type IMobileCommonBlueTable = ITabType & ITotal;

export const MobileCommonBlueTotalTable = (props: IMobileCommonBlueTable) => {
  return (
    <MobileBlueBackgroundShadowContainer className={"flex flex-col rounded-2xl px-4 pb-2 text-[#ffffff] text-left"}>
      <div className={"flex flex-row text-lg font-bold justify-around mb-2"}>
        <CommonTableTabG className={""} active={props.type === "1"} onClick={() => props.onClick("1")}>Nível 1</CommonTableTabG>
        <CommonTableTabG className={""} active={props.type === "2"} onClick={() => props.onClick("2")}>Nível 2</CommonTableTabG>
        <CommonTableTabG className={""} active={props.type === "3"} onClick={() => props.onClick("3")}>Nível 3</CommonTableTabG>
      </div>

      {props.isProxy && (
        <div className={"flex flex-row justify-end"}>
          <span className={"text-2xl text-[#ffffff]"}>Dividends: R$ {props.data.dividendos || 0.00}</span>
        </div>
      )}
      {/* data: {
        numRecharge: number;
        firstRecharge?: string;
        gameRecharge: string;
        gameRechargeReward: string;
        totalReward:string;
      } */}
      <div className={"flex flex-col mb-2"}>
        <span className={"text-2xl text-[#ffffff]"}>R$ {props.data.totalReward || 0.00}</span>
        <span className="font-hairline"
              style={{fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.75)'}}>Obter bônus</span>
      </div>

      {props.type === "1" && (
        <div className={"flex flex-row justify-between mb-2"}>
          <div className={"flex flex-col"}>
            <span className={"text-lg text-[#ffffff]"}>{props.data.numRecharge || 0}</span>
            <span className="font-hairline" style={{fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.75)'}}>Usuário de recarga</span>
          </div>

          <div className={"flex flex-col"}>
            <span className={"text-lg text-[#ffffff]"}>R$ {props.data.firstRecharge || 0.00}</span>
            <span className="font-hairline"
                  style={{fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.75)'}}>Obter bônus</span>
          </div>
        </div>
      )}

      <div className={"flex flex-row justify-between mb-2"}>
        <div className={"flex flex-col"}>
          <span className={"text-lg text-[#ffffff]"}>R$ {props.data.gameRecharge || 0.00}</span>
          <span className="font-hairline" style={{fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.75)'}}>Valor da transação do jogo</span>
        </div>

        <div className={"flex flex-col"}>
          <span className={"text-lg text-[#ffffff]"}>R$ {props.data.gameRechargeReward || 0.00}</span>
          <span className="font-hairline"
                style={{fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.75)'}}>Obter bônus</span>
        </div>
      </div>

    </MobileBlueBackgroundShadowContainer>
  )
}
