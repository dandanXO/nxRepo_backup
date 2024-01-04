import { ChargeButton } from "../../../../components-bs/Buttons/env/coco/ChargeButton"
import useBreakpoint from "../../../../pageTemplate/hooks/useBreakpoint"
import { usePageNavigate } from "../../../../router/hooks/usePageNavigate"
import { BenefitSection } from "./BenefitSection"
import { NoticeSection } from "./NoticeSection"
import { BackNavigation } from "../../../../components-bs/BackNavigation/BackNavigation";
import { environment } from "../../../../../../environments/environment";
import { Banner } from "../../../../components/Banner";

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
    <div className='px-4 md:px-10 w-full'>
      <BackNavigation
        onClick={() => onClickToIndex()}
        title={isMobile && <div className={"w-full text-center font-bold"}>Recarga benefícios</div>}
      />
      <Banner
        imgClassName={`rounded-lg mb-4 md:mb-8 mt-6 md:mt-0`}
        src={`assets/${environment.assetPrefix}/${environment.assetVersionPrefix}/banner_10.png`}
        bannerText={
          <div className={"absolute left-[5%] top-1/2 transform -translate-y-1/2"}>
            <div className={"text-white text-sm md:text-xl lg:text-4xl mb-2 md:mb-4 lg:mb-9"}>Benefícios-ofertasde deposito</div>
            <div className={"text-white text-xl md:text-3xl lg:text-8xl"}>Ate 10% bônus</div>
          </div>
        }
      />

      <BenefitSection />
      {isMobile && <RechargeButton />}
      <NoticeSection />
      {!isMobile && <RechargeButton />}
    </div>
  )
}
