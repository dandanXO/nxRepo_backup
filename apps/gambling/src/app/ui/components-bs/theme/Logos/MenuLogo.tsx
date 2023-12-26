import React from "react";
import {renderByPlatform} from "../../../utils/renderByPlatform";
import {MenuLogo as CMenuLogo} from "./env/coco/MenuLogo";
import {MenuLogo as RMenuLogo} from "./env/riojungle/MenuLogo";

export const MenuLogo = () => {
  return renderByPlatform({
    "wild777bet": <CMenuLogo/>,
    "coco777bet":  <CMenuLogo/>,
    "riojungle777bet": <RMenuLogo/>
  }, <CMenuLogo/>)
}
