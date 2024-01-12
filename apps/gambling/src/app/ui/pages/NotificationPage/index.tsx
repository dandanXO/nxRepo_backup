import React, { useEffect } from 'react';

import {useAllowLoginRouterRules} from "../../router/hooks/useAllowLoginRouterRules";
import useBreakpoint from "../../pageTemplate/hooks/useBreakpoint";
import { usePageNavigate } from "../../router/hooks/usePageNavigate";

import { NotificationPage as CocoNotificationPage } from './env/u1'
import { NotificationPage as RioNotificationPage } from './env/u2'
import { renderByUVersion } from "../../utils/renderByUVersion";


export const NotificationPage = () => {
  useAllowLoginRouterRules();

  return renderByUVersion({
    "u1": <CocoNotificationPage />,
    "u2": <RioNotificationPage />
  }, (<CocoNotificationPage />))
};
