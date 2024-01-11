import React from "react";
import { GetSignInRecordResponseData } from "../../../../../external";
import { BackNavigation } from "../../../../components-bs/BackNavigation/BackNavigation";
import { usePageNavigate } from "../../../../router/hooks/usePageNavigate";
import { formatLocaleMoney } from "../../../../utils/format";
import { PageContainer } from "../../../../components-bs/PageContainer";
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
    <PageContainer y={false} >
      <BackNavigation
        onClick={() => onClickToCheckInDaily()}
      />
      <div className='grow h-full overflow-y-auto mt-6 bg-[var(--grayscale-20)] rounded-lg px-2'>
        {
          records?.map((record, index: number) => {
            return (
                <PageContainer
                key={record.id}
                className={cx("flex flex-col rounded-lg text-white text-sm",
                  "bg-[var(--grayscale-15)] border border-[var(--grayscale-30)] my-1",
                  {
                    'mt-2': index === 0
                  },
                  {
                    'mb-2': index === records.length-1
                  }
                )}
              >
                <div className={'flex flex-row justify-between border-b-[1px] border-[var(--white-20)] p-2 items-center'}>
                  <div className='text-[var(--grayscale-70)]'>ID</div>
                  <div>
                    {record.id}
                  </div>
                </div>
                <div className={'flex flex-row justify-between border-b-[1px] border-[var(--white-20)] p-2'}>
                  <span className={'text-[var(--grayscale-70)]'}>Nivel VIP</span>
                  <span>LV{record.vip_level}</span>
                </div>

                <div
                  className={' flex flex-row justify-between border-b-[1px] border-[var(--white-20)] p-2'}
                >
                  <span className={'text-[var(--grayscale-70)]'}>Coleta Contínua</span>
                  <span className={''}>
                    {record.days} dia{record.days > 1 ? 's' : ''}
                  </span>
                </div>

                <div className={' flex flex-row justify-between border-b-[1px] border-[var(--white-20)] p-2'}>
                  <span className={'text-[var(--grayscale-70)]'}>Recompensas</span>
                  <span>R$ {formatLocaleMoney(record.cashback / 100)}</span>
                </div>

                <div className={'flex flex-row justify-between border-assistant p-2'}>
                  <span className='text-[var(--grayscale-70)]'> Tempo </span>
                  <span className={'text-white'}>{record.created_at}</span>
                </div>
              </PageContainer>
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
    </PageContainer>
  )
}
