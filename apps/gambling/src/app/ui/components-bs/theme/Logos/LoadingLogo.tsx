import React from "react";
import {renderByPlatform} from "../../../utils/renderByPlatform";
import {LoadingLogo as CLoadingLogo} from "./env/coco/LoadingLogo";
import {LoadingLogo as RLoadingLogo} from "./env/riojungle/LoadingLogo";

type ILogo = {
  className?: string;
}
export const LoadingLogo = (props: ILogo) => {
  return renderByPlatform({
    "wild777bet": <CLoadingLogo/>,
    "coco777bet":  <CLoadingLogo/>,
    "riojungle777bet": <RLoadingLogo/>
  }, <CLoadingLogo/>)
}
