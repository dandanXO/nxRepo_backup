import React, { useEffect } from 'react';

import {useAllowLoginRouterRules} from "../../router/useAllowLoginRouterRules";
import useBreakpoint from "../../hooks/useBreakpoint";
import { usePageNavigate } from "../../hooks/usePageNavigate";

import { NotificationPage as CocoNotificationPage } from './env/coco'
import { NotificationPage as RioNotificationPage } from './env/riojungle'
import { renderByPlatform } from "../../utils/renderByPlatform";


export const NotificationPage = () => {
  useAllowLoginRouterRules();

  const { onClickToIndex } = usePageNavigate();
  const { isDesktop } = useBreakpoint();

  useEffect(()=>{
    if(isDesktop) {
      onClickToIndex();
    }
  }, [isDesktop])

  return renderByPlatform({
    "coco777bet": <CocoNotificationPage />,
    "riojungle777bet": <RioNotificationPage />
  }, (<CocoNotificationPage />))
};
