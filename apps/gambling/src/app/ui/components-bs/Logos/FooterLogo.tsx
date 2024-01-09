import React from "react";

import {renderByUVersion} from "../../utils/renderByUVersion";
import {FooterLogo as CFooterLogo} from "./env/coco/FooterLogo";
import {FooterLogo as RFooterLogo} from "./env/riojungle/FooterLogo";
import {ILogo} from "./env/types";

export const FooterLogo = (props: ILogo) => {
  return renderByUVersion({
    "wild777bet": <CFooterLogo {...props}/>,
    "u1":  <CFooterLogo {...props}/>,
    "u2": <RFooterLogo {...props}/>,
  }, <CFooterLogo {...props}/>,)
}
