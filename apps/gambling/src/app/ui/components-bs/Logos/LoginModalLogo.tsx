import React from "react";
import {renderByUVersion} from "../../utils/renderByUVersion";
import {LoginModalLogo as CLoginModalLogo} from "./env/coco/LoginModalLogo";
import {LoginModalLogo as RLoginModalLogo} from "./env/riojungle/LoginModalLogo";
import {ILogo} from "./env/types";

export const LoginModalLogo = (props: ILogo) => {
  return renderByUVersion({
    "wild777bet": <CLoginModalLogo {...props}/>,
    "u1":  <CLoginModalLogo {...props}/>,
    "u2": <RLoginModalLogo {...props}/>,
  }, <CLoginModalLogo {...props}/>,)
}
