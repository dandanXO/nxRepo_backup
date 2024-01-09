import styled from "styled-components";
import { environment } from "../../../../../../../environments/environment";
import { HowToImageText } from "../common/HowToImageText";
import { InviteCopySection } from "./InviteCopySection";

export const HowToImageContainer = styled.div`
  position: relative;

  //border-radius: 8px;
  //margin: 0;
  //padding: 20px;

  //height: 350px;
  min-height: 380px;

  color: var(--white);

  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;


  //border-radius: 0.2rem;
  //margin: 0.2rem auto;
  //padding: 0.1rem 0.18rem 0;
  box-sizing: border-box;
  text-align: left;
  //background: rgba(0,255,24,.15);
  //border: 0.02px solid rgba(36,247,41,.77);
  border: 2px solid transparent;
  background-clip: padding-box,border-box;
  background-origin: padding-box,border-box;
  background-image: linear-gradient(0deg,#2E104C,#3F28AF),linear-gradient(180deg,#5A3AF7,#500E8D);
`;
export const HowToImage = (props: any) => {
  return (
    <HowToImageContainer className={props.className}>
      <img className="hidden sm:block w-max-[100%] h-auto" src={`assets/${environment.uVersion}/topTitle1.ed9276b2.png`} />
      <img className={"display sm:hidden"} src={`assets/${environment.uVersion}/team_title-7d5515fe.png`} />
      <div className="mb-2 md:mx-16 md:my-5">
        <HowToImageText />
      </div>
      <img className={"mb-2 hidden sm:block w-max-[100%] h-auto"} src={`assets/${environment.uVersion}/topTitle2.396e135e.png`} />
      <img className={"mb-2 display sm:hidden"} src={`assets/${environment.uVersion}/invite-code-title-c456ebc9.png`} />
      <InviteCopySection/>
      <div className={"text-center"}>
        <div className={"text-[#ffd624] mb-2"}>Partilhar ligações através de software social</div>
        <img className={""} src={`assets/${environment.uVersion}/pic_social_media_logo.png`} />
      </div>
    </HowToImageContainer>
  )

}
