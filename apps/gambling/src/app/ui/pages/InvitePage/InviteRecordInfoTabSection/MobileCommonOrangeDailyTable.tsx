import moment from "moment/moment";
import { ITabType } from "./index";
import { CommonTableTabG } from "../../../components/TabItem/CommonTableTabG";

import { MobileOrangeBackgroundShadowContainer as PMobileOrangeBackgroundShadowContainer } from "./env/pernambucana/MobileOrangeBackgroundShadowContainer";
import { MobileOrangeBackgroundShadowContainer as WMobileOrangeBackgroundShadowContainer } from "./env/wild/MobileOrangeBackgroundShadowContainer";
import { MobileOrangeBackgroundShadowContainer as CMobileOrangeBackgroundShadowContainer } from "./env/coco/MobileOrangeBackgroundShadowContainer";
import { renderByPlatform } from "../../../utils/renderByPlatform";
import DatePicker from "../../../components/DatePickers/DatePicker";
import { useState } from "react";
import { QuestionCircleOutlined } from "@ant-design/icons";
import ConfirmDrawer from "../../../components/Drawers/ConfirmDrawer";
import { environment } from "apps/gambling/src/environments/environment";
import { TabItem } from "../../../components/TabItem/TabItem";
import { tabItemProps } from "./env/coco/tabItemProps";
import { MobileTableContainer } from "./env/components/MobileTableContainer";

const MobileOrangeBackgroundShadowContainer = renderByPlatform({
  "wild777bet": WMobileOrangeBackgroundShadowContainer,
  "coco777bet": CMobileOrangeBackgroundShadowContainer,
}, PMobileOrangeBackgroundShadowContainer)


type IMobileCommonOrangeTable = ITabType & { records: any; isProxy: boolean; recordDate: string; onRecordDateSelect: (date: string) => void }


export const MobileCommonOrangeDailyTable = (props: IMobileCommonOrangeTable) => {
  const [inviteBonusInfoOpen, setInviteBonusInfoOpen] = useState(false)
  const isCoco777bet = environment.assetPrefix === 'coco777bet';
  const TableTabItem = isCoco777bet ? TabItem : CommonTableTabG;
  return (
    <MobileOrangeBackgroundShadowContainer className={"pb-2 flex flex-col rounded-2xl text-[#ffffff] text-left"}>
      <div className={"flex flex-row text-lg font-bold justify-around mb-2"}>
        <TableTabItem {...tabItemProps(props.type === "1")} active={props.type === "1"} onClick={() => props.onClick("1")} name={'Nível 1'}>Nível 1</TableTabItem>
        <TableTabItem {...tabItemProps(props.type === "2")} active={props.type === "2"} onClick={() => props.onClick("2")} name={'Nível 2'}>Nível 2</TableTabItem>
        <TableTabItem {...tabItemProps(props.type === "3")} active={props.type === "3"} onClick={() => props.onClick("3")} name={'Nível 3'}>Nível 3</TableTabItem>
      </div>



        <div className={"text-[transparent] mb-2"}>
          <DatePicker onConfirm={props.onRecordDateSelect} value={props.recordDate} min={moment().subtract(1, 'days').format('YYYY-MM-DD')} max={moment().format('YYYY-MM-DD')} />
        </div>

        <MobileTableContainer>
          {props.isProxy && (
            <div className={"flex flex-row justify-end"}>
              <span className={"text-base text-[#ffffff]"}>Dividends: R$ {props.records && props.records[0] && props.records[0].dividendos || "0.00"}</span>
            </div>
          )}
        <div className={"flex flex-col mb-2 mt-2"}>
          <span className={"text-xl text-[#ffffff]"}>R$ {props.records && props.records[0] && props.records[0].totalReward || '0,00'}</span>
          <span className="text-xs font-hairline">Obter bônus</span>
        </div>

        {props.type === "1" && (
          <div className={"flex flex-row justify-around mb-2"}>
            <div className={"flex flex-col flex-1 justify-center"}>
              <span className={"text-sm text-[#ffffff]"}>{props.records && props.records[0] && props.records[0].numRecharge || 0}</span>
              <span className="text-xs font-hairline">Usuário de recarga</span>
            </div>

            <div className={"flex flex-col flex-1 justify-center"}>
              <span className={"text-sm text-[#ffffff]"}>R$ {props.records && props.records[0] && props.records[0].firstRecharge || '0,00'}</span>
              <span className="text-xs font-hairline">Obter bônus</span>
            </div>
          </div>
        )}

        <div className={"flex flex-row justify-around mb-2"}>
          <div className={"flex flex-col flex-1 justify-center"}>
            <span className={"text-sm text-[#ffffff]"}>R$ {props.records && props.records[0] && props.records[0].gameRecharge || '0,00'}</span>
            <span className="text-xs font-hairline">Valor da transação do jogo</span>
          </div>

          <div className={"flex flex-col flex-1"} onClick={() => setInviteBonusInfoOpen(true)}>
            <div className='flex items-center justify-center'>
              <span className={"text-sm text-[#ffffff] mr-1"}>R$ {props.records && props.records[0] && props.records[0].gameRechargeReward || '0,00'}</span>
              <QuestionCircleOutlined style={{ color: isCoco777bet ? 'white' : '#FF8A00' }} />
            </div>
            <span className="text-xs font-hairline">Obter bônus</span>
            {
              inviteBonusInfoOpen && (
                <ConfirmDrawer
                  onClose={() => setInviteBonusInfoOpen(false)}
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
      </MobileTableContainer>
    </MobileOrangeBackgroundShadowContainer>
  )
}
