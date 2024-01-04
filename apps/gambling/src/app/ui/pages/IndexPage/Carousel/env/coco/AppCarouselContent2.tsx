import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../../reduxStore";
import {appSlice} from "../../../../../../reduxStore/appSlice";

import useBreakpoint from "../../../../../pageTemplate/hooks/useBreakpoint";
import {PageOrModalPathEnum} from "../../../../../PageOrModalPathEnum";
import {environment} from "../../../../../../../environments/environment";
import {usePageNavigate} from "../../../../../router/hooks/usePageNavigate";
import cx from "classnames";
import {CarouselContainer} from "../../CarouselContainer";
import {PageContainer} from "../../../../../components-bs/PageContainer";
import {IAppCarouselContent} from "../../types";
import {CarouselTitle} from "./CarouselTitle";
import {CarouselImage} from "./CarouselImage";
import {CarouselTitleSection} from "./CarouselTitleSection";

export const AppCarouselContent2 = (props: IAppCarouselContent) => {
  const {isMobile} = useBreakpoint();
  const {onClickToDepositCashback} = usePageNavigate();
  const recharge_cashback_rate = useSelector((rootState: RootState) => rootState.app.config.recharge_cashback_rate)
  return (
    <CarouselContainer
      isMoving={props.isMoving}
      className={"text-[22.5px] text-white"}
      onClickBanner={(event) => {
        onClickToDepositCashback();
      }}
    >
      <div className={""}>
        <CarouselTitleSection>
          Benefícios-ofertasde deposito<br/>Ate {recharge_cashback_rate} bônus
        </CarouselTitleSection>
        {isMobile ? (
          <CarouselImage alt={"h5_banner_1"} src={`assets/${environment.assetPrefix}/${environment.assetVersionPrefix}/h5_banner_1.png`}/>
        ): (
          <CarouselImage alt={"banner_2"} src={`assets/${environment.assetPrefix}/${environment.assetVersionPrefix}/banner_1.png`}/>
        )}
      </div>
    </CarouselContainer>
  )
}


