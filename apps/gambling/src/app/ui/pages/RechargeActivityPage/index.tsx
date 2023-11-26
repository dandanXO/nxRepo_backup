import { useNavigate } from "react-router";
import { PageOrModalPathEnum } from "../../PageOrModalPathEnum";
import styled from "styled-components";
import { useAllowLoginRouterRules } from "../../router/useAllowLoginRouterRules";
import { environment } from "../../../../environments/environment";
import { ChargeButton } from "../../components/Buttons/ChargeButton";
import useBreakpoint from "../../hooks/useBreakpoint";
import { usePageNavigate } from "../../hooks/usePageNavigate";
import { BackNavigation } from "../../components/BackNavigation/BackNavigation";
import { VIPBorderStyleContainer } from "../../components/VIPBorderStyleContainer";
import { renderByPlatform } from "../../utils/renderByPlatform";
import { RechargeActivityContent as CRechargeActivityContent } from './env/coco/RechargeActivityContent';
import { RechargeActivityContent as PRechargeActivityContent } from './env/pernambucana/RechargeActivityContent';
import { RechargeActivityContent as WRechargeActivityContent } from './env/wild/RechargeActivityContent';
import { Banner } from "../../components/Banner";


const Bonus = styled.div`
  text-shadow: 0px 4px 0px #D60404;
`

const RechargeButton = styled.div`
  cursor: pointer;
  background: url("assets/${environment.assetPrefix}/btn_green.png") center center no-repeat;
  background-size: cover; /* 背景圖片尺寸適應容器 */
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  width: 300px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 60px auto 40px;
  color: #247855;
`
export const RechargeActivityPage = () => {
  useAllowLoginRouterRules();
  const navigate = useNavigate();
  const { isMobile } = useBreakpoint();
  const { onClickToIndex } = usePageNavigate();

  return (
    <div className={"px-4 md:px-10 w-full"}>
      <BackNavigation
        onClick={() => onClickToIndex()}
        title={<div className={"w-full text-center md:text-left md:ml-2"}>Recarga benefícios</div>}
      />
      <Banner
        imgClassName={`rounded-lg mb-4 md:mb-8 mt-6`}
        src={`assets/${environment.assetPrefix}/h5_banner_10.png`}
        bannerText={
          <div className={"absolute left-[5%] top-1/2 transform -translate-y-1/2"}>
            <div className={"text-white text-sm md:text-xl lg:text-4xl mb-2 md:mb-4 lg:mb-9"}>Benefícios-ofertasde deposito</div>
            <div className={"text-white text-xl md:text-3xl lg:text-8xl"}>Ate 10% bônus</div>
          </div>
        }
      />
      {renderByPlatform({
        "coco777bet": <CRechargeActivityContent />,
        "wild777bet": <WRechargeActivityContent />
      }, <PRechargeActivityContent />)};
    </div>
  )
}
