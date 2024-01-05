import { useEffect, useRef, useState } from 'react';
import { useRechargeHistoryListMutation } from '../../../../../../../external';
import { RechargeListResponseData } from '../../../../../../../external/RechargeHistoryListEndpoint';
import { AppLocalStorage } from '../../../../../../../persistant/localstorage';
import { Table } from '../../../../../../components-bs/Table';
import copy from 'copy-to-clipboard';
import {notification} from 'antd';
import { DragScrollContainer } from '../../../../../../components/DragScrollContainer';
import {AppLocalStorageKey} from "../../../../../../../persistant/AppLocalStorageKey";
import { formatLocaleMoney } from "../../../../../../utils/format";


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

export const RecordPanelDeposit = () => {

  const [api, contextHolder] = notification.useNotification();

  const onClickToCopy = (copyText: string) => {
    copy(copyText || '');
    api.success({
      message: "Copiado!"
    })
  }

  const tableColumns = [
    {
      title: 'Identificador', name: 'pay_serial_no', key: 'pay_serial_no', width: '250px',
      render: (record: any) => {
        return (
          <div className='flex'>
            <div className='flex-1'>{record.pay_serial_no}</div>
            <button className='' onClick={()=>onClickToCopy(record.pay_serial_no)}>
              <img className="h-[20px] w-[22px]" alt={'copy'}
                   src={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAkBAMAAAAX21WWAAAALVBMVEUAAAD///////////////////////////////////////////////////////+hSKubAAAAD3RSTlMAslqHLVh8VSU4cCENn3Foj007AAAAbUlEQVQoz2MgDbAkG0NAJkKMVxAGGuBibHCxAoTCFhcw8BMMwDCXCZ/YNGOYpXAxDkGEpTAxdoRYAVQMqH4JxFIvQQWEmALUgpEoVoAhxi24AUOM4QyCiWCQKoYIeyAXI46AXIy4BHIx4pwkAABWmSbbBWXeeAAAAABJRU5ErkJggg=='}
              />
            </button>
          </div>
        )
      }
    },
    { title: 'Valor', name: 'amount', key: 'amount', render: (record: any) => <div>R${formatLocaleMoney(Number(record.amount))}</div> },
    { title: 'Bônus', name: 'rate', key: 'rate', render: (record: any) => <div>R${(formatLocaleMoney(Number(record.amount) * Number(record.rate)))}</div> },
    { title: 'Método De Depósito', name: 'pay_channel', key: 'pay_channel' },
    { title: 'Estado Do Depósito', name: 'status', key: 'status', render: (record: any) => <div>{DepositStatusMap[record.status]}</div> },
    { title: 'Tempo', name: 'created_at', key: 'created_at' },
  ]

  // 充值紀錄
  const [triggerGetDepositRecord, { data: depositRecordData }] = useRechargeHistoryListMutation({});
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState<RechargeListResponseData[]>([]);


  useEffect(() => {
    const token = AppLocalStorage.getItem(AppLocalStorageKey.token) || '';
    triggerGetDepositRecord({
      limit: 10,
      page: page,
      token,
    });

  }, [page]);

  useEffect(() => {
    if (depositRecordData !== undefined) {
      setRecords(i => [...i, ...depositRecordData.data])
    }

  }, [depositRecordData?.data])

  const handleFetchData = () => {
    if (depositRecordData !== undefined) {
      if (page < depositRecordData.page.page_count) {
        setPage(i => i + 1)
      }
    }
  }

  return (
    <DragScrollContainer className='h-[40vh] rounded-xl overflow-hidden' >
      {contextHolder}
      {/* Table className  可以控制table內部整體css 去覆蓋預設設定 */}
      <Table
        className='!bg-[#333333]'
        titleStyle='text-sm border-transparent text-[#b3b3b3]'
        contentStyle='text-base !border-x-0 !border-y'
        columns={tableColumns}
        dataSource={records}
        fetchData={handleFetchData}
        dataCount={Number(depositRecordData?.page?.count)}
      />
    </DragScrollContainer>
  )
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
