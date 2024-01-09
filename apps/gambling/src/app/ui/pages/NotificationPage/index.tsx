import React, { useEffect } from 'react';

import {useAllowLoginRouterRules} from "../../router/hooks/useAllowLoginRouterRules";
import useBreakpoint from "../../pageTemplate/hooks/useBreakpoint";
import { usePageNavigate } from "../../router/hooks/usePageNavigate";

import { NotificationPage as CocoNotificationPage } from './env/coco'
import { NotificationPage as RioNotificationPage } from './env/riojungle'
import { renderByPlatform } from "../../utils/renderByPlatform";


export const NotificationPage = () => {
  useAllowLoginRouterRules();

  return renderByPlatform({
    "u1": <CocoNotificationPage />,
    "u2": <RioNotificationPage />
  }, (<CocoNotificationPage />))
};
