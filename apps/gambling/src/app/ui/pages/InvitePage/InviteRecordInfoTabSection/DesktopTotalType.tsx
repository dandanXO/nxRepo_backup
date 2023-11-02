import {ITotal} from "./MobileCommonBlueTable";

export const DesktopTotalType = (props: ITotal & { type: string }) => {
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
          <th style={tableStyle.th}>Usuário De Recarga</th>
          {props.type === "1" && <th style={tableStyle.th}>Primeira Recarga Recompensas</th>}
          {props.isProxy && <th style={tableStyle.th}>Dividendos</th>}
          <th style={tableStyle.th}>Valor Da Transação Do Jogo</th>
          <th style={tableStyle.th}>Recompensas De Troca De Jogos </th>
          <th style={tableStyle.th}>Recompensa Total</th>
        </tr>
        </thead>

        <tbody>
        {/* row 1 */}
        <tr>
          <td style={tableStyle.td}>{props?.data.numRecharge || 0}</td>
          {props.type === "1" && <td style={tableStyle.td}>R${props?.data.firstRecharge || 0.00}</td>}
          {props.isProxy && <td style={tableStyle.td}>R${props?.data.dividendos}</td>}
          <td style={tableStyle.td}>R${props?.data.gameRecharge || 0.00}</td>
          <td style={tableStyle.td}>R${props?.data.gameRechargeReward || 0.00}</td>
          <td style={tableStyle.td}>R${props?.data.totalReward || 0.00}</td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}
