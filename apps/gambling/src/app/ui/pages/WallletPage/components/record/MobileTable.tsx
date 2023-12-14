import { CopyOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import cx from "classnames"
import { environment } from "../../../../../../environments/environment";
import { useRechargeHistoryListMutation, useWithdrawHistoryListMutation } from "../../../../../external";
import { useEffect } from "react";
import { AppLocalStorage } from "../../../../../persistant/localstorage";
import { AppLocalStorageKey } from "../../../../../persistant/AppLocalStorageKey";
import { formatLocaleMoney } from "../../../../utils/format";
import { CopyIcon } from '../../../../components/Icons/CopyIcon';

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
    <div className=' flex flex-col justify-center items-center py-10'>
      <img className={'h-[100px]'} alt="NoData" src={`assets/${environment.assetPrefix}/noData.png`} />
      <div>Nada aqui</div>
    </div>
  )
}
export const DepositMobileTable = () => {
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
      {data?.data?.length === 0
        ? <NoData />
        : <div className="h-[80vh] overflow-y-auto">
          {data?.data?.map((record) => (
            <Container
              key={record.id}
              className={cx("mb-2 flex flex-col rounded-2xl text-white text-sm",
                "bg-gradient-to-b from-[var(--primary-main-from)] to-[var(--primary-main-to)]"
              )}
            >
              <div className={'flex flex-row justify-between px-5 pt-2.5 pb-1.5 items-center'}>
                <div className='font-bold text-white'>ID da ordem: {record.pay_serial_no}</div>
                <CopyIcon className={'text-[var(--secondary-assistant)] self-baseline'} copyText={record.pay_serial_no} />
              </div>
              <div className={'flex flex-row justify-between border-b-[1px] border-[var(--white-20)] px-5 pt-3 pb-2'}>
                <span className={''}>Valor</span>
                <span className={''}>R$ {formatLocaleMoney(Number(record.amount))}</span>
              </div>

              <div
                className={' flex flex-row justify-between border-b-[1px] border-[var(--white-20)] px-5 pt-3 pb-2'
                }
              >
                <span className={''}>bônus</span>
                <span className={''}>
                  R$ {formatLocaleMoney(Number(record.amount) * Number(record.rate))}
                </span>
              </div>

              <div className={' flex flex-row justify-between border-b-[1px] border-[var(--white-20)] px-5 pt-3 pb-2'}>
                <span className={''}>Modelo</span>
                <span className={''}>{record.pay_channel}</span>
              </div>

              <div className={'flex flex-row justify-between border-assistant px-5 pt-3 pb-2'}>
                <span className={''}>{record.created_at}</span>
                <span style={{
                  color:
                    record.status === 2 ? 'var(--secondary-assistant)' :   // 橘色
                      record.status === 3 ? 'var(--state-error-main)' :   // 红色
                        record.status === 1 ? 'var(--state-success-main)' :   // 绿色
                          'var(--white)'  // 白色 (默认)
                }}>{TradeStatusMap[record.status]}</span>
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
      {data?.data?.length === 0
        ? <NoData />
        : <div className={cx("overflow-y-auto", { "h-[80vh]": data?.data?.length || 0 > 0 })}>
          {data?.data?.map((record) => (
            <Container
              key={record.id}
              className={cx("mb-2 flex flex-col rounded-2xl text-white text-sm",
                "bg-gradient-to-b from-[var(--primary-main-from)] to-[var(--primary-main-to)]"
              )}
            >
              <div className={'flex flex-row justify-between px-5 pt-2.5 pb-2 items-center'}>
                <div className='font-bold'>ID da ordem: {record.pay_serial_no}</div>
                <CopyIcon className={'text-[var(--secondary-assistant)]'} copyText={record.pay_serial_no} />
              </div>

              <div className={'flex flex-row justify-between border-b-[1px] border-[var(--white-20)] px-5 pt-3 pb-2'}>
                <span className={''}>Valor</span>
                <span className={''}>R$ {formatLocaleMoney(Number(record.amount))}</span>
              </div>

              <div className={'flex flex-row justify-between border-b-[1px] border-[var(--white-20)] px-5 pt-3 pb-2'}>
                <span className={''}>Taxa de retirada</span>
                <span className={''}>R$ {formatLocaleMoney(Number(record.fee))}</span>
              </div>

              <div className={'flex flex-row justify-between border-b-[1px] border-[var(--white-20)] px-5 pt-3 pb-2'}>
                <span className={''}>Modelo</span>
                <span className={''}>{record.pay_channel}</span>
              </div>

              <div className={'flex flex-row justify-between border-assistant px-5 pt-3 pb-2'}>
                <span className={''}>{record.created_at}</span>
                <span style={{
                  color: record.status === 2 ? 'var(--secondary-assistant)' :   // 橘色
                    record.status === 3 ? 'var(--state-error-main)' :   // 红色
                      record.status === 1 ? 'var(--state-success-main)' :   // 绿色
                        'var(--white)'  // 白色 (默认)
                }}>{TradeStatusMap[record.status]}</span>
              </div>
            </Container>
          ))}
        </div>
      }
    </div>
  );
};
