import { IconTooltip } from "apps/gambling/src/app/ui/components/Tooltips/IconTooltip";
import { QuestionTipsIcon } from "../../../../../components-bs/Icons/QuestionTipsIcon";
import { ITotal } from "../..";
import useBreakpoint from "../../../../../pageTemplate/hooks/useBreakpoint";

export const DesktopTotalTable = (props: ITotal & { type: string }) => {

  const thStyle = "text-sm lg:text-base px-2 lg:px-3 border-r border-[rgba(255,255,255,0.2)] text-[var(--grayscale-70)] font-normal lg:font-bold";
  const tdStyle = 'text-sm lg:text-lg px-2 lg:px-3 text-center pt-5 border-r border-[rgba(255,255,255,0.2)] text-white font-bold'
  const { isTablet } = useBreakpoint()

  return (
    <div className="border border-solid border-[var(--grayscale-40)] overflow-x-auto px-3 md:p-5 shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)] bg-[var(--grayscale-20)] rounded-lg">
      <table className="w-full">
        <thead>
          <tr>
            <th className={thStyle}>Usuário De Recarga</th>
            {props.type === "1" && <th className={thStyle}>Primeira Recarga Recompensas</th>}
            {/* {props.isProxy && <th className={thStyle}>Dividendos</th>} */}
            <th className={thStyle}>Valor Da Transação Do Jogo</th>
            <th className={`${thStyle}`}>
              <div>
                Recompensas De Troca De Jogos
                <span className='ml-2'>
                  <IconTooltip
                    tooltipStyle={{ fontSize: isTablet ? '14px' : '16px', width: '250px', background: "#999", color: '#333', borderRadius: '8px', zIndex: 10, fontWeight: '500' }}
                    id='game-bonus-tooltip'
                    icon={<QuestionTipsIcon className={'text-base'} />}
                    content='As recompensas são liquidadas toda segunda-feira'
                  />
                </span>
              </div>
            </th>
            <th className='text-sm lg:text-base px-2 lg:px-3 text-[var(--grayscale-70)] font-normal lg:font-bold'>Recompensa Total</th>
          </tr>
        </thead>

        <tbody>
          {/* row 1 */}
          <tr>
            <td className={tdStyle}>{props?.data.numRecharge || 0}</td>
            {props.type === "1" && <td className={tdStyle}>R$ {props?.data.firstRecharge || '0,00'}</td>}
            {/* {props.isProxy && <td className={tdStyle}>R${props?.data.dividendos}</td>} */}
            <td className={tdStyle}>R$ {props?.data.gameRecharge || '0,00'}</td>
            <td className={tdStyle}>R$ {props?.data.gameRechargeReward || '0,00'}</td>
            <td className='text-sm lg:text-lg px-2 lg:px-3 text-center pt-5 text-white font-bold'>R$ {props?.data.totalReward || '0,00'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
