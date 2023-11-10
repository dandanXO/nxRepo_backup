// NOTE; https://www.npmjs.com/package/react-multi-carousel
import styled from "styled-components";
import {useEffect, useState} from "react";
import {HowToInviteTabSection} from "./HowToInviteTabSection";
import {InviteRecordInfoTabSection} from "./InviteRecordInfoTabSection/index";
import useBreakpoint from "../../hooks/useBreakpoint";
import { useLazyGetInviteRewardDataQuery, useLazyGetInviteUserDayReportDataQuery, useLazyGetUnsettleInviteRewardDataQuery } from "../../../external";
import { AppLocalStorage } from "../../../persistant/localstorage";
import {useAllowLoginRouterRules} from "../../router/useAllowLoginRouterRules";
import {environment} from "../../../../environments/environment";

// const InviteCommmonButton = styled.div`
//   color: #fff;
//   background: linear-gradient(149deg,#FFF600 0%,#4FFB0C 100%);
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
// `

type ITabButton = {
  active?: boolean;
}
const TabButton = styled.button<ITabButton>`
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  //height: 100%;
  cursor: pointer;
  width: 350px;
  height: 56px;
  margin-right: 8px;
  color: ${(props) =>
    props.active
    ? "rgba(22, 255, 143, 1)"
    : "#fff"};

  background: ${(props) =>
    props.active
      ? `url('assets/${environment.assetPrefix}/btn_invite_friend.png') center center no-repeat`
      : ""};

  @media (max-width: 768px) {
    background: ${(props) =>
        props.active
            ? `url('assets/${environment.assetPrefix}/btn_invite_friend_h5.png') center center no-repeat`
            : ""};
  }
`

const TabTextConVidar = styled.div`
  padding: 10px 30px;
  //color: #fff;
  //background: url("assets/${environment.assetPrefix}/btn_green01.png") center center no-repeat;
  //width: 150px;
  //height: 60px;
  //border-radius: 10px;
  //margin-top: 10px; /* 垂直調整10px */
  //-webkit-background-clip: text;
  //-webkit-text-fill-color: transparent;
`

const TabTextDados = styled.div`
  padding: 10px 30px;
  //color: #fff;
  //background: url("assets/${environment.assetPrefix}/icon_yellow.png") center center no-repeat;
  //width: 150px;
  //height: 60px;
  //border-radius: 10px;
  //margin-top: 10px; /* 垂直調整10px */
  //-webkit-background-clip: text;
  //-webkit-text-fill-color: transparent;
`

export const QuestionContainer = styled.div`
  padding: 2vw 3vw;
  //background: rgba(9,11,15,.6);
  //border-radius: 20px;
  margin: 20px 0;
`


export const InvitePage = () => {
  useAllowLoginRouterRules();

  const [panelMode, setPanelMode] = useState<"howto" | "daily" >("howto");
  const {isMobile} = useBreakpoint();

  const [triggerGetInviteReward, { currentData: inviteInfo, isFetching: isInviteInfoFetching }] =
  useLazyGetInviteRewardDataQuery({
    pollingInterval: 0,
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });

  const [triggerGetUnsettleInviteReward, { currentData: inviteUnsettle, isFetching: isInviteUnsettleFetching }] =
  useLazyGetUnsettleInviteRewardDataQuery({
    pollingInterval: 0,
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });

  useEffect(()=>{
    triggerGetInviteReward({});
    triggerGetUnsettleInviteReward({})
  },[])


  // NOTE: window focus change
  useEffect(() => {
    const handler = () => {
      triggerGetInviteReward({});
      triggerGetUnsettleInviteReward({})
    }
    window.addEventListener("focus", handler)
    return () => {
      window.removeEventListener("focus", handler)
    }
  }, [])

  return (
    <>

      <div className={"px-4 sm:px-10 font-[HelveticaNeue-Medium-11] py-4"}>

        <section className={"tab-item w-full flex flex-row justify-center item-center mb-4"}>
          {/*<Tabs className={"game-type-tab-list"}>*/}
          {/*  <TabItem className={""} name={"Como convidar"} active={panelMode === "howto"} size={"big"} onClick={() => {*/}
          {/*    setPanelMode("howto")*/}
          {/*  }}*/}
          {/*  />*/}
          {/*  <TabItem className={""} name={"Convite diariamente"} active={panelMode === "daily"} size={"big"} onClick={() => {*/}
          {/*    setPanelMode("daily")*/}
          {/*  }}/>*/}
          {/*</Tabs>*/}
          <TabButton active={panelMode === "howto"} onClick={() => {
            setPanelMode("howto")
          }}>
            <TabTextConVidar className={"text-sm font-bold"}>{isMobile ? "Convidar" :"Como convidar"}</TabTextConVidar>
          </TabButton>

          <TabButton active={panelMode === "daily"} onClick={() => {
            setPanelMode("daily")
          }}>
            <TabTextDados className={"text-sm font-bold"}>
              {isMobile ? "Dados diários" : "Convite diariamente"}
            </TabTextDados>
          </TabButton>
        </section>


        {panelMode === "howto" ? (
          <HowToInviteTabSection inviteUrl={inviteInfo?.data?.inviteUrl || ''} />
        ) : (
          inviteInfo!==undefined && inviteUnsettle!==undefined &&
            <InviteRecordInfoTabSection inviteInfo={inviteInfo} inviteUnsettle={inviteUnsettle}/>
        )}
      </div>

      {/*<InviteCommmonButton className={"rounded-xl"}>Como convidar</InviteCommmonButton>*/}
    </>
  )
}
