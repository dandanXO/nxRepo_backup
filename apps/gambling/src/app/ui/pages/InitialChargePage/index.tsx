import {VIPBorderStyleContainer} from "../VIPGradePage";
import {useNavigate} from "react-router";
import {PageOrModalPathEnum} from "../../PageOrModalPathEnum";
import {Bonus} from "../../components/Bonus";
import {ChargeButton} from "../../components/ChargeButton";
import {environment} from "../../../../environments/environment";


export const InitialChargePage = () => {
  const navigate = useNavigate();

  return (
    <>

      <div className={"px-0 sm:px-10 w-full"}>

        <section className={"sm:rounded-3xl text-white font-bold overflow-hidden relative mb-8 mt-4"}>
          <img className="w-full" src={"assets/001/banner.png"}/>
          <div className={"mt-5 xl:mt-20 absolute left-[40px] top-0 text-white"}>
            <div className={"md:text-4xl mb-4 text-xl"}>Primeiro depósito</div>
            <Bonus className={"md:text-4xl"}>+ bônus de 20%</Bonus>
          </div>
        </section>

        <section className={"px-2 sm:px-0"}>
          <section className={"text-white text-lg text-left mb-8 ml-3"}>
            Lembrete caloroso, certifique-se de que seu nome, número de telefone celular e número de conta CPF são únicos. Se o mesmo usuário registrar várias contas para receber bônus em dinheiro, consideraremos isso uma trapaça. Se isso acontecer, a conta relevante será permanentemente congelada. Nós não compensará as perdas causadas por trapaça!
          </section>

          <VIPBorderStyleContainer className={"flex flex-col text-left text-white items-start text-lg"}>
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

          </VIPBorderStyleContainer>

          <section className={"flex justify-center items-center"}>
            <ChargeButton onClick={() => {
              navigate(PageOrModalPathEnum.WalletPage);
            }} className={"text-white text-lg"}>Recarrague agora</ChargeButton>
          </section>

        </section>

      </div>


    </>
  )
}
