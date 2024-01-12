import React from "react";
import {renderByUVersion} from "../../utils/renderByUVersion";
import {LoadingLogo as CLoadingLogo} from "./env/u1/LoadingLogo";
import {LoadingLogo as RLoadingLogo} from "./env/u2/LoadingLogo";
import {ILogo} from "./env/types";

export const LoadingLogo = (props: ILogo) => {
  return renderByUVersion({
    "wild777bet": <CLoadingLogo {...props}/>,
    "u1":  <CLoadingLogo {...props}/>,
    "u2": <RLoadingLogo {...props}/>,
  }, <CLoadingLogo {...props}/>,)
}
