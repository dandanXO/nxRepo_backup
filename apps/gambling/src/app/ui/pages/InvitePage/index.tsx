// NOTE; https://www.npmjs.com/package/react-multi-carousel
import styled from "styled-components";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { HowToInviteTabSection } from "./HowToInviteTabSection";
import { InviteRecordInfoTabSection } from "./InviteRecordInfoTabSection/index";
import useBreakpoint from "../../pageTemplate/hooks/useBreakpoint";
import { useLazyGetInviteRewardDataQuery, useLazyGetUnsettleInviteRewardDataQuery } from "../../../external";
import { useAllowLoginRouterRules } from "../../router/hooks/useAllowLoginRouterRules";

import { TabItem, Tabs } from "../../components-bs/TabItem/TabItem";
import { PageContainer } from "../../components-bs/PageContainer";
import { useSelector } from "react-redux";
import { RootState } from "../../../reduxStore";
import cx from "classnames";
import { BackNavigation } from "../../components-bs/BackNavigation/BackNavigation";
import { usePageNavigate } from "../../router/hooks/usePageNavigate";
import { InvitePage as CInvitePage } from './env/coco/InvitePage';
import { InvitePage as PInvitePage } from './env/pernambucana/InvitePage';
import { InvitePage as RInvitePage } from './env/riojungle/InvitePage';
import { InvitePage as WInvitePage } from './env/wild/InvitePage';
import { renderByPlatform } from "../../utils/renderByPlatform";






export const QuestionContainer = styled.div`
  padding: 2vw 3vw;
  //background: rgba(9,11,15,.6);
  //border-radius: 20px;
  margin: 20px 0;
`

export interface IPanelMode{
  panelMode: "howto" | "daily";
  setPanelMode: React.Dispatch<React.SetStateAction<"howto" | "daily">>;
}
export type IInvitePage = {
  children: ReactNode;
} & IPanelMode


export const InvitePage = () => {
  useAllowLoginRouterRules();
  const { onClickToIndex } = usePageNavigate();

  const [panelMode, setPanelMode] = useState<"howto" | "daily">("howto");
  const { isMobile } = useBreakpoint();
  const { isLogin } = useSelector((state: RootState) => state.app)

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

  useEffect(() => {
    if (isLogin) {
      triggerGetInviteReward({});
      triggerGetUnsettleInviteReward({})
    }

  }, [])


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

  const TabContent = useCallback(() => {
    return (
      panelMode === "howto" ? (
        <HowToInviteTabSection inviteUrl={inviteInfo?.data?.inviteUrl || ''} panelMode={panelMode} setPanelMode={setPanelMode}/>
      ) : (
        inviteInfo !== undefined && inviteUnsettle !== undefined &&
        <InviteRecordInfoTabSection inviteInfo={inviteInfo} inviteUnsettle={inviteUnsettle} panelMode={panelMode} setPanelMode={setPanelMode}/>
      )
    )
  },[panelMode,inviteUnsettle,inviteInfo])
  return renderByPlatform(
    {
      "u1": <CInvitePage panelMode={panelMode} setPanelMode={setPanelMode} children={<TabContent />} />,
      "wild777bet": <WInvitePage panelMode={panelMode} setPanelMode={setPanelMode} children={<TabContent />} />,
      "riojungle777bet": <RInvitePage panelMode={panelMode} setPanelMode={setPanelMode} children={<TabContent />} />,
    },
    <PInvitePage panelMode={panelMode} setPanelMode={setPanelMode} children={<TabContent />} />,
  );

}
