import React from "react";
import {renderByPlatform} from "../../../utils/renderByPlatform";
import {LoginModalLogo as CLoginModalLogo} from "./env/coco/LoginModalLogo";
import {LoginModalLogo as RLoginModalLogo} from "./env/riojungle/LoginModalLogo";
import {ILogo} from "./env/types";

export const LoginModalLogo = (props: ILogo) => {
  return renderByPlatform({
    "wild777bet": <CLoginModalLogo {...props}/>,
    "coco777bet":  <CLoginModalLogo {...props}/>,
    "riojungle777bet": <RLoginModalLogo {...props}/>,
  }, <CLoginModalLogo {...props}/>,)
}
