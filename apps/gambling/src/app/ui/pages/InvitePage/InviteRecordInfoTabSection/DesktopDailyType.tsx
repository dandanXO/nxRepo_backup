import {environment} from "../../../../../environments/environment";

interface IDailyType {
  type: string;
  records?: any;
  isProxy: boolean;
}

export const DesktopDailyType = (props: IDailyType) => {
  return (
    <div className="overflow-x-auto text-white text-center" style={{borderWidth:'1px',borderColor:'var(--table-light)',borderRadius:'10px'}}>
      <table className="table table-zebra w-full">
        {/* head */}
        <thead>
          <tr>
            <th className='p-4'>Data</th>
            <th className='p-4'>Usuário De Recarga</th>
            {props.type === "1" && <th>Primeira Recarga Recompensas</th>}
            {props.isProxy && <th>Dividendos</th>}
            <th className='p-4'>Valor Da Transação Do Jogo</th>
            <th className='p-4'>Recompensas De Troca De Jogos </th>
            <th className='p-4'>Recompensa Total </th>
          </tr>
        </thead>
        <tbody>
          {props.records !== undefined && props.records?.length > 0 ? props.records?.map((s: any, index: number) => {
            return (
              <tr key={index}>
                <td>{s.day}</td>
                <td>{s.numRecharge}</td>
                {props.type === "1" && <td>{s.firstRecharge || 0.00}</td>}
                {props.isProxy && <td>{s.dividendos}</td>}
                <td>{s.gameRecharge || 0.00}</td>
                <td>{s.gameRechargeReward || 0.00}</td>
                <td>{s.totalReward || 0.00}</td>
              </tr>
            )
          }
          ) : (<tr>
            <td colSpan={props.type === "1" ? 6 : 5}>
              <div className="flex flex-col items-center p-12" style={{backgroundColor:'var(--table-varient)'}}>
                <div><img className={'h-[100px]'} src={`assets/${environment.assetPrefix}/noData.png`} /></div>
                <div>Nothing here</div>
              </div>
            </td>
          </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
