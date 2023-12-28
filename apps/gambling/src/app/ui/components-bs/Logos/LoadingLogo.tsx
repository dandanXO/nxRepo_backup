import React from "react";
import {renderByPlatform} from "../../utils/renderByPlatform";
import {LoadingLogo as CLoadingLogo} from "./env/coco/LoadingLogo";
import {LoadingLogo as RLoadingLogo} from "./env/riojungle/LoadingLogo";
import {ILogo} from "./env/types";

export const LoadingLogo = (props: ILogo) => {
  return renderByPlatform({
    "wild777bet": <CLoadingLogo {...props}/>,
    "coco777bet":  <CLoadingLogo {...props}/>,
    "riojungle777bet": <RLoadingLogo {...props}/>,
  }, <CLoadingLogo {...props}/>,)
}
