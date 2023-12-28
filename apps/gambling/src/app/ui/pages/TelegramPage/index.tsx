import { useNavigate } from "react-router";
import { Bonus } from "../../components/Bonus";

import styled from "styled-components";
import { AppLocalStorage } from "../../../persistant/localstorage";
import { useAllowLoginRouterRules } from "../../router/useAllowLoginRouterRules";
import { environment } from "../../../../environments/environment";
import { BackNavigation } from "../../components/BackNavigation/BackNavigation";
import { usePageNavigate } from "../../hooks/usePageNavigate";
import { VIPBorderStyleContainer } from "../../components/VIPBorderStyleContainer";
import { AppLocalStorageKey } from "../../../persistant/AppLocalStorageKey";
import { renderByPlatform } from "../../utils/renderByPlatform";
import { FragmentContainer } from "../../components/FragmentContainer";
import cx from 'classnames';
import { Banner } from "../../components/Banner";
import {TelegramButton} from "../../components-bs/Buttons/TelegramButton";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {appSlice} from "../../../reduxStore/appSlice";
import useBreakpoint from "../../hooks/useBreakpoint";

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

export const TelegramPage = () => {
  useAllowLoginRouterRules();

  const { isMobile } = useBreakpoint();

  const telegramId = AppLocalStorage.getItem(AppLocalStorageKey.telegramGroup);
  const userInfoString = AppLocalStorage.getItem(AppLocalStorageKey.userInfo);
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
  const user_id = userInfo?.user_id || '';
  const telegramUrl = `https://t.me/${telegramId}?start=${user_id}`

  const { onClickToIndex } = usePageNavigate();

  const TelegramContentContainer = renderByPlatform({
    "wild777bet": VIPBorderStyleContainer,
    "coco777bet": FragmentContainer,
  }, VIPBorderStyleContainer);

  const isCoco777bet = environment.assetPrefix === 'coco777bet';

  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(appSlice.actions.setShowTelegramModal(true))
    }, 5000);

    return () => {
      clearTimeout(timer);
    }
  }, []);

  return (

    <div className={"px-4 sm:px-10 w-full"}>

      <BackNavigation
        onClick={() => onClickToIndex()}
        title={isMobile && <div className={"w-full text-center font-bold"}>Canal De Telegram</div>}
      />
      {/*<section className={"rounded-3xl text-white font-bold overflow-hidden relative mb-8"}>*/}
      {/*  <img className="w-full" src={`assets/${environment.assetPrefix}/bg.761d8ab4.png`}/>*/}
      {/*  <div className={"mt-20 absolute left-[40px] top-0 text-white"}>*/}
      {/*    <div className={"text-4xl mb-4"}>Junte-se ao telegram</div>*/}
      {/*    <Bonus className={"text-5xl mb-2"}>Revela oficialmente mais</Bonus>*/}
      {/*    <Bonus className={"text-5xl"}>atividades de recompensa</Bonus>*/}
      {/*  </div>*/}
      {/*</section>*/}

      {/* <section className={"sm:rounded-3xl text-white font-bold overflow-hidden relative mb-8"}>
        <img className="w-full" src={`assets/${environment.assetPrefix}/bg.761d8ab4.png`} />
        <div className={"mt-5 xl:mt-20 absolute left-[40px] top-0 text-white"}>
          <div className={"md:text-4xl mb-4 text-xl"}>Junte-se ao telegram</div>
          <Bonus className={"md:text-4xl"}>atividades de recompensa</Bonus>
        </div>
      </section> */}

      <Banner imgClassName={`rounded-lg mb-4 md:mb-8 mt-3 md:mt-0`} src={`assets/${environment.assetPrefix}/${environment.assetVersionPrefix}/banner_telegram.png`} bannerText={
        <div className={"absolute left-[5%] top-1/2 transform -translate-y-1/2"}>
          <div className={"text-white text-base sm:text-3xl md:text-4xl  lg:text-5xl font-bold lg:mb-2"}>Sample wordingptas y</div>
          <div className={"text-white text-base sm:text-3xl md:text-4xl lg:text-5xl font-bold"}>reconoces que has leído la .</div>
        </div>
      } />


      <TelegramContentContainer className={cx("flex flex-col text-left text-white items-start text-sm sm:text-xl", {
        'sm:px-8': isCoco777bet
      })}>
        {isCoco777bet && <div className="text-2xl font-bold mb-4 sm:mb-2.5"><span className="text-white mr-2">Canal De</span><span className="text-[var(--primary-assistant)]">Telegram</span></div>}
        <div className={"text-left w-full mb-4 sm:mb-3"}>{environment.platformGroup} ({environment.platformName}) sinceramente convida você a se juntar ao nosso canal de telegrama e vamos nos comunicar mais profundamente!</div>

        <TelegramButton
          onClick={() => {
            window.open(telegramUrl, '_blank')
          }}
        />

        <div className={"text-left w-full mb-4 sm:mb-3"}>Anunciaremos as seguintes atividades ou informações relacionadas no canal de telegrama:</div>
        <ol className={"text-left max-w-full  "}>
          <ListItem count={'1.'} text={'Quando a plataforma lançar novas atividades, iremos anunciá-las no canal do telegram o mais rápido possível.'} />
          <ListItem count={'2.'} text={'Atualizaremos várias recompensas na plataforma de tempos em tempos no canal do telegrama.'} />
          <ListItem count={'3.'} text={`Compartilhe regularmente recompensas de envelope vermelho de troca oficial do ${environment.platformGroup} (${environment.platformName}) todos os dias.`} />
          <ListItem count={'4.'} text={'A lista de ganhadores da plataforma será divulgada no canal do telegram o mais breve possível.'} />
          <ListItem count={'5.'} text={'Anúncios e manutenções relacionados à plataforma serão divulgados no canal do Telegram assim que possível.'} />
          <ListItem count={'6.'} text={'A atualização do mecanismo de recompensa por convite da plataforma será anunciada na plataforma do Telegram o mais rápido possível.'} />
          <ListItem count={'7.'} text={'Questões como recarga e retirada serão anunciadas na plataforma do telegram assim que possível.'} />
          <ListItem count={'8.'} text={'A manutenção do jogo relacionada à plataforma será anunciada na plataforma do telegram o mais rápido possível'} />
        </ol>

      </TelegramContentContainer>

      <section className={"flex justify-center items-center invisible sm:visible"}>
        <GoToTelegram onClick={() => {
          window.open(telegramUrl, '_blank')
        }} className={"text-white text-lg "}>
          <img className={"w-[30px] mr-4"} src={`assets/${environment.assetPrefix}/icon=telegram.png`} />
          Junte-se</GoToTelegram>
      </section>
    </div>
  )
}
