import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../../reduxStore";
import {appSlice} from "../../../../../../reduxStore/appSlice";

import useBreakpoint from "../../../../../hooks/useBreakpoint";
import {PageOrModalPathEnum} from "../../../../../PageOrModalPathEnum";
import {environment} from "../../../../../../../environments/environment";
import {usePageNavigate} from "../../../../../hooks/usePageNavigate";
import cx from "classnames";
import {CarouselContainer} from "../../CarouselContainer";
import {Container} from "../../../../../components/container/Container";
import {IAppCarouselContent} from "../../types";
import {CarouselTitle} from "./CarouselTitle";
import {CarouselImage} from "./CarouselImage";
import {CarouselTitleSection} from "./CarouselTitleSection";

export const AppCarouselContent5 = (props: IAppCarouselContent) => {
  const {isMobile} = useBreakpoint();
  const {onClickToCheckInDaily} = usePageNavigate();

  const invite_hig_reward = useSelector((rootState: RootState) => rootState.app.config.invite_hig_reward)

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
          <span>Convide uma pessoa e receba <br/> Até R${invite_hig_reward}</span>
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


