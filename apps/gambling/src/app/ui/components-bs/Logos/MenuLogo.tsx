import React from "react";
import {renderByPlatform} from "../../utils/renderByPlatform";
import {MenuLogo as CMenuLogo} from "./env/coco/MenuLogo";
import {MenuLogo as RMenuLogo} from "./env/riojungle/MenuLogo";
import {ILogo} from "./env/types";

export const MenuLogo = (props: ILogo) => {
  return renderByPlatform({
    "wild777bet": <CMenuLogo {...props}/>,
    "u1":  <CMenuLogo {...props}/>,
    "riojungle777bet": <RMenuLogo {...props}/>,
  }, <CMenuLogo {...props}/>)
}
