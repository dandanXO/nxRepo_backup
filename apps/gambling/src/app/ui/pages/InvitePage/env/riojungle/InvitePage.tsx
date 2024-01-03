import { useEffect, useState } from "react";
import useBreakpoint from "../../../../hooks/useBreakpoint";
import { useAllowLoginRouterRules } from "../../../../router/hooks/useAllowLoginRouterRules";

import { TabItem, Tabs } from "../../../../components-bs/TabItem/TabItem";
import { PageContainer } from "../../../../components-bs/PageContainer";

import cx from "classnames";
import { BackNavigation } from "../../../../components-bs/BackNavigation/BackNavigation";
import { usePageNavigate } from "../../../../hooks/usePageNavigate";
import { IInvitePage } from "../..";



export const InvitePage = (props: IInvitePage) => {
  const { onClickToIndex } = usePageNavigate();
  const { children, panelMode, setPanelMode } = props;

  const { isMobile } = useBreakpoint();

  return (
    <PageContainer>
      {children}
    </PageContainer>
  )
}
