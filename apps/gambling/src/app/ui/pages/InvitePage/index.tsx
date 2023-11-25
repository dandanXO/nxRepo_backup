// NOTE; https://www.npmjs.com/package/react-multi-carousel
import styled from "styled-components";
import {useEffect, useState} from "react";
import {HowToInviteTabSection} from "./HowToInviteTabSection";
import {InviteRecordInfoTabSection} from "./InviteRecordInfoTabSection/index";
import useBreakpoint from "../../hooks/useBreakpoint";
import {useLazyGetInviteRewardDataQuery, useLazyGetUnsettleInviteRewardDataQuery} from "../../../external";
import {useAllowLoginRouterRules} from "../../router/useAllowLoginRouterRules";

import {TabItem, Tabs} from "../../components/TabItem/TabItem";
import {Container} from "../../components/container/Container";
import {useSelector} from "react-redux";
import {RootState} from "../../../reduxStore";
import cx from "classnames";

// const InviteCommmonButton = styled.div`
//   color: #fff;
//   background: linear-gradient(149deg,#FFF600 0%,#4FFB0C 100%);
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
// `



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
  const {isLogin} = useSelector((state: RootState) => state.app)

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
    if(isLogin) {
      triggerGetInviteReward({});
      triggerGetUnsettleInviteReward({})
    }

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
      <Container>
        <section className={"tab-item w-full flex flex-row justify-center item-center mb-4"}>
          <div>
            <Tabs className={"game-type-tab-list"}>
              <TabItem
                mode={"howto"}
                // pureColor={true}
                background={"--var(primary-variant)"}
                // activeBackground={"bg-gradient-to-b from-[var(--primary-main-from)] to-[var(--primary-main-to)]"}
                activeBackground={"linear-gradient(180deg, var(--primary-main-from) 0%, var(--primary-main-to) 100%);"}
                className={cx("px-6",{
                  "rounded-md": panelMode === "howto"
                })}
                name={isMobile ? "Convidar" : "Como convidar"}
                active={panelMode === "howto"}
                size={"big"}
                onClick={() => {
                  setPanelMode("howto")
                }}
              />
              <TabItem
                mode={"data"}
                // pureColor={true}
                background={"--var(primary-variant)"}
                // activeBackground={"bg-gradient-to-b from-[var(--primary-main-from)] to-[var(--primary-main-to)]"}
                activeBackground={"linear-gradient(180deg, var(--primary-main-from) 0%, var(--primary-main-to) 100%);"}
                className={cx("px-6",{
                  "rounded-md": panelMode === "daily"
                })}
                name={isMobile ? "Dados diários" :"Convite diariamente"}
                active={panelMode === "daily"}
                size={"big"}
                onClick={() => {
                  setPanelMode("daily")
                }}
              />
            </Tabs>
          </div>

          {/*<div>*/}
          {/*  <TabButton active={panelMode === "howto"} onClick={() => {*/}
          {/*    setPanelMode("howto")*/}
          {/*  }}>*/}
          {/*    <TabTextConVidar className={"text-sm font-bold"}>{isMobile ? "Convidar" :"Como convidar"}</TabTextConVidar>*/}
          {/*  </TabButton>*/}

          {/*  <TabButton active={panelMode === "daily"} onClick={() => {*/}
          {/*    setPanelMode("daily")*/}
          {/*  }}>*/}
          {/*    <TabTextDados className={"text-sm font-bold"}>*/}
          {/*      {isMobile ? "Dados diários" : "Convite diariamente"}*/}
          {/*    </TabTextDados>*/}
          {/*  </TabButton>*/}
          {/*</div>*/}

        </section>


        {panelMode === "howto" ? (
          <HowToInviteTabSection inviteUrl={inviteInfo?.data?.inviteUrl || ''} />
        ) : (
          inviteInfo!==undefined && inviteUnsettle!==undefined &&
            <InviteRecordInfoTabSection inviteInfo={inviteInfo} inviteUnsettle={inviteUnsettle}/>
        )}
      </Container>

      {/*<InviteCommmonButton className={"rounded-xl"}>Como convidar</InviteCommmonButton>*/}
    </>
  )
}
