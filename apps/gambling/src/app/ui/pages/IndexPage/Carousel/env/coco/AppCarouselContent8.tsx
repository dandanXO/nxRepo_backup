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

export const AppCarouselContent8= (props: IAppCarouselContent) => {
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
          <CarouselImage alt={"h5_banner_8"} src={`assets/${environment.assetPrefix}/${environment.assetVersionPrefix}/h5_banner_8.png`}/>
        ): (
          <CarouselImage alt={"banner_8"} src={`assets/${environment.assetPrefix}/${environment.assetVersionPrefix}/banner_8.png`}/>
        )}
      </div>
    </CarouselContainer>
  )
}


