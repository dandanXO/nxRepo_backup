import { CopyOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import cx from "classnames"
import {environment} from "../../../../environments/environment";
import { useRechargeHistoryListMutation, useWithdrawHistoryListMutation } from "../../../external";
import { useEffect } from "react";
import { AppLocalStorage } from "../../../persistant/localstorage";
import {AppLocalStorageKey} from "../../../persistant/AppLocalStorageKey";

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
      <img className={'h-[100px]'} alt="NoData" src={`assets/${environment.assetPrefix}/noData.png`}/>
      <div>Nada aq</div>
    </div>
  )
}
export const DepositMobileTable = () => {
  const [triggerGetDepositRecord, { data }] = useRechargeHistoryListMutation()

  useEffect(()=>{
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
              className="mb-4 flex flex-col rounded-2xl py-2 text-white bg-varient text-base border border-solid border-main-primary-main"
            >
              <div
                className={
                  'mb-2 flex flex-row justify-between border-b-[1px] border-assistant px-4 py-1 text-main-primary-main '
                }
              >
                <span>ID da ordem: {record.id}</span>
                <CopyOutlined className={'text-main-primary-main'} />
              </div>

              <div
                className={
                  'mb-2 flex flex-row justify-between border-b-[1px] border-assistant px-4 py-1'
                }
              >
                <span className={''}>Valor</span>
                <span className={''}>R${Number(record.amount).toFixed(2)}</span>
              </div>

              <div
                className={
                  'mb-2 flex flex-row justify-between border-b-[1px] border-assistant px-4 py-1'
                }
              >
                <span className={''}>valor do bônus</span>
                <span className={''}>
                  R${(Number(record.amount) * Number(record.rate)).toFixed(2)}
                </span>
              </div>

              <div className={'mb-2 flex flex-row justify-between border-b-[1px] border-assistant px-4 py-1'}>
                <span className={''}>Modelo</span>
                <span className={''}>{record.pay_channel}</span>
              </div>

              <div className={'flex flex-row justify-between border-assistant px-4 py-1'}>
                <span className={''}>{record.created_at}</span>
                <span style={{ color:
                    record.status === 2 ? '#FFA500' :   // 橘色
                      record.status === 3 ? '#FF0000' :   // 红色
                        record.status === 1 ? '#008000' :   // 绿色
                          '#FFFFFF'  // 白色 (默认)
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

  useEffect(()=>{
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
              className="mb-4 flex flex-col rounded-2xl py-2 text-white bg-varient text-base border border-solid border-main-primary-main"
            >
              <div
                className={
                  'mb-2 flex flex-row justify-between border-b-[1px] border-assistant px-4 py-1 text-main-primary-main '
                }
              >
                <span>ID da ordem: {record.pay_serial_no}</span>
                <CopyOutlined className={'text-main-primary-main'} />
              </div>

              <div
                className={
                  'mb-2 flex flex-row justify-between border-b-[1px] border-assistant px-4 py-1'
                }
              >
                <span className={''}>Valor</span>
                <span className={''}>R${Number(record.amount).toFixed(2)}</span>
              </div>

              <div
                className={
                  'mb-2 flex flex-row justify-between border-b-[1px] border-assistant px-4 py-1'
                }
              >
                <span className={''}>Taxa de retirada</span>
                <span className={''}>R${Number(record.fee).toFixed(2)}</span>
              </div>

              <div
                className={
                  'mb-2 flex flex-row justify-between border-b-[1px] border-assistant px-4 py-1'
                }
              >
                <span className={''}>Modelo</span>
                <span className={''}>{record.pay_channel}</span>
              </div>

              <div className={'flex flex-row justify-between border-assistant px-4 py-1'}>
                <span className={''}>{record.created_at}</span>
                <span style={{ color:
                    record.status === 2 ? '#FFA500' :   // 橘色
                      record.status === 3 ? '#FF0000' :   // 红色
                        record.status === 1 ? '#008000' :   // 绿色
                          '#FFFFFF'  // 白色 (默认)
                }}>{TradeStatusMap[record.status]}</span>
              </div>
            </Container>
          ))}
        </div>
      }
    </div>
  );
};
