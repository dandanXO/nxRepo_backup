import { environment } from "../../../../../../environments/environment";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../reduxStore";
import { usePageNavigate } from "../../../../router/hooks/usePageNavigate";
import {PageContainer} from "../../../../components-bs/PageContainer";


export const RechargeActivityPage = () => {

  const { recharge_cashback_rate } = useSelector((rootState: RootState) => rootState.app.config)

  const { onClickToWallet } = usePageNavigate();

  return (
   <PageContainer className={"text-white"}>
     {/*Banner*/}
     <div className='relative w-full mt-1 sm:mt-2 lg:mt-5'>
       <img alt='banner' src={`assets/${environment.assetPrefix}/${environment.assetVersionPrefix}/banner_20.png`}/>
       <div className='absolute left-3 sm:left-10 lg:left-16 top-1/2 -translate-y-1/2'>
         <div className='text-xl sm:text-[36px] sm:leading-[36px] lg:text-[60px] lg:leading-[60px] font-bold'>Bem-estar Oferta <br/> de depósito Ate</div>
         <button
           className='font-bold rounded-lg bg-[var(--secondary-main)] mt-3 sm:mt-8 px-2 sm:px-5 py-1 sm:py-3 text-base sm:text-xl lg:text-3xl shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)]'>
           Ate {recharge_cashback_rate} bônus
         </button>
       </div>
     </div>

     <div className='mt-5 sm:mt-8 lg:mt-10 font-medium text-base sm:text-lg lg:text-2xl'>
       A partir de agora, a recarga pode obter recompensas extras em dinheiro. Quanto mais você recarregar, maior será a taxa de recompensa, até {recharge_cashback_rate}. Após a recarga, o dinheiro extra também será transferido diretamente para a sua conta.
     </div>

     <div className='mt-5 lg:mt-10 text-sm sm:text-base lg:text-xl font-bold text-[#B3B3B3]'>
       Nota especial:
     </div>

     <div className='mt-5 text-[#B3B3B3] text-sm lg:text-base'>
       Certifique-se de que o seu número de conta, número de telemóvel e CPF são únicos. Se o mesmo usuário registrar várias contas para obter bônus, consideraremos isso trapaceando e as contas relevantes serão congeladas permanentemente.Não faremos qualquer compensação pelas perdas causadas por trapaça.
     </div>

     <button
       className='w-full mb-10 sm:mb-[96px] text-sm sm:text-base lg:text-xl bg-[var(--primary-main)] py-[10px] sm:py-3 lg:py-[14px] mt-5 sm:mt-8 lg:mt-10 rounded-lg shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)]'
       onClick={()=>onClickToWallet()}
     >
       Recarrague agora
     </button>
   </PageContainer>
  )
}
