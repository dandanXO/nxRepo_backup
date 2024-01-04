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

export const AppCarouselContent5 = (props: IAppCarouselContent) => {
  const {isMobile} = useBreakpoint();
  const {onClickToCheckInDaily} = usePageNavigate();

  return (
    <CarouselContainer
      isMoving={props.isMoving}
      className={"text-[22.5px] text-white"}
      onClickBanner={(event) => {
        onClickToCheckInDaily();

      }}
    >
      <div className={""}>
        <CarouselTitleSection>
          <span>Check-in todos os dias <br/> O dinheiro não para!</span>
        </CarouselTitleSection>
        {isMobile ? (
          <CarouselImage alt={"h5_banner_5"} src={`assets/${environment.assetPrefix}/${environment.assetVersionPrefix}/h5_banner_5.png`}/>
        ): (
          <CarouselImage alt={"banner_5"} src={`assets/${environment.assetPrefix}/${environment.assetVersionPrefix}/banner_5.png`}/>
        )}
      </div>
    </CarouselContainer>
  )
}


