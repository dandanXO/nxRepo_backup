import { environment } from "apps/gambling/src/environments/environment";
import { ChargeButton } from "../../../../components-bs/Buttons/ChargeButton"
import useBreakpoint from "../../../../hooks/useBreakpoint"
import { usePageNavigate } from "../../../../hooks/usePageNavigate"
import { NoticeSection } from "../components/NoticeSection";
import { BenefitSection } from "../components/BenefitSection";


export const InitialChargeContent = () => {
  const { isMobile } = useBreakpoint();
  const { onClickToWallet } = usePageNavigate();

  const RechargeButton = () => {
    return (
      <section className={"flex justify-center items-center"}>
        <ChargeButton onClick={()=>onClickToWallet({'panelType':'deposit'})} className={"text-white text-lg mt-[60px] mb-10 mx-auto"}>Recarrague agora</ChargeButton>
      </section>
    )
  }
  return (
    <section className={"px-2 sm:px-0"}>
      <section className={"text-white text-lg text-left ml-3"}>
        Lembrete caloroso, certifique-se de que seu nome, número de telefone celular e número de conta CPF são únicos. Se o mesmo usuário registrar várias contas para receber bônus em dinheiro, consideraremos isso uma trapaça. Se isso acontecer, a conta relevante será permanentemente congelada. Nós não compensará as perdas causadas por trapaça!
      </section>
      <RechargeButton />
      <div className={"p-4 rounded-lg flex flex-col text-left text-white items-start text-lg border border-solid border-green-500 mb-8"} style={{ backgroundColor: 'var(--game-block)', opacity: 0.6 }}>
        <BenefitSection />
        <NoticeSection />
      </div>
    </section>
  )
}
