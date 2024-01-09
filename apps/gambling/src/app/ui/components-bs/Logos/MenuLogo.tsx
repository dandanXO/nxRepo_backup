import React from "react";
import {renderByUVersion} from "../../utils/renderByUVersion";
import {MenuLogo as CMenuLogo} from "./env/coco/MenuLogo";
import {MenuLogo as RMenuLogo} from "./env/riojungle/MenuLogo";
import {ILogo} from "./env/types";

export const MenuLogo = (props: ILogo) => {
  return renderByUVersion({
    "wild777bet": <CMenuLogo {...props}/>,
    "u1":  <CMenuLogo {...props}/>,
    "u2": <RMenuLogo {...props}/>,
  }, <CMenuLogo {...props}/>)
}
