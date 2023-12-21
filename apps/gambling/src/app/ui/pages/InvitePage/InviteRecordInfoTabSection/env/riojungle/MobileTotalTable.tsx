import { useState } from "react";
import { IMobileTotalTable, ITabType } from "../../index";
import ConfirmDrawer from "../../../../../components/Drawers/ConfirmDrawer";
import { environment } from "apps/gambling/src/environments/environment";
import cx from 'classnames';
import { QuestionTipsIcon } from "../../../../../components/Icons/QuestionTipsIcon";
import { TabItem } from "apps/gambling/src/app/ui/components/TabItem/env/riojungle/TabItem";


export const MobileTotalTable = (props: IMobileTotalTable) => {
  const [inviteBonusInfoOpen, setInviteBonusInfoOpen] = useState(false)
  return (
    <div className={"flex flex-col rounded-2xl pb-2 text-[#ffffff] text-left"}>
      <div>
        <div id={"tab-item"} className="w-full flex justify-start items-start my-3 md:my-5">
          <div className="bg-[#333333] flex flex-row rounded-[100px]">
            <TabItem active={props.type === "1"} onClick={() => props.onClick("1")} name={'Nível 1'} />
            <TabItem active={props.type === "2"} onClick={() => props.onClick("2")} name={'Nível 2'} />
            <TabItem active={props.type === "3"} onClick={() => props.onClick("3")} name={'Nível 3'} />
          </div>
        </div>
      </div>
    

      <div className="py-3 bg-[var(--white-20)] text-white text-center px-2">
        {props.isProxy && (
          <div className={"flex flex-row justify-end"}>
            <span className={"text-xs text-[var(--secondary-assistant)]"}>Dividends: R$ {props.data.dividendos || "0.00"}</span>
          </div>
        )}
        <div className={"flex flex-col mb-2"}>
          <span className={"text-xl text-[#ffffff]"}>R$ {props.data.totalReward}</span>
          <span className="text-xs font-hairline">Obter bônus</span>
        </div>

        {props.type === "1" && (
          <div className={"flex flex-row justify-around items-center mb-5"}>
            <div className={"flex flex-col flex-1 justify-center"}>
              <span className={"text-sm text-[#ffffff]"}>{props.data.numRecharge || 0}</span>
              <span className="text-xs font-hairline">Usuário de recarga</span>
            </div>

            <div className={"flex flex-col flex-1 justify-center"}>
              <span className={"text-sm text-[#ffffff]"}>R$ {props.data.firstRecharge}</span>
              <span className="text-xs font-hairline">Obter bônus</span>
            </div>
          </div>
        )}

        <div className={"flex flex-row justify-around mb-2"}>
          <div className={"flex flex-col flex-1 justify-center"}>
            <span className={"text-sm text-[#ffffff]"}>R$ {props.data.gameRecharge}</span>
            <span className="text-xs font-hairline">Valor da transação do jogo</span>
          </div>

          <div className={"flex flex-col flex-1"} onClick={() => setInviteBonusInfoOpen(true)}>
            <div className='flex items-center  justify-center'>
              <span className={"text-sm text-[#ffffff]"}>R$ {props.data.gameRechargeReward}</span>
              <QuestionTipsIcon className="text-xs ml-1 self-baseline" />
            </div>
            <span className="text-xs font-hairline">Obter bônus</span>
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
          </div>
        </div>
      </div>
    </div>
  )
}
