import moment from "moment/moment";
import {ITabType} from "./index";
import {CommonTableTabG} from "../../../components/TabItem/CommonTableTabG";

import {MobileOrangeBackgroundShadowContainer as PMobileOrangeBackgroundShadowContainer} from "./env/pernambucana/MobileOrangeBackgroundShadowContainer";
import {MobileOrangeBackgroundShadowContainer as WMobileOrangeBackgroundShadowContainer} from "./env/wild/MobileOrangeBackgroundShadowContainer";
import {MobileOrangeBackgroundShadowContainer as CMobileOrangeBackgroundShadowContainer} from "./env/coco/MobileOrangeBackgroundShadowContainer";
import {renderByPlatform} from "../../../utils/renderByPlatform";
import DatePicker from "../../../components/DatePickers/DatePicker";
import { useState } from "react";
import { QuestionCircleOutlined } from "@ant-design/icons";
import ConfirmDrawer from "../../../components/Drawers/ConfirmDrawer";

const MobileOrangeBackgroundShadowContainer = renderByPlatform({
  "wild777bet": WMobileOrangeBackgroundShadowContainer,
  "coco777bet": CMobileOrangeBackgroundShadowContainer,
}, PMobileOrangeBackgroundShadowContainer)


type IMobileCommonOrangeTable = ITabType & { records: any; isProxy: boolean; recordDate: string; onRecordDateSelect: (date: string) => void }


export const MobileCommonOrangeDailyTable = (props: IMobileCommonOrangeTable) => {
  const [inviteBonusInfoOpen, setInviteBonusInfoOpen] = useState(false)

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
        <DatePicker onConfirm={props.onRecordDateSelect} value={props.recordDate} min={moment().subtract(1, 'days').format('YYYY-MM-DD')} max={moment().format('YYYY-MM-DD')} />
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

        <div className={"flex flex-col"} onClick={()=>setInviteBonusInfoOpen(true)}>
          <div className='flex gap-2 items-center'>
            <span className={"text-lg text-[#ffffff]"}>R$ {props.records && props.records[0] && props.records[0].gameRechargeReward || "0.00"}</span>
            <QuestionCircleOutlined style={{ color: '#FF8A00'}} />
          </div>
          <span className="font-hairline">Obter bônus</span>
          {
            inviteBonusInfoOpen && (
              <ConfirmDrawer
                onClose={()=>setInviteBonusInfoOpen(false)}
                className='bg-gradient-to-t from-[#2E104C] to-[#3F28AF]'
                buttonStyle='bg-gradient-to-t from-[#d88c19] to-[#ffae1a]'
                buttonText='Eu vejo'
                title='Descrição detalhada'
                content='As recompensas são liquidadas toda segunda-feira'
              />
            )
          }
        </div>
      </div>

    </MobileOrangeBackgroundShadowContainer>
  )
}
