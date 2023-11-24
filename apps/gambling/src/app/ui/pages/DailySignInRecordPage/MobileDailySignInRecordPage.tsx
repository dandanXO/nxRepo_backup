import React from "react";
import { GetSignInRecordResponseData } from "../../../external";
import { BackNavigation } from "../../components/BackNavigation/BackNavigation";
import { usePageNavigate } from "../../hooks/usePageNavigate";
import { formatMoney } from "../../utils/formatMoney";

const Title = ({ children }:{children: React.ReactNode}) => (
  <td className='w-1/3 px-1 h-10 flex justify-center items-center border-r border-[rgba(255,255,255,0.2)]'>
    {children}
  </td>
)

const Content = ({ children }:{children: React.ReactNode}) => (
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
    <div className='flex flex-col h-[100vh]'>
      <div className='px-1 pt-2 pb-1'>
        <BackNavigation
          onClick={()=> onClickToCheckInDaily()}
          title={<div className='ml-10 font-bold text-lg'>Registro Diário de Presença</div>}
        />
      </div>
      <div className='grow h-full mx-4 my-4 overflow-y-auto'>
        {
          records.map((record) => {
            return (
              <table className='table table-zebra mb-4 rounded-lg overflow-hidden w-full text-white text-center text-sm font-bold'>
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
                    <Content>{record.days} dia{record.days > 1 ? 's': ''}</Content>
                  </tr>
                  <tr className='flex'>
                    <Title>Obter Recompensas</Title>
                    <Content>R$ {formatMoney(record.cashback / 100)}</Content>
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
      </div>
    </div>
  )
}
