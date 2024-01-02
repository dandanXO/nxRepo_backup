import styled from "styled-components";
import { AppLocalStorage } from "../../../../../persistant/localstorage";
import { useAllowLoginRouterRules } from "../../../../router/hooks/useAllowLoginRouterRules";
import { environment } from "../../../../../../environments/environment";
import { BackNavigation } from "../../../../components/BackNavigation/BackNavigation";
import { usePageNavigate } from "../../../../hooks/usePageNavigate";
import { VIPBorderStyleContainer } from "../../../../components/VIPBorderStyleContainer";
import { AppLocalStorageKey } from "../../../../../persistant/AppLocalStorageKey";
import { renderByPlatform } from "../../../../utils/renderByPlatform";
import { FragmentContainer } from "../../../../components/FragmentContainer";
import cx from 'classnames';
import { Banner } from "../../../../components/Banner";
import { TelegramButton } from "../../../../components-bs/Buttons/TelegramButton";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { appSlice } from "../../../../../reduxStore/appSlice";
import useBreakpoint from "../../../../hooks/useBreakpoint";
import { ITelegramPage } from "../..";
import { TelegrmaNotice } from "../components/TelegramNotice";
import { Container } from "../../../../components/container/Container";
import { Button } from "../../../../components-bs/Buttons/env/riojungle/Button";


export const TelegramPage = (props: ITelegramPage) => {
  useAllowLoginRouterRules();
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  const bannerImg = `${isMobile ? 'h5_' : isTablet ? 'tablet_' : ''}banner_telegram.png`
  const bannerSrc = `assets/${environment.assetPrefix}/${environment.assetVersionPrefix}/${bannerImg}`

  return (

    <Container y={false} className={'relative py-4 md:py-5 lg:py-10'}>
      <Banner imgClassName={`rounded-lg mb-5 md:mb-8 lg:mb-10 `} src={bannerSrc} bannerText={
        <div className={"absolute left-[5%] top-1/2 transform -translate-y-1/2 w-[75%] md:w-[80%]"}>
          <div className={"text-white text-base md:text-2xl lg:text-4xl font-bold leading-6 md:leading-8 lg:leading-10"}>Junte-se ao telegram</div>
          <div className={"text-white text-base md:text-2xl lg:text-4xl font-bold leading-6 md:leading-8 lg:leading-10"}>Revela oficialmente maisatividades de recompensa</div>
        </div>
      } />

      <div className={cx("flex flex-col text-left pb-20 md:pb-0")}>
        <div className="text-white text-base md:text-lg lg:text-xl leading-6 md:leading-7 mb-5">
          {environment.platformGroup} ({environment.platformName}) sinceramente convida você a se juntar ao nosso canal de telegrama e vamos nos comunicar mais profundamente!
        </div>
        <div className="text-[#B3B3B3]">
          <div className="text-sm md:text-base mb-5">Nota especial:</div>
          <TelegrmaNotice />
        </div>
      </div>

      <div className={cx({"w-full px-4 fixed bottom-0 left-0 bg-[#1A1A1A]":isMobile})}>
        <Button
          onClick={props.handleClickToTelegram}
          className={cx("m-0 my-4 md:my-8 md:my-10 text-white text-sm md:text-base lg:text-xl bg-[#8547EB] py-3 w-full rounded-lg", {
            '': isMobile
          })}
          text={'Junte-se'}
        />
      </div>

    </Container>
  )
}
