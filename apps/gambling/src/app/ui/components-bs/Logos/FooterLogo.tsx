import React from "react";

import {renderByPlatform} from "../../utils/renderByPlatform";
import {FooterLogo as CFooterLogo} from "./env/coco/FooterLogo";
import {FooterLogo as RFooterLogo} from "./env/riojungle/FooterLogo";
import {ILogo} from "./env/types";

export const FooterLogo = (props: ILogo) => {
  return renderByPlatform({
    "wild777bet": <CFooterLogo {...props}/>,
    "u1":  <CFooterLogo {...props}/>,
    "u2": <RFooterLogo {...props}/>,
  }, <CFooterLogo {...props}/>,)
}
