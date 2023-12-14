import {renderByPlatform} from "../../utils/renderByPlatform";
import {Footer as WFooter} from "./env/wild/Footer";
import {Footer as CFooter} from "./env/coco/Footer";
import {Footer as RFooter} from "./env/riojungle/Footer";

export type IFooter = {
  // showFooter?: boolean;
  showTabbar?: boolean;
  showMobileFooter?: boolean;
  showDesktopFooter?: boolean;
}

export const Footer = (props: IFooter) => {
  return renderByPlatform({
    "wild777bet": <WFooter {...props}/>,
    "coco777bet": <CFooter {...props}/>,
    "riojungle777bet": <RFooter {...props}/>,
  }, <WFooter {...props}/>);
}
