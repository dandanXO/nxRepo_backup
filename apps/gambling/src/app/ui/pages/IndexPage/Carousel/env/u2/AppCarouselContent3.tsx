import {environment} from "../../../../../../../environments/environment";
import {usePageNavigate} from "../../../../../router/hooks/usePageNavigate";
import {CarouselContainer} from "../../CarouselContainer";
import {IAppCarouselContent} from "../../types";
import {CarouselImage} from "./CarouselImage";
import {CarouselTitleSection} from "./CarouselTitleSection";

export const AppCarouselContent3 = (props: IAppCarouselContent) => {
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
        <CarouselImage
          alt={"banner_3"}
          src={`assets/${environment.uVersion}/${environment.mvVersion}/banner_3.png`}
          genieSrc={`assets/${environment.uVersion}/${environment.mvVersion}/genie_3.png`}
        />
        <CarouselTitleSection>
          Venha e colete<br/>
          Recompensas VIP<br/>
          VIP0 Pode Retirar<br/>
        </CarouselTitleSection>
      </div>
    </CarouselContainer>
  )
}


