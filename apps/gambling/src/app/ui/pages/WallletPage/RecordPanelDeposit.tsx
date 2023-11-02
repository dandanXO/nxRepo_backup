import { RechargeListResponseData } from '../../../external/RechargeHistoryListEndpoint';

const DepositStatusMap: { [key: number]: string } = {
  1: 'Completed',
  2: 'Pending',
  3: 'Failed',
  4: 'Failed',
  5: 'Frozen',
};

interface IRecordPanelDepositProps {
  records: RechargeListResponseData[];
}

export const RecordPanelDeposit = ({ records }: IRecordPanelDepositProps) => {
  return (
    <div className="h-[25vh] overflow-x-auto">
      <table className="table-zebra relative table w-full">
        {/* head */}
        <thead className="sticky top-0">
          <tr>
            <th>identificador</th>
            <th className="text-center">Valor</th>
            <th className="text-center">Bônus</th>
            <th className="text-center">Método De Depósito</th>
            <th className="text-center">Estado Do Depósito</th>
            <th className="text-center">Tempo</th>
          </tr>
        </thead>

        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td className={'flex flex-row'}>
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
              <td className="text-center">
                R${(Number(record.amount) * Number(record.rate)).toFixed(2)}
              </td>
              <td className="text-center">{record.pay_channel}</td>
              <td className="text-center">{DepositStatusMap[record.status]}</td>
              <td className="text-center">{record.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
