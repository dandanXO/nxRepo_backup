import {ITotal} from "./MobileCommonBlueTotalTable";
import { IconTooltip } from "../../../components/Tooltips/IconTooltip";
import { QuestionCircleOutlined } from "@ant-design/icons";

export const DesktopTotalType = (props: ITotal & { type: string }) => {
  return (
    <div className="overflow-x-auto text-white text-center" style={{borderWidth:'1px',borderColor:'var(--table-light)',borderRadius:'10px'}}>
      <table className="table table-zebra w-full">
        {/* head */}
        <thead>
        <tr>
          <th className='p-4'>Usuário De Recarga</th>
          {props.type === "1" && <th className='p-4'>Primeira Recarga Recompensas</th>}
          {props.isProxy && <th>Dividendos</th>}
          <th className='p-4'>Valor Da Transação Do Jogo</th>
          <th className='p-4'>
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
          <td className='p-4'>{props?.data.numRecharge || 0}</td>
          {props.type === "1" && <td className='p-4'>R${props?.data.firstRecharge || 0.00}</td>}
          {props.isProxy && <td className='p-4'>R${props?.data.dividendos}</td>}
          <td className='p-4'>R${props?.data.gameRecharge || 0.00}</td>
          <td className='p-4'>R${props?.data.gameRechargeReward || 0.00}</td>
          <td className='p-4'>R${props?.data.totalReward || 0.00}</td>
        </tr>
        </tbody>
      </table>
    </div>
  );
};
