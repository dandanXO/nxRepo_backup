import {ITotal} from "./MobileCommonBlueTotalTable";
import { IconTooltip } from "../../../components/Tooltips/IconTooltip";
import { QuestionCircleOutlined } from "@ant-design/icons";

export const DesktopTotalType = (props: ITotal & { type: string }) => {
  return (
    <div className="overflow-x-auto text-white text-center rounded-xl">
      <table className="table table-zebra w-full">
        {/* head */}
        <thead>
        <tr>
          <th className='p-4 border-r border-[rgba(255,255,255,0.2)]'>Usuário De Recarga</th>
          {props.type === "1" && <th className='p-4 border-r border-[rgba(255,255,255,0.2)]'>Primeira Recarga Recompensas</th>}
          {props.isProxy && <th className='p-4 border-r border-[rgba(255,255,255,0.2)]'>Dividendos</th>}
          <th className='p-4 border-r border-[rgba(255,255,255,0.2)]'>Valor Da Transação Do Jogo</th>
          <th className='p-4 border-r border-[rgba(255,255,255,0.2)]'>
            Recompensas De Troca De Jogos
            <span className='ml-2'>
              <IconTooltip
                id='game-bonus-tooltip'
                icon={<QuestionCircleOutlined style={{ color: '#FF8A00'}} className='text-base' />}
                content='As recompensas são liquidadas toda segunda-feira'
              />
            </span>
          </th>
          <th className='p-4'>Recompensa Total</th>
        </tr>
        </thead>

        <tbody>
        {/* row 1 */}
        <tr>
          <td className='p-4 border-r border-[rgba(255,255,255,0.2)]'>{props?.data.numRecharge || 0}</td>
          {props.type === "1" && <td className='p-4 border-r border-[rgba(255,255,255,0.2)]'>R${props?.data.firstRecharge}</td>}
          {props.isProxy && <td className='p-4 border-r border-[rgba(255,255,255,0.2)]'>R${props?.data.dividendos}</td>}
          <td className='p-4 border-r border-[rgba(255,255,255,0.2)]'>R${props?.data.gameRecharge}</td>
          <td className='p-4 border-r border-[rgba(255,255,255,0.2)]'>R${props?.data.gameRechargeReward}</td>
          <td className='p-4'>R${props?.data.totalReward}</td>
        </tr>
        </tbody>
      </table>
    </div>
  );
};
