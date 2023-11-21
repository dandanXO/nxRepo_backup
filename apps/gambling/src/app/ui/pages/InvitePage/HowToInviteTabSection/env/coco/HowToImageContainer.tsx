import styled from "styled-components";
import shareListImg from "../common/share-list.png";
import { HowToImageText } from "../common/HowToImageText";
import { InviteCopySection } from "./InviteCopySection";
import cx from 'classnames';
import { environment } from "apps/gambling/src/environments/environment";
import useBreakpoint from "apps/gambling/src/app/ui/hooks/useBreakpoint";

export const HowToImageContainer = styled.div`
  position: relative;
  min-height: 380px;
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

  return (
    <HowToImageContainer className={cx(`${props.className}`, {
      'border border-solid border-[var(--stroke-block)] bg-gradient-to-b from-[var(--primary-main-from)] to-[var(--primary-main-to)]': isMobile,
      'shadow-[-4px_-4px_4px_0px_rgba(255,255,255,0.25)_inset,4px_4px_4px_0px_rgba(255,255,255,0.25)_inset]': isMobile
    })}>
      <div className="mb-2 sm:mb-8">
        <div className={`text-3xl font-extrabold text-[var(--text-popup)] mb-2 sm:text-4xl sm:font-bold sm:text-white sm:mb-2.5`}>Como convidar usuários?</div>
        <HowToImageText />
      </div>
      <div className={cx("w-full flex flex-col text-center sm:text-left sm:flex-row sm:rounded-2xl sm:pb-4 sm:pt-0.5 sm:px-8", {
        'border border-solid border-[var(--stroke-block)] bg-gradient-to-b from-[var(--primary-main-from)] to-[var(--primary-main-to)]': !isMobile
      })}>
        <div className={'flex-1'}>
          <InviteCopySection />
        </div>
        {!isMobile && <div className="border-r border-r-solid border-white mx-11 sm:mx-5"></div>}
        <div className={" flex-1 flex flex-col items-center sm:items-start"}>
          <div className={"text-[var(--secondary-assistant)] sm:text-white my-3.5 sm:mb-2 text-sm md:text:xl"}>{`${!isMobile ? 'Passo 2 : ' : ''}Partilhar ligações através de software social`}</div>
          <img className={"w-[400px]"} src={`assets/${environment.assetPrefix}/pic_social_media_logo.png`} />
        </div>
      </div>
      {!isMobile && <div className={`text-4xl font-bold text-white my-8 w-full`}>Instruções diárias de recompensa de comissão</div>}
    </HowToImageContainer>
  )

}
