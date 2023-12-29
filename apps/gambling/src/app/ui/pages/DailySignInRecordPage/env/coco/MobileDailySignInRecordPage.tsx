import React from "react";
import { GetSignInRecordResponseData } from "../../../../../external";
import { BackNavigation } from "../../../../components/BackNavigation/BackNavigation";
import { usePageNavigate } from "../../../../hooks/usePageNavigate";
import { formatLocaleMoney } from "../../../../utils/format";
import { NoData } from "../../../../components-bs/theme/Icons/NoData";
import { Container } from "../../../../components/container/Container";

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
      <div className='grow h-full overflow-y-auto mt-6'>
        {
          records?.map((record, index: number) => {
            return (
              <table key={index} className='table table-zebra mb-4 rounded-lg overflow-hidden w-full text-white text-center text-sm font-bold'>
                <tbody>
                  <tr className='flex'>
                    <Title>ID</Title>
                    <Content>{record.id}</Content>
                  </tr>
                  <tr className='flex'>
                    <Title>VIP</Title>
                    <Content>{record.vip_level}</Content>
                  </tr>
                  <tr className='flex'>
                    <Title>Coleta Contínua</Title>
                    <Content>{record.days} dia{record.days > 1 ? 's' : ''}</Content>
                  </tr>
                  <tr className='flex'>
                    <Title>Obter Recompensas</Title>
                    <Content>R$ {formatLocaleMoney(record.cashback / 100)}</Content>
                  </tr>
                  <tr className='flex'>
                    <Title>Tempo</Title>
                    <Content>{record.created_at}</Content>
                  </tr>
                </tbody>
              </table>
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
