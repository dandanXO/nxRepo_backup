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
import {TelegramButton} from "../../components/Buttons/TelegramButton";

const GoToTelegram = styled.div`
  cursor: pointer;
  background: linear-gradient(270deg,#00A9E7 0%,#007DD3 100%);
  box-shadow: inset 0 0 10px rgba(255,255,255,.5);
  border-radius: 10px;
  width: 300px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 60px auto 40px;
`

export const TelegramPage = () => {
  useAllowLoginRouterRules();

  const navigate = useNavigate();

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
  return (

    <div className={"px-4 sm:px-10 w-full"}>

      <BackNavigation
        onClick={() => onClickToIndex()}
        title={<div className={"w-full text-center md:text-left"}>Retornar</div>}
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

      <Banner imgClassName={`rounded-lg mb-4 md:mb-8 mt-6`} src={`assets/${environment.assetPrefix}/banner_telegram.png`} bannerText={
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
        <ul className={"text-left w-full list-decimal list-inside marker:text-[var(--primary-assistant)] marker:text-xl "}>
          <li className="mb-4 sm:mb-3">Quando a plataforma lançar novas atividades, iremos anunciá-las no canal do telegram o mais rápido possível.</li>
          <li className="mb-4 sm:mb-3">Atualizaremos várias recompensas na plataforma de tempos em tempos no canal do telegrama.</li>
          <li className="mb-4 sm:mb-3">Compartilhe regularmente recompensas de envelope vermelho de troca oficial do {environment.platformGroup} ({environment.platformName}) todos os dias.</li>
          <li className="mb-4 sm:mb-3">A lista de ganhadores da plataforma será divulgada no canal do telegram o mais breve possível.</li>
          <li className="mb-4 sm:mb-3">Anúncios e manutenções relacionados à plataforma serão divulgados no canal do Telegram assim que possível.</li>
          <li className="mb-4 sm:mb-3">A atualização do mecanismo de recompensa por convite da plataforma será anunciada na plataforma do Telegram o mais rápido possível.</li>
          <li className="mb-4 sm:mb-3">Questões como recarga e retirada serão anunciadas na plataforma do telegram assim que possível.</li>
          <li className="mb-4 sm:mb-3">A manutenção do jogo relacionada à plataforma será anunciada na plataforma do telegram o mais rápido possível</li>
        </ul>

      </TelegramContentContainer>

      <section className={"flex justify-center items-center invisible sm:visible"}>
        <GoToTelegram onClick={() => {
          window.open(telegramUrl, '_blank')
          // navigate(PageOrModalPathEnum.WalletPage);
        }} className={"text-white text-lg"}>
          <img className={"w-[30px] h-[26px] mr-4"} src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAA6CAMAAAAz+392AAAApVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+4/eNVAAAANnRSTlMA+gbpCsZVHhrjwJyFKhT38YoO7diwpndoS0VA27qsln8u9LShdHBsYVs7NiPS0MqQUDLevNQ7eFNdAAACGElEQVRIx63W13KrQBAE0AEUSMoJlHOWLdm+/f+fdmURDOwuIyyfR1FQYnqrGXpFdW6XNy/cr99WGu4G9Eu1loHAmH6jtLcRa1BxH7MmEgwqqL17Q5pNhYz6DWS1CtxvDsaQqDwdod/TIFWlp5xdCwrGUxEevpDSaJ16iKyItbh2kFau0enntzkXofeOjKZHNEwcDJ/yHNdLZPVMokoy2Top1TddCKzvBD0kfJLKcCqLcNa+X5ojqa+qAWmE3SPdzZAiqwu9MoGM5urfV/tIG+XUgJjkXSn7eK2UrYEy5Jq7YMRCxBdKOjlx2mKSwYzEjJxEhNsLVIxK+JKSIXtxhEENyDn18KB1IPoIJrD9hFo3Grm/hKihP/7eGGqaG038oElzelz7B7XygkJbSF0fF7uAOsmIC7lDMGfVWVj9NJoDhXNUKu5FkWSg1INCJ9mNg7KQZKRtQ2WSqXhvEg99PEocujcouWLNHabLMMnYOS/zm7StfedrkSxfCzlM4o06yGER79ZAnimx9hpy8fvNAIwhu4uB02aXGTC6xBmCsSZOBYwdcTwwTi8HounEaTGPeCeWE3dPRXrMZ8SaItDTqSprtj2xwqaZPr7GkreqESuomn44NN/IljPxrPTxMe3ie/Py8dVNcIvuzbo49KFRbG82gavwm11obzbXPonmGrc380aGsOkVVg/WrSO9YmtB29CLqm36W/8BYjhU0q0V+48AAAAASUVORK5CYII="} />
          Junte-se</GoToTelegram>
      </section>
    </div>
  )
}
