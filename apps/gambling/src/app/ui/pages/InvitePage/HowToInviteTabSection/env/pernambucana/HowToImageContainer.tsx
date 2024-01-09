import styled from "styled-components";
import { environment } from "../../../../../../../environments/environment";
import { HowToImageText } from "../common/HowToImageText";
import { InviteCopySection } from "./InviteCopySection";

export const HowToImageContainer = styled.div`
  position: relative;
  background-image: url("assets/${environment.uVersion}/${environment.assetVersionPrefix}/banner_1.png");
  background-size: 1524px 423px;
  //background-size: cover;
  overflow: hidden;
  border-radius: 8px;

  //width: 1524px;
  //height: 423px;
  //padding: 20px

  display: flex;
  flex-direction: column;

  //background-image: url({{ section.settings.bgimg | image_url }});
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0;
  //height: 350px;
  min-height: 380px;

  align-items: center;
  justify-content: center;
  color: var(--white);

  padding: 20px;
`;


export const HowToImage = (props: any) => {
  const { inviteUrl = '', onClickToCopy } = props;
  return (
    <HowToImageContainer className={props.className}>
      <img className="hidden sm:block w-max-[100%] h-auto" src={`assets/${environment.uVersion}/topTitle1.ed9276b2.png`} />
      <img className={"display sm:hidden"} src={`assets/${environment.uVersion}/team_title-7d5515fe.png`} />
      <div className="mb-2 md:mx-16 md:my-5">
        <HowToImageText />
      </div>
      <img className={"mb-2 hidden sm:block w-max-[100%] h-auto"} src={`assets/${environment.uVersion}/topTitle2.396e135e.png`} />
      <img className={"mb-2 display sm:hidden"} src={`assets/${environment.uVersion}/invite-code-title-c456ebc9.png`} />
      <InviteCopySection inviteUrl={inviteUrl} onClickToCopy={onClickToCopy} />
      <div className={"text-center"}>
        <div className={"text-[#ffd624] mb-2"}>Partilhar ligações através de software social</div>
        <img className={""} src={`assets/${environment.uVersion}/pic_social_media_logo.png`} />
      </div>
    </HowToImageContainer>
  )

}
