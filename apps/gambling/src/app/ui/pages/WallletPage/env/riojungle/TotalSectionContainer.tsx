import Banner from './TotalSectionBanner.png';
import iconTotal from './iconTotal.png';
import iconPromotion from './iconPromotion.png'
import iconDeposit from './iconDeposit.png'
import { ReactElement, useState } from 'react';
import { formatLocaleMoney } from '../../../../utils/format';
import { ITotalSectionValues, TotalSectionType } from '../pernambucana/WalletPage';


const IconTabItem = (props: { icon: string; text: ReactElement; onClick: () => void; }) => {
  return (
    <button onClick={props.onClick} className='flex flex-col justify-center items-center basis-[30%] flex-1 pt-3 pb-6 md:pt-5 md:pb-14 lg:pt-8 lg:pb-[84px]'>
      <img className='w-[40px] lg:w-[48px]' src={props.icon} />
      <div className='text-sm lg:text-base text-white'>{props.text}</div>
    </button>
  )
}

const AccountItem = (props: { account: number; text: string }) => {
  return (
    <div className='text-white flex flex-col items-center justify-center'>
      <div className='mb-2 md:mb-5 text-base md:text-2xl lg:text-4xl font-bold leading-6 md:leading-8 lg:leading-10 text-white '>
        <span className='mr-1'>R$</span>
        <span>{formatLocaleMoney(props.account)}</span>
      </div>
      <div className='text-sm lg:text-base font-medium leading-5 lg:leading-6 text-[#e6e6e6] flex-col md:flex-row'>{props.text}</div>
    </div>
  )
}

interface ITotalSectionContainer {
  totalSectionValues?: ITotalSectionValues;
};
export const TotalSectionContainer = (props: ITotalSectionContainer) => {
  const [accountTab, setAccountTab] = useState<TotalSectionType>('total');
  const { totalSectionValues = {} } = props;



  return (
    <div>
      <div className='relative'>
        <img src={Banner} className='w-full h-[124px] md:h-[144px] lg:h-[195px]' />
        <div className='w-full flex absolute top-0 left-0 h-full  '>
          <IconTabItem icon={iconTotal} text={<><div>Total</div><div>Conta</div></>} onClick={() => setAccountTab('total')} />
          <IconTabItem icon={iconDeposit} text={<><div>Depositar</div><div>Conta</div></>} onClick={() => setAccountTab('deposite')} />
          <IconTabItem icon={iconPromotion} text={<><div>Conta</div><div>Promovida</div></>} onClick={() => setAccountTab('promotion')} />
        </div>
      </div>
      <div className="relative px-2 md:px-5 lg:px-8 -mt-3 md:-mt-12 lg:-mt-14 z-10">
        <div className='bg-[#333333] flex flex-col justify-center  w-full items-center rounded-lg p-2 md:p-4 lg:p-5"'>
          <div className={`
               text-[#999999] font-medium text-center mb-3 md:mb-5
               text-sm lg:text-base leading-5 lg:leading-6 
               bg-gradient-to-r from-transparent via-[#ffffff1a] to-transparent 
               flex flex-row justify-center py-1 md:py-2 lg:py-2.5 w-full 
          `}>

            {accountTab === 'total' && `“Total Da Conta” é o registro financeiro de “Depositar conta” e “Conta promovida” somados`}
            {accountTab === 'deposite' && `Uma conta que consiste no valor da recarga, recompensas pela participação em atividades, vitórias e derrotas no jogo, etc.`}
            {accountTab === 'promotion' && `Uma conta composta por recompensas por convidar amigos e retorno de comissões com base no valor da transação dos usuários convidados.`}
          </div>
          <div className='flex justify-around w-full '>
            <AccountItem account={totalSectionValues[accountTab]?.balance || 0} text={accountTab === 'total' ? 'Balanço Total' : 'Balanço'} />
            <AccountItem account={totalSectionValues[accountTab]?.retrievable || 0} text={accountTab === 'total' ? 'Retirável Total' : 'Retirável'} />
          </div>
        </div>
      </div>
    </div >
  )
}