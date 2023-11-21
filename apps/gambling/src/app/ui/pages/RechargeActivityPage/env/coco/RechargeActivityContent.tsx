import { BackNavigation } from "../../../../components/BackNavigation/BackNavigation"
import { ChargeButton } from "../../../../components/Buttons/ChargeButton"
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
        <ChargeButton onClick={onClickToWallet} className={"text-white text-xl md:text-lg mb-4 md:my-8"}>Recarrague agora</ChargeButton>
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