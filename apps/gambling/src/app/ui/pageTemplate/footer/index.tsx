import {renderByPlatform} from "../../utils/renderByPlatform";
import {Footer as WFooter} from "./env/wild/Footer";
import {Footer as CFooter} from "./env/coco/Footer";
import {Footer as RFooter} from "./env/riojungle/Footer";
import {IFooter} from "./types/IFooter";

export const Footer = (props: IFooter) => {
  return renderByPlatform({
    "wild777bet": <WFooter {...props}/>,
    "u1": <CFooter {...props}/>,
    "riojungle777bet": <RFooter {...props}/>,
  }, <WFooter {...props}/>);
}
