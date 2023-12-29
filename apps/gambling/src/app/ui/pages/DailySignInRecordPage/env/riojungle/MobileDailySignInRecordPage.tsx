import React from "react";
import { GetSignInRecordResponseData } from "../../../../../external";
import { BackNavigation } from "../../../../components/BackNavigation/BackNavigation";
import { usePageNavigate } from "../../../../hooks/usePageNavigate";
import { formatLocaleMoney } from "../../../../utils/format";

import { Container } from "../../../../components/container/Container";
import cx from "classnames"
import {NoData} from "../../../../components-bs/Icons/NoData";

const Title = ({ children }: { children: React.ReactNode }) => (
  <td className='w-1/3 px-1 h-10 flex justify-center items-center border-r border-[rgba(255,255,255,0.2)]'>
    {children}
  </td>
)

const Content = ({ children }: { children: React.ReactNode }) => (
  <td className='w-2/3 justify-center items-center flex'>
    {children}
  </td>
)


interface IMobileDailySignInRecordPageProps {
  records: GetSignInRecordResponseData[]
}

export const MobileDailySignInRecordPage = ({
  records
}: IMobileDailySignInRecordPageProps) => {

  const { onClickToCheckInDaily } = usePageNavigate();
  return (
    <Container y={false} >
      <BackNavigation
        onClick={() => onClickToCheckInDaily()}
        title={<div className={"w-full font-bold text-center"}>Registro Diário de Presença</div>}
      />
      <div className='grow h-full overflow-y-auto mt-6 bg-[#333333] rounded-lg px-2'>
        {
          records?.map((record, index: number) => {
            return (
                <Container
                key={record.id}
                className={cx("flex flex-col rounded-lg text-white text-sm",
                  "bg-[#262626] border-[#4d4d4d] my-1",
                  {
                    'mt-2': index === 0
                  },
                  {
                    'mb-2': index === records.length-1
                  }
                )}
              >
                <div className={'flex flex-row justify-between border-b-[1px] border-[var(--white-20)] p-2 items-center'}>
                  <div className='font-bold text-[var(--white-40)]'>ID</div>
                  <div>
                    <span className='mr-1'>{record.id}</span>
                  </div>
                </div>
                <div className={'flex flex-row justify-between border-b-[1px] border-[var(--white-20)] p-2'}>
                  <span className={'text-[var(--white-40)]'}>Nivel VIP</span>
                  <span className={''}>{record.vip_level}</span>
                </div>

                <div
                  className={' flex flex-row justify-between border-b-[1px] border-[var(--white-20)] p-2'}
                >
                  <span className={'text-[var(--white-40)]'}>Coleta Contínua</span>
                  <span className={''}>
                    {record.days} dia{record.days > 1 ? 's' : ''}
                  </span>
                </div>

                <div className={' flex flex-row justify-between border-b-[1px] border-[var(--white-20)] p-2'}>
                  <span className={'text-[var(--white-40)]'}>Recompensas</span>
                  <span className={''}>{formatLocaleMoney(record.cashback / 100)}</span>
                </div>

                <div className={'flex flex-row justify-between border-assistant p-2'}>
                  <span className='text-[var(--white-40)]'> Tempo </span>
                  <span className={'text-white'}>{record.created_at}</span>
                </div>
              </Container>
            )
          })
        }
        {
          records?.length === 0 && (
            <div className='h-full w-full flex flex-col gap-4 justify-center items-center'>
              <NoData className='h-[76px] w-[76px]' />
              <div className='text-white text-center font-medium text-lg'>Nada aqui</div>
            </div>
          )
        }
      </div>
    </Container>
  )
}
