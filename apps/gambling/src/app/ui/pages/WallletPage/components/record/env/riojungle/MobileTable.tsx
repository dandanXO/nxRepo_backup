import { CopyOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import cx from "classnames"
import { environment } from "../../../../../../../../environments/environment";
import { useRechargeHistoryListMutation, useWithdrawHistoryListMutation } from "../../../../../../../external";
import { useEffect } from "react";
import copy from "copy-to-clipboard";
import { notification } from "antd";
import { AppLocalStorage } from "../../../../../../../persistant/localstorage";
import { AppLocalStorageKey } from "../../../../../../../persistant/AppLocalStorageKey";
import { formatLocaleMoney } from "../../../../../../utils/format";

const Container = styled.div`
  /* background: rgba(255, 255, 255, 0.1); */
`;

const TradeStatusMap: { [key: number]: string } = {
  1: 'Sucesso',
  2: 'Esperando',
  3: 'Falhar',
  4: 'Falhar',
  5: 'Congelados',
};
const NoData = () => {
  return (
    <div className=' flex flex-col justify-center items-center py-10 border-[#B3B3B3] border-dashed border-2 rounded-lg'>
      <img className={'h-[100px]'} alt="NoData" src={`assets/${environment.assetPrefix}/noData.png`} />
      <div>Nada aqui</div>
    </div>
  )
}
export const DepositMobileTable = () => {
  const [notice, contextHolder] = notification.useNotification()
  const onClickToCopy = (copyText: string) => {
    copy(copyText || '');
    notice.success({
      message: "Copiado!"
    })
  }
  const [triggerGetDepositRecord, { data }] = useRechargeHistoryListMutation()

  useEffect(() => {
    const token = AppLocalStorage.getItem(AppLocalStorageKey.token) || '';
    triggerGetDepositRecord({
      limit: 1000,
      page: 1,
      token
    })
  }, [])

  return (
    <div>
      {contextHolder}
      {data?.data?.length === 0
        ? <NoData />
        : <div className="h-[80vh] overflow-y-auto">
          {data?.data?.map((record) => (
            <Container
              key={record.id}
              className={cx("mb-2 flex flex-col rounded-2xl text-white text-sm",
                "bg-[var(--background-tabbar)]",
                "border-[#4D4D4D] border-solid border rounded-lg"
              )}
            >
              <div className={'flex flex-row justify-between border-b-[1px] border-[var(--white-20)] p-2 items-center'}>
                <div className='text-[#B3B3B3] font-normal'>Identificador</div>
                <div>
                  <span className='mr-1'>{record.pay_serial_no}</span>
                  <img className="h-[16px] w-[16px] inline-block" alt={'copy'}
                    onClick={()=>onClickToCopy(record.pay_serial_no)}
                    src={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAkBAMAAAAX21WWAAAALVBMVEUAAAD///////////////////////////////////////////////////////+hSKubAAAAD3RSTlMAslqHLVh8VSU4cCENn3Foj007AAAAbUlEQVQoz2MgDbAkG0NAJkKMVxAGGuBibHCxAoTCFhcw8BMMwDCXCZ/YNGOYpXAxDkGEpTAxdoRYAVQMqH4JxFIvQQWEmALUgpEoVoAhxi24AUOM4QyCiWCQKoYIeyAXI46AXIy4BHIx4pwkAABWmSbbBWXeeAAAAABJRU5ErkJggg=='}
                  />
                </div>  
              </div>
              <div className={'flex flex-row justify-between border-b-[1px] border-[var(--white-20)] p-2'}>
                <span className={'text-[#B3B3B3] font-normal'}>Valor</span>
                <span className={''}>R$ {formatLocaleMoney(Number(record.amount))}</span>
              </div>

              <div
                className={' flex flex-row justify-between border-b-[1px] border-[var(--white-20)] p-2'
                }
              >
                <span className={'text-[#B3B3B3] font-normal'}>bônus</span>
                <span className={''}>
                  R$ {formatLocaleMoney(Number(record.amount) * Number(record.rate))}
                </span>
              </div>

              <div className={' flex flex-row justify-between border-b-[1px] border-[var(--white-20)] p-2'}>
                <span className={'text-[#B3B3B3] font-normal'}>Método De Depósito</span>
                <span className={''}>{record.pay_channel}</span>
              </div>

              <div className={' flex flex-row justify-between border-b-[1px] border-[var(--white-20)] p-2'}>
                <span className={'text-[#B3B3B3] font-normal'}>Estado Do Depósito</span>
                <span style={{
                  color:
                    record.status === 2 ? 'var(--secondary-assistant)' :   // 橘色
                      record.status === 3 ? 'var(--state-error-main)' :   // 红色
                        record.status === 1 ? 'var(--state-success-main)' :   // 绿色
                          'var(--white)'  // 白色 (默认)
                }}>
                  {TradeStatusMap[record.status]}
                </span>
              </div>

              <div className={'flex flex-row justify-between border-assistant p-2'}>
                <span className='text-[#B3B3B3] font-normal'> Tempo </span>
                <span className={'text-white'}>{record.created_at}</span>
              </div>
            </Container>
          ))}
        </div>
      }
    </div>
  );
};

export const WithdrawMobileTable = () => {
  const [triggerGetWithdrawRecord, { data }] = useWithdrawHistoryListMutation({})
  const [notice, contextHolder] = notification.useNotification()
  const onClickToCopy = (copyText: string) => {
    copy(copyText || '');
    notice.success({
      message: "Copiado!"
    })
  }
  useEffect(() => {
    const token = AppLocalStorage.getItem(AppLocalStorageKey.token) || '';
    triggerGetWithdrawRecord({
      limit: 1000,
      page: 1,
      token
    })
  }, [])

  return (
    <div>
      {contextHolder}
      {data?.data?.length === 0
        ? <NoData />
        : <div className={cx("overflow-y-auto", { "h-[80vh]": data?.data?.length || 0 > 0 })}>
          {data?.data?.map((record) => (
            <Container
              key={record.id}
              className={cx("mb-2 flex flex-col rounded-2xl text-white text-sm",
                "bg-[var(--background-tabbar)]",
                "border-[#4D4D4D] border-solid border rounded-lg"
              )}
            >
               <div className={'flex flex-row justify-between border-b-[1px] border-[var(--white-20)] p-2 items-center'}>
                <div className='text-[#B3B3B3] font-normal'>Identificador</div>
                <div>
                  <span className='mr-1'>{record.pay_serial_no}</span>
                  <img className="h-[16px] w-[16px] inline-block" alt={'copy'}
                  onClick={()=>onClickToCopy(record.pay_serial_no)}
                    src={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAkBAMAAAAX21WWAAAALVBMVEUAAAD///////////////////////////////////////////////////////+hSKubAAAAD3RSTlMAslqHLVh8VSU4cCENn3Foj007AAAAbUlEQVQoz2MgDbAkG0NAJkKMVxAGGuBibHCxAoTCFhcw8BMMwDCXCZ/YNGOYpXAxDkGEpTAxdoRYAVQMqH4JxFIvQQWEmALUgpEoVoAhxi24AUOM4QyCiWCQKoYIeyAXI46AXIy4BHIx4pwkAABWmSbbBWXeeAAAAABJRU5ErkJggg=='}
                  />
                </div>  
              </div>

              <div className={'flex flex-row justify-between border-b-[1px] border-[var(--white-20)] p-2'}>
                <span className={'text-[#B3B3B3] font-normal'}>Valor</span>
                <span className={''}>R$ {formatLocaleMoney(Number(record.amount))}</span>
              </div>

              <div className={'flex flex-row justify-between border-b-[1px] border-[var(--white-20)] p-2'}>
                <span className={'text-[#B3B3B3] font-normal'}>Taxa de retirada</span>
                <span className={''}>R$ {formatLocaleMoney(Number(record.fee))}</span>
              </div>

              <div className={'flex flex-row justify-between border-b-[1px] border-[var(--white-20)] p-2'}>
                <span className={'text-[#B3B3B3] font-normal'}>Modelo</span>
                <span className={''}>{record.pay_channel}</span>
              </div>

              <div className={' flex flex-row justify-between border-b-[1px] border-[var(--white-20)] p-2'}>
                <span className={'text-[#B3B3B3] font-normal'}>Estado Do Depósito</span>
                <span style={{
                  color:
                    record.status === 2 ? 'var(--secondary-assistant)' :   // 橘色
                      record.status === 3 ? 'var(--state-error-main)' :   // 红色
                        record.status === 1 ? 'var(--state-success-main)' :   // 绿色
                          'var(--white)'  // 白色 (默认)
                }}>
                  {TradeStatusMap[record.status]}
                </span>
              </div>
              <div className={'flex flex-row justify-between border-assistant p-2'}>
                <span className='text-[#B3B3B3] font-normal'> Tempo </span>
                <span className={'text-white'}>{record.created_at}</span>
              </div>
            </Container>
          ))}
        </div>
      }
    </div>
  );
};
