import {useSelector} from "react-redux";
import {RootState} from "../../../../../../reduxStore";
import {environment} from "../../../../../../../environments/environment";
import {usePageNavigate} from "../../../../../router/hooks/usePageNavigate";
import {CarouselContainer} from "../../CarouselContainer";
import {IAppCarouselContent} from "../../types";
import {CarouselImage} from "./CarouselImage";
import {CarouselTitleSection} from "./CarouselTitleSection";


export const AppCarouselContent = (props: IAppCarouselContent) => {
  const {onClickToFirstDeposit} = usePageNavigate();
  const recharge_first_cashback_rate = useSelector((rootState: RootState) => rootState.app.config.recharge_first_cashback_rate)
  return (
    <CarouselContainer
      isMoving={props.isMoving}
      className={"text-[22.5px] text-white"}
      onClickBanner={(event) => {
        onClickToFirstDeposit();
      }}
    >
      <div className={""}>
        <CarouselImage
          alt={"banner_1"}
          src={`assets/${environment.assetPrefix}/${environment.assetVersionPrefix}/banner_1.png`}
          genieSrc={`assets/${environment.assetPrefix}/${environment.assetVersionPrefix}/genie_1.png`}
        />
        <CarouselTitleSection>
          Bônus de primeira recarga <br/> bônus de {recharge_first_cashback_rate}
        </CarouselTitleSection>
      </div>
    </CarouselContainer>
  )
}


