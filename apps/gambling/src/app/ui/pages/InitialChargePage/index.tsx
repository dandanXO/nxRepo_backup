import {useNavigate} from "react-router";
import {PageOrModalPathEnum} from "../../PageOrModalPathEnum";
import {ChargeButton} from "../../components/Buttons/ChargeButton";
import {environment} from "../../../../environments/environment";
import useBreakpoint from "../../hooks/useBreakpoint";
import {BackNavigation} from "../../components/BackNavigation/BackNavigation";
import {usePageNavigate} from "../../hooks/usePageNavigate";


export const InitialChargePage = () => {
  const navigate = useNavigate();
  const {isMobile} = useBreakpoint();
  const {onClickToIndex} = usePageNavigate();
  return (
    <>
        <BackNavigation
          onClick={() => onClickToIndex()}
          title={<div className={"w-full text-center"}>Primeira recarga</div>}
        />
        <div className={"px-0 sm:px-10 w-full"}>
          <section className={"sm:rounded-3xl text-white font-bold overflow-hidden relative mb-8 mt-4"}>
            {isMobile ? (
                <>
                  <img className="w-full" src={`assets/${environment.assetPrefix}/h5_banner_1.png`}/>
                  <div className={"mt-5 xl:mt-20 absolute left-[22px] top-[18px] text-white"}>
                    <div className={"text-3xl text-[rgba(255,239,1)]"}>Primeiro depósito</div>
                    <div className={"text-3xl text-[rgba(255,239,1)]"}>+ bônus de 20%</div>
                  </div>
                </>
            ) : (
                <>
                  <img className="w-full" src={`assets/${environment.assetPrefix}/banner1.png`}/>
                  <div className={"mt-5 xl:mt-20 absolute left-[30%] top-[5%] transform translate(-50%, -50%) text-white text-center"}>
                    <div className={"text-8xl text-[rgba(255,239,1)]"} >Primeiro depósito</div>
                    <div className={"text-8xl text-[rgba(255,239,1)]"}>+ bônus de 20%</div>
                  </div>
                </>
         )}
        </section>

        <section className={"px-2 sm:px-0"}>
          <section className={"text-white text-lg text-left ml-3"}>
            Lembrete caloroso, certifique-se de que seu nome, número de telefone celular e número de conta CPF são únicos. Se o mesmo usuário registrar várias contas para receber bônus em dinheiro, consideraremos isso uma trapaça. Se isso acontecer, a conta relevante será permanentemente congelada. Nós não compensará as perdas causadas por trapaça!
          </section>

          <section className={"flex justify-center items-center"}>
            <ChargeButton onClick={() => {
              navigate(PageOrModalPathEnum.WalletPage);
            }} className={"text-white text-lg font-bold"}>Recarrague agora</ChargeButton>
          </section>

          <div className={"p-4 rounded-lg flex flex-col text-left text-white items-start text-lg border border-solid border-green-500 mb-8"} style={{ backgroundColor: 'var(--game-block)', opacity:0.6 }}>
            <div className={"text-left w-full"}>Bônus de 20% para o primeiro depósito</div>
            <div className={"text-left w-full"}>Obrigado pela confiança e apoio. Para sua primeira recarga, oferecemos um bônus de recarga de até 20%! As recompensas serão transferidas diretamente para sua conta após a recarga.</div>
            <div className={"text-left w-full"}>Detalhes do evento:</div>
            <ul className={"text-left w-full"}>
              <li>1. O valor da sua primeira recarga deve ser superior a 50 reais.</li>
              <li>2. Cada conta tem apenas uma chance (depois de completar esta recompensa, você pode participar do evento de presente de recarga da plataforma).</li>
              <li>3. O bônus de depósito será creditado diretamente em sua conta de depósito.</li>
              <li>4. Rejeitamos contas fraudulentas, uma vez descobertas, elas serão permanentemente congeladas.</li>
              <li>5. O direito de interpretação final das atividades da plataforma pertence ao SKY Group (propriedade do {environment.platformName})</li>
            </ul>

          </div>

        </section>

      </div>


    </>
  )
}
