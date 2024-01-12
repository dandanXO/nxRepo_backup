import {environment} from "../../../../../../../environments/environment";
import {usePageNavigate} from "../../../../../router/hooks/usePageNavigate";
import {CarouselContainer} from "../../CarouselContainer";
import {IAppCarouselContent} from "../../types";
import {CarouselImage} from "./CarouselImage";
import {CarouselTitleSection} from "./CarouselTitleSection";

export const AppCarouselContent6= (props: IAppCarouselContent) => {
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
        <CarouselImage
          alt={"banner_6"}
          src={`assets/${environment.uVersion}/${environment.mvVersion}/banner_6.png`}
          genieSrc={`assets/${environment.uVersion}/${environment.mvVersion}/genie_6.png`}
        />
        <CarouselTitleSection>
          <div><img alt='licenseLogo' className='w-[150px]' src={`assets/license/logo.png`}/></div>
          <span>{environment.platformName}<br/>Um cassino responsável</span>
        </CarouselTitleSection>
      </div>
    </CarouselContainer>
  )
}


