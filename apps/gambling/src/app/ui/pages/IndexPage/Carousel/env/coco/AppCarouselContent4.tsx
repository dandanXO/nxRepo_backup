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
import {PageContainer} from "../../../../../components-bs/PageContainer";
import {IAppCarouselContent} from "../../types";
import {CarouselTitle} from "./CarouselTitle";
import {CarouselImage} from "./CarouselImage";
import {CarouselTitleSection} from "./CarouselTitleSection";

export const AppCarouselContent4 = (props: IAppCarouselContent) => {
  const {isMobile} = useBreakpoint();
  const {onClickToVipGrade} = usePageNavigate();

  return (
    <CarouselContainer
      isMoving={props.isMoving}
      className={"text-[22.5px] text-white"}
      onClickBanner={(event) => {
        onClickToVipGrade();
      }}
    >
      <div className={""}>
        <CarouselTitleSection className={"sm:top-[45%] md:top-[45%]"}>
          Prêmio upgrade VIP
          <br/>
          Só esperando você coletar!
          <br/>
          VIP0 Pode Retirar
        </CarouselTitleSection>

        {isMobile ? (
          <CarouselImage alt={"h5_banner_4"} src={`assets/${environment.assetPrefix}/${environment.assetVersionPrefix}/h5_banner_4.png`}/>
        ): (
          <CarouselImage alt={"banner_4"} src={`assets/${environment.assetPrefix}/${environment.assetVersionPrefix}/banner_4.png`}/>
        )}
      </div>
    </CarouselContainer>
  )
}


