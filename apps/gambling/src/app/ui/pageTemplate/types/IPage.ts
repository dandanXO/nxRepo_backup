import React from "react";
import {TShowToolboxConfig} from "../base/types";
import {IUseSingletonPageTemplateConfig} from "../hooks/useSingletonPageTemplateConfig";

export type IPage = {
  children: React.ReactNode;

  // NOTE: TabBar
  // Deprecated: coco used
  showTabbar?: boolean;

  // NOTE: Toolbox
  showToolboxConfig?: TShowToolboxConfig
} & IUseSingletonPageTemplateConfig;
