import styled from "styled-components";
import { AppLocalStorage } from "../../../../../persistant/localstorage";
import { useAllowLoginRouterRules } from "../../../../router/useAllowLoginRouterRules";
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

const GoToTelegram = styled.div`
  cursor: pointer;
  background: linear-gradient(180deg, var(--primary-main-from) 0%, var(--primary-main-to) 100%);
  border-radius: 8px;
  /* width: 300px; */
  /* height: 60px; */
  padding: 14px 96px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 32px auto 64px;
`

const ListItem = (props: { count: string; text: string; }) => {
  return (
    <li className="mb-4 sm:mb-3 space-x-2 flex">
      <div className="text-[var(--primary-assistant)] text-xl">{props.count}</div>
      <div className="">{props.text}</div>
    </li>
  )
}

export const TelegramPage = (props: ITelegramPage) => {
  useAllowLoginRouterRules();

  const { isMobile } = useBreakpoint();


  const { onClickToIndex } = usePageNavigate();


  return (

    <div className={"px-4 sm:px-10 w-full"}>

      <BackNavigation
        onClick={() => onClickToIndex()}
        title={isMobile && <div className={"w-full text-center font-bold"}>Canal De Telegram</div>}
      />

      <Banner imgClassName={`rounded-lg mb-4 md:mb-8 mt-3 md:mt-0`} src={`assets/${environment.assetPrefix}/${environment.assetVersionPrefix}/banner_telegram.png`} bannerText={
        <div className={"absolute left-[5%] top-1/2 transform -translate-y-1/2"}>
          <div className={"text-white text-base sm:text-3xl md:text-4xl  lg:text-5xl font-bold lg:mb-2"}>Sample wordingptas y</div>
          <div className={"text-white text-base sm:text-3xl md:text-4xl lg:text-5xl font-bold"}>reconoces que has leído la .</div>
        </div>
      } />


      <div className={cx("flex flex-col text-left text-white items-start text-sm sm:text-xl sm:px-8")}>
        <div className="text-2xl font-bold mb-4 sm:mb-2.5"><span className="text-white mr-2">Canal De</span><span className="text-[var(--primary-assistant)]">Telegram</span></div>
        <div className={"text-left w-full mb-4 sm:mb-3"}>{environment.platformGroup} ({environment.platformName}) sinceramente convida você a se juntar ao nosso canal de telegrama e vamos nos comunicar mais profundamente!</div>

        <TelegramButton onClick={props.handleClickToTelegram} />
        <div className="text-[var(--primary-assistant)]">
          <TelegrmaNotice />
        </div>
      </div>

      <section className={"flex justify-center items-center invisible sm:visible"}>
        <GoToTelegram onClick={props.handleClickToTelegram} className={"text-white text-lg "}>
          <img className={"w-[30px] mr-4"} src={`assets/${environment.assetPrefix}/icon=telegram.png`} />
          Junte-se</GoToTelegram>
      </section>
    </div>
  )
}
