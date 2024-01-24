import styled from "styled-components";
import shareListImg from "../common/share-list.png";
import { HowToImageText } from "../common/HowToImageText";
import { InviteCopySection } from "./InviteCopySection";
import cx from 'classnames';
import { environment } from "../../../../../../../environments/environment";
import useBreakpoint from "../../../../../pageTemplate/hooks/useBreakpoint";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../reduxStore";

export const HowToImageContainer = styled.div`
  position: relative;
  /* min-height: 380px; */
  color: var(--white);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  text-align: left;
`;


export const HowToImage = (props: any) => {
  const { isMobile } = useBreakpoint();
  const invite_hig_reward = useSelector((rootState: RootState) => rootState.app.config.invite_hig_reward)

  return (
    <HowToImageContainer className={cx(`${props.className}`, {
      'border border-solid border-[var(--stroke-block)] bg-gradient-to-b from-[var(--primary-main-from)] to-[var(--primary-main-to)]': isMobile,
      'shadow-[-4px_-4px_4px_0px_rgba(255,255,255,0.25)_inset,4px_4px_4px_0px_rgba(255,255,255,0.25)_inset]': isMobile
    })}>
      <div className="mb-3.5 sm:mb-8 w-full">
        <div className={`text-center sm:text-left text-2xl sm:text-4xl font-bold text-[var(--secondary-assistant)] mb-2 sm:mb-2.5`}>Como convidar usuários?</div>
        <div className="text-sm sm:text-xl">Convide usuários válidos para recarga, o bônus pode chegar a até R$ {invite_hig_reward} ! O que você está esperando, convide seus amigos para participar!</div>
      </div>

      <div className={cx("w-full flex flex-col text-center sm:text-left sm:flex-row sm:rounded-2xl sm:pb-4 sm:pt-5 sm:px-8", {
        'border border-solid border-[var(--stroke-block)] bg-gradient-to-b from-[var(--primary-main-from)] to-[var(--primary-main-to)]': !isMobile
      })}>
        <div className={'flex-1'}>
          <p className="mb-3.5 sm:mb-2 text-white text-sm md:text-xl">{`Passo 1: Clique no botão para copiar o link do convite`}</p>
          <InviteCopySection />
        </div>
        {!isMobile && <div className="border-r border-r-solid border-white mx-11 sm:mx-5"></div>}
        <div className={" flex-1 flex flex-col items-center sm:items-start"}>
          <div className={"text-white my-3.5 sm:mt-0 sm:mb-2 text-sm md:text-xl"}>{`Passo 2 : Partilhar ligações através de software social`}</div>
          <img className={"w-[400px]"} src={`assets/${environment.uVersion}/pic_social_media_logo.png`} />
        </div>
      </div>
    </HowToImageContainer>
  )
}

export const BoxHowToImage = (props: any) => {
  const { isMobile } = useBreakpoint();
  const invite_hig_reward = useSelector((rootState: RootState) => rootState.app.config.invite_hig_reward)

  return (
    <HowToImageContainer className={cx(`${props.className} rounded-lg`, {
      'bg-[#FFFFFF1A]': isMobile,
      'px-8': isMobile,
      'py-5': isMobile
    })}>
      <div className={cx("w-full flex flex-col text-left sm:text-left sm:flex-col sm:rounded-lg sm:pb-4 sm:pt-5 sm:px-8", {
        ' bg-[#FFFFFF1A]': !isMobile
      })}>
        <div className={'flex-1'}>
          <p className="mb-3.5 sm:mb-2 text-white text-sm md:text-xl">{`Link exclusivo`}</p>
          <InviteCopySection />
        </div>
        {!isMobile && <div className="border-r border-r-solid border-white mx-11 sm:mx-5"></div>}
        <div className={" mt-6 flex-1 flex flex-col items-start sm:items-start"}>
          <div className={"text-white w-full text-left my-3.5 sm:mt-0 sm:mb-2 text-sm md:text-xl"}>{`Partilha rápida`}</div>
          <img className={"w-[400px]"} src={`assets/${environment.uVersion}/pic_social_media_logo.png`} />
        </div>
      </div>
    </HowToImageContainer>
  )

}
