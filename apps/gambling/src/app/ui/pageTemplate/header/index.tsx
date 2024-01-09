import {renderByPlatform} from "../../utils/renderByPlatform";
import {Header as WHeader} from "./env/wild/Header";
import {Header as CHeader} from "./env/coco/Header";
import {Header as RHeader} from "./env/riojungle/index";
import {IHeader} from "./types/IHeader";

export const Header = (props: IHeader) => {
  return renderByPlatform({
    "wild777bet": <WHeader {...props}/>,
    "u1": <CHeader {...props}/>,
    "riojungle777bet": <RHeader {...props}/>,
  }, <CHeader {...props}/>);
}
