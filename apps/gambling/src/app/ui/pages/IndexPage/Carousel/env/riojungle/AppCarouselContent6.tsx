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

export const AppCarouselContent6= (props: IAppCarouselContent) => {
  const {isMobile} = useBreakpoint();
  const {onClickToLicense} = usePageNavigate();

  return (
    <CarouselContainer
      isMoving={props.isMoving}
      className={"text-[22.5px] text-white"}
      onClickBanner={(event) => {
        onClickToLicense();
      }}
    >
      <div className={""}>
        <CarouselTitleSection>
          <div><img alt='licenseLogo' className='w-[150px]' src={`assets/license/logo.png`}/></div>
          <span>{environment.platformName}<br/>Um cassino responsável</span>
        </CarouselTitleSection>
        {isMobile ? (
          <CarouselImage alt={"h5_banner_6"} src={`assets/${environment.assetPrefix}/${environment.assetVersionPrefix}/h5_banner_6.png`}/>
        ): (
          <CarouselImage alt={"banner_6"} src={`assets/${environment.assetPrefix}/${environment.assetVersionPrefix}/banner_6.png`}/>
        )}
      </div>
    </CarouselContainer>
  )
}


