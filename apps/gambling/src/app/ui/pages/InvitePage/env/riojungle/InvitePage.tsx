import { useEffect, useState } from "react";
import useBreakpoint from "../../../../hooks/useBreakpoint";
import { useAllowLoginRouterRules } from "../../../../router/useAllowLoginRouterRules";

import { TabItem, Tabs } from "../../../../components/TabItem/TabItem";
import { Container } from "../../../../components/container/Container";

import cx from "classnames";
import { BackNavigation } from "../../../../components/BackNavigation/BackNavigation";
import { usePageNavigate } from "../../../../hooks/usePageNavigate";
import { IInvitePage } from "../..";



export const InvitePage = (props: IInvitePage) => {
  const { onClickToIndex } = usePageNavigate();
  const { children, panelMode, setPanelMode } = props;

  const { isMobile } = useBreakpoint();

  return (
    <Container>
      {children}
    </Container>
  )
}
