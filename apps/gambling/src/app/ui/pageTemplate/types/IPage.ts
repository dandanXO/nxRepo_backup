import React from "react";
import {TShowToolboxConfig} from "../base/types";

export type IPage = {
  children: React.ReactNode;

  // NOTE: Header
  showMobileHeader?: boolean;
  showDesktopHeader?: boolean;

  // NOTE: MenuDrawer
  showDesktopMenuDrawer?: boolean;

  // NOTE: TabBar
  showTabbar?: boolean;

  // NOTE: Footer
  showMobileFooter?: boolean;
  showDesktopFooter?: boolean;

  // NOTE: Toolbox
  showToolboxConfig?: TShowToolboxConfig
}
