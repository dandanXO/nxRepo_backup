import { IconTooltip } from "apps/gambling/src/app/ui/components/Tooltips/IconTooltip";
import { QuestionTipsIcon } from "../../../../../components-bs/Icons/QuestionTipsIcon";
import { environment } from "apps/gambling/src/environments/environment";

interface IDailyType {
  type: string;
  records?: any;
  isProxy: boolean;
}

export const DesktopDailyTable = (props: IDailyType) => {
  return (
    <div className="overflow-x-auto text-white text-center rounded-xl" >
      <table className="table table-zebra w-full">
        {/* head */}
        <thead>
          <tr>
            <th className='p-4 border-r border-[rgba(255,255,255,0.2)]'>Data</th>
            <th className='p-4 border-r border-[rgba(255,255,255,0.2)]'>Usuário De Recarga</th>
            {props.type === "1" && <th className='p-4 border-r border-[rgba(255,255,255,0.2)]'>Primeira Recarga Recompensas</th>}
            {props.isProxy && <th className='p-4 border-r border-[rgba(255,255,255,0.2)]'>Dividendos</th>}
            <th className='p-4 border-r border-[rgba(255,255,255,0.2)]'>Valor Da Transação Do Jogo</th>
            <th className='p-4 border-r border-[rgba(255,255,255,0.2)]'>
              Recompensas De Troca De Jogos
              <span className='ml-2'>
                <IconTooltip
                  id='game-bonus-tooltip'
                  icon={<QuestionTipsIcon className={'text-base'} />}
                  content='As recompensas são liquidadas toda segunda-feira'
                />
              </span>
            </th>
            <th className='p-4'>Recompensa Total </th>
          </tr>
        </thead>
        <tbody>
          {props.records !== undefined && props.records?.length > 0 ? props.records?.map((s: any, index: number) => {

            return (
              <tr key={index}>
                <td className='p-4 border-r border-[rgba(255,255,255,0.2)]'>{s.day}</td>
                <td className='p-4 border-r border-[rgba(255,255,255,0.2)]'>{s.numRecharge}</td>
                {props.type === "1" && (
                  <td className='p-4 border-r border-[rgba(255,255,255,0.2)]'>{s.firstRecharge}</td>
                )}
                {props.isProxy && (
                  <td className='p-4 border-r border-[rgba(255,255,255,0.2)]'>{s.dividendos}</td>
                )}
                <td className='p-4 border-r border-[rgba(255,255,255,0.2)]'>{s.gameRecharge}</td>
                <td className='p-4 border-r border-[rgba(255,255,255,0.2)]'>{s.gameRechargeReward}</td>
                <td className='p-4 border-r border-[rgba(255,255,255,0.2)]'>{s.totalReward}</td>
              </tr>
            )
          }
          ) : (
            <tr>
              <td colSpan={props.type === "1" ? (props.isProxy ? 7 : 6) : (props.isProxy ? 6 : 5)}>
                <div className="flex flex-col items-center p-12">
                  <div><img className={'h-[100px]'} src={`assets/${environment.uVersion}/noData.png`} /></div>
                  <div>Nada aqui</div>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
