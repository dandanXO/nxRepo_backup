import { ChargeButton } from "../../../../components-bs/Buttons/ChargeButton"
import useBreakpoint from "../../../../hooks/useBreakpoint"
import { usePageNavigate } from "../../../../hooks/usePageNavigate"
import { BenefitSection } from "./BenefitSection"
import { NoticeSection } from "./NoticeSection"

export const RechargeActivityContent = () => {
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
    <>
      <BenefitSection />
      <RechargeButton />
      <NoticeSection />
    </>
  )
}
