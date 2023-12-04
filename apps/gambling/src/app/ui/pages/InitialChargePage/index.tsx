import { useNavigate } from "react-router";
import { PageOrModalPathEnum } from "../../PageOrModalPathEnum";
import { ChargeButton } from "../../components/Buttons/ChargeButton";
import { environment } from "../../../../environments/environment";
import useBreakpoint from "../../hooks/useBreakpoint";
import { BackNavigation } from "../../components/BackNavigation/BackNavigation";
import { usePageNavigate } from "../../hooks/usePageNavigate";
import { Banner } from "../../components/Banner";
import { InitialChargeContent as CInitialChargeContent } from "./env/coco/InitialChargeContent";
import { InitialChargeContent as PInitialChargeContent } from "./env/pernambucana/InitialChargeContent";

import { InitialChargeContent as WInitialChargeContent } from "./env/wild/InitialChargeContent";
import { renderByPlatform } from "../../utils/renderByPlatform";



export const InitialChargePage = () => {
  const navigate = useNavigate();
  const { isMobile } = useBreakpoint();
  const { onClickToIndex } = usePageNavigate();
  return (

    <div className={"px-4 md:px-10"}>
      <BackNavigation
        onClick={() => onClickToIndex()}
        title={isMobile && <div className={"w-full font-bold text-center"}>Primeira recarga</div>}
      />
      <Banner
        imgClassName={`rounded-lg mb-4 md:mb-8 mt-6 md:mt-0`}
        src={`assets/${environment.assetPrefix}/${environment.assetVersionPrefix}/banner_20.png`}
        bannerText={
          <div className={"absolute left-[5%] top-1/2 transform -translate-y-1/2"}>
            <div className={"text-white text-sm md:text-xl lg:text-4xl mb-2 md:mb-4 lg:mb-9"}>Primeiro depósito</div>
            <div className={"text-white text-xl md:text-3xl lg:text-8xl"}>+ bônus de 20%</div>
          </div>
        }
      />

      {renderByPlatform({
        "coco777bet": <CInitialChargeContent />,
        "wild777bet": <WInitialChargeContent />
      }, <PInitialChargeContent />)};
    </div>

  )
}
