import { useSelector } from "react-redux";



import { environment } from "../../../../../../environments/environment";
import { RootState } from "../../../../../reduxStore";
import { usePageNavigate } from "../../../../router/hooks/usePageNavigate";
import {PageContainer} from "../../../../components-bs/PageContainer";


export const InitialChargePage = () => {

  const { onClickToWallet } = usePageNavigate();

  const { recharge_first_cashback_rate, recharge_bonus_start } = useSelector(
    (rootState: RootState) => rootState.app.config
  );

  return (
    <PageContainer className='text-white'>
      {/*Banner*/}
      <div className='relative w-full'>
        <img alt='banner' src={`assets/${environment.assetPrefix}/${environment.assetVersionPrefix}/banner_10.png`}/>
        <div className='absolute left-3 sm:left-10 lg:left-16 top-1/2 -translate-y-1/2'>
          <div className='text-xl sm:text-[36px] sm:leading-[36px] lg:text-[60px] lg:leading-[60px] font-bold'>Bônus de primeira <br/> recarga</div>
          <button
            className='font-bold rounded-lg bg-[#10B98F] mt-3 sm:mt-8 px-2 sm:px-5 py-1 sm:py-3 text-base sm:text-xl lg:text-3xl shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)]'>
            bônus de {recharge_first_cashback_rate}
          </button>
        </div>
      </div>

      <div className='mt-5 sm:mt-8 lg:mt-10 font-medium text-base sm:text-lg lg:text-2xl'>
        Lembrete caloroso, certifique-se de que seu nome, número de telefone celular e número de conta CPF são únicos. Se o mesmo usuário registrar várias contas para receber bônus em dinheiro, consideraremos isso uma trapaça. Se isso acontecer, a conta relevante será permanentemente congelada. Nós não compensará as perdas causadas por trapaça!
      </div>

      <div className='mt-5 lg:mt-10 text-sm sm:text-base lg:text-xl font-bold text-[#B3B3B3]'>
        Bônus de {recharge_first_cashback_rate} para o primeiro depósito
      </div>

      <div className='mt-5 text-[#B3B3B3] text-sm lg:text-base'>
        Obrigado pela confiança e apoio. Para sua primeira recarga, oferecemos um bônus de recarga de até {recharge_first_cashback_rate}! As recompensas serão transferidas diretamente para sua conta após a recarga. Detalhes do evento:1. O valor da sua primeira recarga deve ser superior a {recharge_bonus_start} reais.2. Cada conta tem apenas uma chance (depois de completar esta recompensa, você pode participar do evento de presente de recarga da plataforma).3. O bônus de depósito será creditado diretamente em sua conta de depósito.4. Rejeitamos contas fraudulentas, uma vez descobertas, elas serão permanentemente congeladas.5. O direito de interpretação final das atividades da plataforma pertence ao {environment.platformGroup} (propriedade do {environment.platformName})
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
