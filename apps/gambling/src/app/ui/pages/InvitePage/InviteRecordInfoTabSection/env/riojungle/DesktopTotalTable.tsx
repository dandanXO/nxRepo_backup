import { IconTooltip } from "apps/gambling/src/app/ui/components/Tooltips/IconTooltip";
import { QuestionTipsIcon } from "../../../../../components-bs/theme/Icons/QuestionTipsIcon";
import { ITotal } from "../..";

export const DesktopTotalTable = (props: ITotal & { type: string }) => {

  const thStyle = "text-sm lg:text-base px-2 lg:px-3 border-r border-[rgba(255,255,255,0.2)] text-[#b3b3b3] font-normal lg:font-bold";
  const tdStyle = 'text-sm lg:text-lg px-2 lg:px-3 text-center pt-5 border-r border-[rgba(255,255,255,0.2)] text-white font-bold'

  return (
    <div className="border border-solid border-[#666] overflow-x-auto px-3 lg:p-5 shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)] bg-[#333333] rounded-lg">
      <table className="w-full">
        <thead>
          <tr>
            <th className={thStyle}>Usuário De Recarga</th>
            {props.type === "1" && <th className={thStyle}>Primeira Recarga Recompensas</th>}
            {/* {props.isProxy && <th className={thStyle}>Dividendos</th>} */}
            <th className={thStyle}>Valor Da Transação Do Jogo</th>
            <th className={`${thStyle}`}>
              <div className="flex">
                <div>Recompensas De Troca De Jogos</div>
                <div className='ml-1 self-start'>
                  <IconTooltip
                    id='game-bonus-tooltip'
                    icon={<QuestionTipsIcon className={'text-base'} />}
                    content='As recompensas são liquidadas toda segunda-feira'
                  />
                </div>
              </div>
            </th>
            <th className='text-sm lg:text-base p-4 text-[#b3b3b3]'>Recompensa Total</th>
          </tr>
        </thead>

        <tbody>
          {/* row 1 */}
          <tr>
            <td className={tdStyle}>{props?.data.numRecharge || 0}</td>
            {props.type === "1" && <td className={tdStyle}>{props?.data.firstRecharge}</td>}
            {/* {props.isProxy && <td className={tdStyle}>R${props?.data.dividendos}</td>} */}
            <td className={tdStyle}>{props?.data.gameRecharge}</td>
            <td className={tdStyle}>{props?.data.gameRechargeReward}</td>
            <td className='text-sm lg:text-lg text-center pt-5 text-white'>{props?.data.totalReward}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
