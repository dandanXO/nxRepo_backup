import { ChargeButton } from "../../../../components/Buttons/env/coco/ChargeButton"
import useBreakpoint from "../../../../hooks/useBreakpoint"
import { usePageNavigate } from "../../../../hooks/usePageNavigate"

import { BenefitSection } from "../components/BenefitSection"
import { NoticeSection } from "../components/NoticeSection"

export const InitialChargeContent = () => {
  const { isMobile } = useBreakpoint();
  const { onClickToIndex, onClickToWallet } = usePageNavigate();

  const RechargeButton = () => {
    return (
      <section className={"flex justify-center items-center "}>
        <ChargeButton onClick={onClickToWallet} className={"text-white text-xl md:text-lg mt-3 mb-4 md:my-8"}>Recarrague agora</ChargeButton>
      </section>
    )
  }

  return (
    <section className={""}>
      <div className="md:px-8 text-white my-4 md:my-8">
        <div className="text-2xl font-bold mb-4">Primeira recarga</div>
        <BenefitSection className="mb-3 md:mb-1" />
      </div>
      {isMobile && <RechargeButton />}
      <div className={`
         py-3 px-4 md:py-4 md:px-6
         text-sm md:text-lg
         rounded-lg flex flex-col text-left text-white bg-[var(--white-20)]`}
      >
        <NoticeSection titleClassName='mb-2' textClassName={'mb-2'} />
        <div className={"text-[var(--text-popup)] text-left mt-2"}>
          Lembrete caloroso, certifique-se de que seu nome, número de telefone celular e número de conta CPF são únicos. Se o mesmo usuário registrar várias contas para receber bônus em dinheiro, consideraremos isso uma trapaça. Se isso acontecer, a conta relevante será permanentemente congelada. Nós não compensará as perdas causadas por trapaça!
        </div>
      </div>

      {!isMobile && <RechargeButton />}
    </section>

  )
}
