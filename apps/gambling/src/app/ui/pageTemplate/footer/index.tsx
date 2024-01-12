import {renderByUVersion} from "../../utils/renderByUVersion";
import {Footer as WFooter} from "./env/wild/Footer";
import {Footer as CFooter} from "./env/u1/Footer";
import {Footer as RFooter} from "./env/u2/Footer";
import {IFooter} from "./types/IFooter";

export const Footer = (props: IFooter) => {
  return renderByUVersion({
    "wild777bet": <WFooter {...props}/>,
    "u1": <CFooter {...props}/>,
    "u2": <RFooter {...props}/>,
  }, <WFooter {...props}/>);
}
