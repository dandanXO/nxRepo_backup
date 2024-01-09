import {useSelector} from "react-redux";
import {RootState} from "../../../../../../reduxStore";
import {environment} from "../../../../../../../environments/environment";
import {usePageNavigate} from "../../../../../router/hooks/usePageNavigate";
import {CarouselContainer} from "../../CarouselContainer";
import {IAppCarouselContent} from "../../types";
import {CarouselImage} from "./CarouselImage";
import {CarouselTitleSection} from "./CarouselTitleSection";

export const AppCarouselContent2 = (props: IAppCarouselContent) => {
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
        <CarouselImage
          alt={"banner_2"}
          src={`assets/${environment.uVersion}/${environment.assetVersionPrefix}/banner_2.png`}
          genieSrc={`assets/${environment.uVersion}/${environment.assetVersionPrefix}/genie_2.png`}
        />
        <CarouselTitleSection>
          Bem-estar Oferta de depósito<br/>Ate {recharge_cashback_rate} bônus
        </CarouselTitleSection>
      </div>
    </CarouselContainer>
  )
}


