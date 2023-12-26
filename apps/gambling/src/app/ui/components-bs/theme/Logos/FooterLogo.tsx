import React from "react";

import {renderByPlatform} from "../../../utils/renderByPlatform";
import {FooterLogo as CFooterLogo} from "./env/coco/FooterLogo";
import {FooterLogo as RFooterLogo} from "./env/riojungle/FooterLogo";

type IFooterLogo = {
  className?: string;
}
export const FooterLogo = (props: IFooterLogo) => {
  return renderByPlatform({
   "wild777bet": <CFooterLogo/>,
   "coco777bet":  <CFooterLogo/>,
    "riojungle777bet": <RFooterLogo/>
  }, <CFooterLogo/>)
}
