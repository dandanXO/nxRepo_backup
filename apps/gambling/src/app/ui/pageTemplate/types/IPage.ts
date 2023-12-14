import React from "react";
import {TShowToolboxConfig} from "../base/types";

export type IPage = {
  children: React.ReactNode;
  showMobileHeader?: boolean;
  showTabbar?: boolean;
  showDesktopHeader?: boolean;
  showDesktopMenuDrawer?: boolean;
  showMobileFooter?: boolean;
  showDesktopFooter?: boolean;
  showToolboxConfig?: TShowToolboxConfig
}
