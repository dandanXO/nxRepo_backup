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

export const AppCarouselContent6= (props: IAppCarouselContent) => {
  const {isMobile} = useBreakpoint();
  const {onClickToFirstDeposit} = usePageNavigate();

  return (
    <CarouselContainer
      isMoving={props.isMoving}
      className={"text-[22.5px] text-white"}
      onClickBanner={(event) => {
        onClickToFirstDeposit();
      }}
    >
      <div className={""}>
        <CarouselTitleSection>
          <span>Convide Amigos A maior recompensa para<br/>uma pessoa é R$20</span>
        </CarouselTitleSection>
        {isMobile ? (
          <CarouselImage alt={"h5_banner_6"} src={`assets/${environment.uVersion}/${environment.assetVersionPrefix}/h5_banner_6.png`}/>
        ): (
          <CarouselImage alt={"banner_6"} src={`assets/${environment.uVersion}/${environment.assetVersionPrefix}/banner_6.png`}/>
        )}
      </div>
    </CarouselContainer>
  )
}


