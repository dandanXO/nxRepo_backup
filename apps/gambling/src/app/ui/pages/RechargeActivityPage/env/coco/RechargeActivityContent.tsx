import { ChargeButton } from "../../../../components/Buttons/env/coco/ChargeButton"
import useBreakpoint from "../../../../hooks/useBreakpoint"
import { usePageNavigate } from "../../../../hooks/usePageNavigate"
import { BenefitSection } from "./BenefitSection"
import { NoticeSection } from "./NoticeSection"

export const RechargeActivityContent = () => {
  const { isMobile } = useBreakpoint();
  const { onClickToIndex, onClickToWallet } = usePageNavigate();
  
  const RechargeButton = () => {
    return (
      <section className={"flex justify-center items-center "}>
        <ChargeButton onClick={()=>onClickToWallet({'panelType':'deposit'})} className={"leading-none text-white text-xl md:text-lg mb-4 sm:my-8"}>Recarregue agora</ChargeButton>
      </section>
    )
  }

  return (
    <>
      <BenefitSection />
      {isMobile && <RechargeButton />}
      <NoticeSection />
      {!isMobile && <RechargeButton />}
    </>
  )
}
