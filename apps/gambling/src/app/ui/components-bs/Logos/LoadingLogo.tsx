import React from "react";
import {renderByPlatform} from "../../utils/renderByPlatform";
import {LoadingLogo as CLoadingLogo} from "./env/coco/LoadingLogo";
import {LoadingLogo as RLoadingLogo} from "./env/riojungle/LoadingLogo";
import {ILogo} from "./env/types";

export const LoadingLogo = (props: ILogo) => {
  return renderByPlatform({
    "wild777bet": <CLoadingLogo {...props}/>,
    "u1":  <CLoadingLogo {...props}/>,
    "u2": <RLoadingLogo {...props}/>,
  }, <CLoadingLogo {...props}/>,)
}
