import { CopyOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import { RechargeListResponseData } from '../../../external/RechargeHistoryListEndpoint';
import { WithdrawHistoryListEndpointResponseData } from '../../../external/WithdrawHistoryListEndpoint';
import cx from "classnames"
import {environment} from "../../../../environments/environment";

const Container = styled.div`
  background: rgba(255, 255, 255, 0.1);
`;
interface IDepositMobileTableProps {
  records: RechargeListResponseData[];
}

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
export const DepositMobileTable = ({ records }: IDepositMobileTableProps) => {
  return (
    <div>
      {records.length === 0
        ? <NoData />
        : <div className="h-[80vh] overflow-y-auto">
          {records.map((record) => (
            <Container
              key={record.id}
              className="mb-4 flex flex-col rounded-2xl bg-[red] py-2 text-white"
            >
              <div
                className={
                  'mb-2 flex flex-row justify-between border-b-[0.0px] border-[rgba(255,255,255,.4)] px-4 py-1 text-[#ffdd0a]'
                }
              >
                <span>ID da ordem: {record.id}</span>
                <CopyOutlined className={'text-[#ffdd0a]'} />
              </div>

              <div
                className={
                  'mb-2 flex flex-row justify-between border-b-[0.0px] border-[rgba(255,255,255,.4)] px-4 py-1'
                }
              >
                <span className={'text-[#e2d7ff]'}>Valor</span>
                <span className={''}>R${Number(record.amount).toFixed(2)}</span>
              </div>

              <div
                className={
                  'mb-2 flex flex-row justify-between border-b-[0.0px] border-[rgba(255,255,255,.4)] px-4 py-1'
                }
              >
                <span className={'text-[#e2d7ff]'}>valor do bônus</span>
                <span className={''}>
                  R${(Number(record.amount) * Number(record.rate)).toFixed(2)}
                </span>
              </div>

              <div className={'mb-2 flex flex-row justify-between border-b-[0.0px] border-[rgba(255,255,255,.4)] px-4 py-1'}>
                <span className={'text-[#e2d7ff]'}>Modelo</span>
                <span className={''}>{record.pay_channel}</span>
              </div>

              <div className={'flex flex-row justify-between border-[rgba(255,255,255,.4)] px-4 py-1'}>
                <span className={'text-[#e2d7ff]'}>{record.created_at}</span>
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

interface IWithdrawMobileTableProps {
  records: WithdrawHistoryListEndpointResponseData[];
}

export const WithdrawMobileTable = ({ records }: IWithdrawMobileTableProps) => {
  return (
    <div>
      {records.length === 0
        ? <NoData />
        : <div className={cx("overflow-y-auto", { "h-[80vh]": records.length > 0 })}>
          {records.map((record) => (
            <Container
              key={record.id}
              className="mb-4 flex flex-col rounded-2xl bg-[red] py-2 text-white"
            >
              <div
                className={
                  'mb-2 flex flex-row justify-between border-b-[0.0px] border-[rgba(255,255,255,.4)] px-4 py-1 text-[#ffdd0a]'
                }
              >
                <span>ID da ordem: {record.pay_serial_no}</span>
                <CopyOutlined className={'text-[#ffdd0a]'} />
              </div>

              <div
                className={
                  'mb-2 flex flex-row justify-between border-b-[0.0px] border-[rgba(255,255,255,.4)] px-4 py-1'
                }
              >
                <span className={'text-[#e2d7ff]'}>Valor</span>
                <span className={''}>R${Number(record.amount).toFixed(2)}</span>
              </div>

              <div
                className={
                  'mb-2 flex flex-row justify-between border-b-[0.0px] border-[rgba(255,255,255,.4)] px-4 py-1'
                }
              >
                <span className={'text-[#e2d7ff]'}>Taxa de retirada</span>
                <span className={''}>R${Number(record.fee).toFixed(2)}</span>
              </div>

              <div
                className={
                  'mb-2 flex flex-row justify-between border-b-[0.0px] border-[rgba(255,255,255,.4)] px-4 py-1'
                }
              >
                <span className={'text-[#e2d7ff]'}>Modelo</span>
                <span className={''}>{record.pay_channel}</span>
              </div>

              <div className={'flex flex-row justify-between border-[rgba(255,255,255,.4)] px-4 py-1'}>
                <span className={'text-[#e2d7ff]'}>{record.created_at}</span>
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
