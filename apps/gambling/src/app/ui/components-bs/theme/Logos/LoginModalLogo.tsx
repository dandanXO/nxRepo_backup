import React from "react";
import {renderByPlatform} from "../../../utils/renderByPlatform";
import {LoginModalLogo as CLoginModalLogo} from "./env/coco/LoginModalLogo";
import {LoginModalLogo as RLoginModalLogo} from "./env/riojungle/LoginModalLogo";

type ILoginModalLogo = {
  className?: string;
}
export const LoginModalLogo = (props: ILoginModalLogo) => {
  return renderByPlatform({
    "wild777bet": <CLoginModalLogo/>,
    "coco777bet":  <CLoginModalLogo/>,
    "riojungle777bet": <RLoginModalLogo/>
  }, <CLoginModalLogo/>)
}
