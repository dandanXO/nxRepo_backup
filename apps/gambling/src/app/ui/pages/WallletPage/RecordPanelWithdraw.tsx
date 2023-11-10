import { WithdrawHistoryListEndpointResponseData } from '../../../external/WithdrawHistoryListEndpoint';
import cx from "classnames";
import {environment} from "../../../../environments/environment";

const WithdrawStatusMap: { [key: number]: string } = {
  1: 'Completed',
  2: 'Pending',
  3: 'Failed',
  4: 'Failed',
  5: 'Frozen',
};

interface IRecordPanelWithdrawProps {
  records: WithdrawHistoryListEndpointResponseData[];
}

export const RecordPanelWithdraw = ({ records }: IRecordPanelWithdrawProps) => {
  return (
    <div className="overflow-x-auto text-white text-center" style={{borderWidth:'1px',borderColor:'#58DCC7',borderRadius:'10px'}}>
      <table className="table-zebra relative table w-full">
        {/* head */}
        <thead className="sticky top-0">
          <tr>
            <th className="text-center">ID da ordem</th>
            <th className="text-center">Valor</th>
            <th className="text-center">Valor do bônus</th>
            <th className="text-center">Modelo</th>
            <th className="text-center">Estado Do Depósito</th>
            <th className="text-center">Tempo</th>
          </tr>
        </thead>

        <tbody>
          {records !== undefined && records.length > 0 ? records.map((record) => (
            <tr key={record.id}>
              <td className={'flex flex-row justify-center'}>
                <span>{record.pay_serial_no}</span>
                <span>
                  <button>
                    <img
                      className="h-[20px] w-[22px]"
                      alt={'copy'}
                      src={
                        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAkBAMAAAAX21WWAAAALVBMVEUAAAD///////////////////////////////////////////////////////+hSKubAAAAD3RSTlMAslqHLVh8VSU4cCENn3Foj007AAAAbUlEQVQoz2MgDbAkG0NAJkKMVxAGGuBibHCxAoTCFhcw8BMMwDCXCZ/YNGOYpXAxDkGEpTAxdoRYAVQMqH4JxFIvQQWEmALUgpEoVoAhxi24AUOM4QyCiWCQKoYIeyAXI46AXIy4BHIx4pwkAABWmSbbBWXeeAAAAABJRU5ErkJggg=='
                      }
                    />
                  </button>
                </span>
              </td>
              <td className="text-center">
                R${Number(record.amount).toFixed(2)}
              </td>
              <td className="text-center">R${Number(record.fee).toFixed(2)}</td>
              <td className="text-center">{record.pay_channel}</td>
              <td className="text-center">
                {WithdrawStatusMap[record.status]}
              </td>
              <td className="text-center">{record.created_at}</td>
            </tr>
          )):(<tr>
              <td colSpan={6}>
                <div className="flex flex-col items-center p-14" style={{backgroundColor:'#006D79'}}>
                  <div><img className={'h-[100px]'} src={`assets/${environment.assetPrefix}/noData.png`} /></div>
                  <div>Nothing here</div>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
