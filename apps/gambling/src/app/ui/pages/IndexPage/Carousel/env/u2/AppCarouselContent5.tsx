import {useSelector} from "react-redux";
import {RootState} from "../../../../../../reduxStore";
import {environment} from "../../../../../../../environments/environment";
import {usePageNavigate} from "../../../../../router/hooks/usePageNavigate";
import {CarouselContainer} from "../../CarouselContainer";
import {IAppCarouselContent} from "../../types";
import {CarouselImage} from "./CarouselImage";
import {CarouselTitleSection} from "./CarouselTitleSection";

export const AppCarouselContent5 = (props: IAppCarouselContent) => {
  const { onClickToInvite } = usePageNavigate();

  const invite_hig_reward = useSelector((rootState: RootState) => rootState.app.config.invite_hig_reward)

  return (
    <CarouselContainer
      isMoving={props.isMoving}
      className={"text-[22.5px] text-white"}
      onClickBanner={(event) => {
        onClickToInvite();

      }}
    >
      <div className={""}>
        <CarouselImage
          alt={"banner_5"}
          src={`assets/${environment.uVersion}/${environment.mvVersion}/banner_5.png`}
          genieSrc={`assets/${environment.uVersion}/${environment.mvVersion}/genie_5.png`}
        />
        <CarouselTitleSection>
          <span>Convide uma pessoa e receba <br/> Até R${invite_hig_reward}</span>
        </CarouselTitleSection>
      </div>
    </CarouselContainer>
  )
}


