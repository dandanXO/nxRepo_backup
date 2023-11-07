import NoData from '../../../../../assets/001/noData.png'

interface IDailyType {
  type: string;
  records?: any;
  isProxy: boolean;
}

export const DesktopDailyType = (props: IDailyType) => {
  const tableStyle = {
    thead: {
      borderCollapse: 'collapse',
    },
    th: {
      backgroundColor: '#498D68',
      color: '#fff',
      border: '0.5px solid #333',
    },
    td: {
      backgroundColor: '#3F7659',
      color: '#fff',
      border: '0.5px solid #333',
    },
  };

  return (
    <div className="overflow-x-auto text-white text-center">
      <table className="table table-zebra w-full">
        {/* head */}
        <thead>
          <tr>
            <th style={tableStyle.th}>Data</th>
            <th style={tableStyle.th}>Usuário De Recarga</th>
            {props.type === "1" && <th style={tableStyle.th}>Primeira Recarga Recompensas</th>}
            {props.isProxy && <th style={tableStyle.th}>Dividendos</th>}
            <th style={tableStyle.th}>Valor Da Transação Do Jogo</th>
            <th style={tableStyle.th}>Recompensas De Troca De Jogos </th>
            <th style={tableStyle.th}>Recompensa Total </th>
          </tr>
        </thead>
        <tbody>
          {props.records !== undefined && props.records?.length > 0 ? props.records?.map((s: any, index: number) => {
            return (
              <tr key={index}>
                <td style={tableStyle.td}>{s.day}</td>
                <td style={tableStyle.td}>{s.numRecharge}</td>
                {props.type === "1" && <td style={tableStyle.td}>{s.firstRecharge || 0.00}</td>}
                {props.isProxy && <td style={tableStyle.td}>{s.dividendos}</td>}
                <td style={tableStyle.td}>{s.gameRecharge || 0.00}</td>
                <td style={tableStyle.td}>{s.gameRechargeReward || 0.00}</td>
                <td style={tableStyle.td}>{s.totalReward || 0.00}</td>
              </tr>
            )
          }
          ) : (<tr>
            <td colSpan={props.type === "1" ? 6 : 5}>
              <div className="flex flex-col items-center">
                <div><img className={'h-[100px]'} src={NoData} /></div>
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
