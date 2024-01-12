import moment from "moment/moment";
import { useState } from "react";
import { CommonTableTabG } from "../../../../../components-bs/TabItem/CommonTableTabG";
import { environment } from "apps/gambling/src/environments/environment";
import { QuestionTipsIcon } from "../../../../../components-bs/Icons/QuestionTipsIcon";
import ConfirmDrawer from "../../../../../components-bs/Drawers/ConfirmDrawer";
import DatePicker from "../../../../../components-bs/DatePickers/DatePicker";
import { IMobileDailyTable } from "../..";
import { TabItem } from "../../../../../components-bs/TabItem/env/riojungle/TabItem";
import { MobileTableListItem } from "./components/MobileTableListItem";
import cx from 'classnames';
import { NoData } from "../../../../../components-bs/Table/env/riojungle/NoData";
import { IconTooltip } from "apps/gambling/src/app/ui/components/Tooltips/IconTooltip";


export const MobileDailyTable = (props: IMobileDailyTable) => {
  const [inviteBonusInfoOpen, setInviteBonusInfoOpen] = useState(false)
  return (
    <div className={"pb-2 flex flex-col rounded-2xl text-[#ffffff] text-left"}>
      <div className={"flex flex-col justify-center items-center flex-wrap my-3 px-4"}>
        <div id={"tab-item"} className="w-full flex justify-center items-center ">
          <div className="w-full bg-[var(--grayscale-20)] flex flex-row rounded-[100px] ">
            <TabItem active={props.type === "1"} onClick={() => props.onClick("1")} name={'Nível 1'} />
            <TabItem active={props.type === "2"} onClick={() => props.onClick("2")} name={'Nível 2'} />
            <TabItem active={props.type === "3"} onClick={() => props.onClick("3")} name={'Nível 3'} />
          </div>
        </div>
        <div className={"text-sm lg:text-base text-center lg:text-right mt-2 lg:mt-0 font-bold"}>
          {props.isProxy && <div className="text-[var(--state-info-main)]">Dividends:R$ {props.records && props.records[0] && props.records[0].dividendos || "0.00"}</div>}
          <div className="text-[var(--state-warn-main)]">Atualize a cada 30 minutos</div>
        </div>
      </div>
      {/* <div className={"text-[transparent] mb-2"}>
        <DatePicker onConfirm={props.onRecordDateSelect} value={props.recordDate} min={moment().subtract(1, 'days').format('YYYY-MM-DD')} max={moment().format('YYYY-MM-DD')} />
      </div> */}
      <div className="bg-[var(--grayscale-20)] flex flex-col p-2 rounded-lg">
        {
          props.records !== undefined && props.records?.length > 0 ? props.records.map((record: any, index: number) => {
            return (

              <div className={cx("border-solid border-[var(--grayscale-30)] bg-[var(--grayscale-15)] flex flex-col  w-full border px-2 rounded-lg", {
                'mb-2.5': index !== props.records?.length - 1
              })}>
                {props.isProxy ? (<MobileTableListItem className="text-xs" title={'Dividends'} text={`R$ ${record.dividendos || '0,00'}`} bottomLine={false} />) : null}
                <MobileTableListItem className="text-xs" title={'Data'} text={record.day || ''} />
                <MobileTableListItem className="text-xs" title={'Usuário De Recarga'} text={record.numRecharge || 0} />
                {props.type === "1" &&
                  <MobileTableListItem className="text-xs" title={'Primeira Recarga Recompensas'} text={`R$ ${record.firstRecharge || '0,00'}`} />
                }
                <MobileTableListItem className="text-xs" title={'Valor da transação do jogo'} text={`R$ ${record.gameRecharge || '0,00'} `} />
                <MobileTableListItem className="text-xs" title={<div className='flex items-center'>
                  <div className="text-[var(--grayscale-70)]">{'Recompensas De Troca De Jogos'}</div>
                  <div className='ml-1 self-start' onClick={() => setInviteBonusInfoOpen(true)}>
                    <IconTooltip
                      tooltipStyle={{ fontSize: '14px', width: '200px', background: "#999", color: '#333', borderRadius: '8px', zIndex: 10, fontWeight: '500' }}
                      id='game-bonus-tooltip-desktop'
                      icon={<QuestionTipsIcon className={'text-base text-[#F59E0B]'} />}
                      content='As recompensas são liquidadas toda segunda-feira'
                    />
                  </div>
                </div>} text={`R$ ${record.gameRechargeReward || '0,00'}`}
                />
                <MobileTableListItem className="text-xs" title={'Bônus'} text={`R$ ${record.totalReward || '0,00'}`} bottomLine={false} />
              </div>
            )
          }) :
            <NoData />
        }
      </div>
    </div>
  )
}
