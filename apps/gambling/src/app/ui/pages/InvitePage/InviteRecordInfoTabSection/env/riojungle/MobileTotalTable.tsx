import { ReactElement, ReactNode, useState } from "react";
import { IMobileTotalTable, ITabType } from "../../index";
import ConfirmDrawer from "../../../../../components/Drawers/ConfirmDrawer";
import { environment } from "apps/gambling/src/environments/environment";
import cx from 'classnames';
import { QuestionTipsIcon } from "../../../../../components/Icons/QuestionTipsIcon";
import { TabItem } from "apps/gambling/src/app/ui/components/TabItem/env/riojungle/TabItem";
import styled from "styled-components";

const BottomLine = styled.div`
height: 1px;
 background: linear-gradient(90deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.20) 49.48%, rgba(255, 255, 255, 0.00) 100%);
`


const MobileTableListItem = (props: { title: string | ReactElement, text: any, bottomLine?: boolean }) => {
  const { title, text, bottomLine = true } = props;
  return (
    <div className="text-sm flex flex-col">
      <div className="flex justify-between py-2">
        <div className="text-[#B3B3B3]">{title}</div>
        <div className="text-white text-white">{text}</div>
      </div>
      {bottomLine && <BottomLine />}
    </div>
  )
}

export const MobileTotalTable = (props: IMobileTotalTable) => {
  const [inviteBonusInfoOpen, setInviteBonusInfoOpen] = useState(false);

  return (
    <div className={"flex flex-col rounded-2xl pb-2 text-[#ffffff] text-left"}>
      <div className={"flex flex-col justify-center items-center flex-wrap my-3"}>
        <div id={"tab-item"} className="w-full flex justify-center items-center">
          <div className="bg-[#333333] flex flex-row rounded-[100px]">
            <TabItem active={props.type === "1"} onClick={() => props.onClick("1")} name={'Nível 1'} />
            <TabItem active={props.type === "2"} onClick={() => props.onClick("2")} name={'Nível 2'} />
            <TabItem active={props.type === "3"} onClick={() => props.onClick("3")} name={'Nível 3'} />
          </div>
        </div>
        <div className={"text-sm lg:text-base text-center lg:text-right mt-2 lg:mt-0 font-bold"}>
          {props.isProxy && <div className="text-[#3B82F6]">Dividends:R$ {props.data.dividendos || "0.00"}</div>}
          <div className="text-[#F59E0B]">Atualize a cada 30 minutos</div>
        </div>
      </div>
      <div className={'border-solid border-[#666666] shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)] bg-[#333333] flex flex-col justify-center w-full px-2 py-2 border rounded-lg'}>
        <MobileTableListItem title={'Usuário de recarga'} text={props.data.numRecharge || 0} />
        {props.type === "1" &&
          <MobileTableListItem title={'Primeira Recarga Recompensas'} text={props.data.firstRecharge} />
        }
        <MobileTableListItem title={'Valor da transação do jogo'} text={props.data.gameRecharge} />
        <MobileTableListItem title={<div className='flex items-center'>
          <div onClick={() => setInviteBonusInfoOpen(true)}>
            <QuestionTipsIcon className="text-xs mr-1 flex" />
          </div>
          <div className="text-[#B3B3B3]">{'Recompensas De Troca De Jogos'}</div>
          {
            inviteBonusInfoOpen && (
              <ConfirmDrawer
                onClose={() => setInviteBonusInfoOpen(false)}
                buttonText='Eu vejo'
                title='Descrição detalhada'
                content='As recompensas são liquidadas toda segunda-feira'
              />
            )
          }
        </div>} text={props.data.numRecharge || 0}
        />
        <MobileTableListItem title={'Recompensa Total'} text={props.data.totalReward || 0} bottomLine={false} />
      </div>
    </div>
  )
}
