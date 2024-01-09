import {renderByUVersion} from "../../utils/renderByUVersion";
import {Header as WHeader} from "./env/wild/Header";
import {Header as CHeader} from "./env/coco/Header";
import {Header as RHeader} from "./env/riojungle/index";
import {IHeader} from "./types/IHeader";

export const Header = (props: IHeader) => {
  return renderByUVersion({
    "wild777bet": <WHeader {...props}/>,
    "u1": <CHeader {...props}/>,
    "u2": <RHeader {...props}/>,
  }, <CHeader {...props}/>);
}
