import {renderByPlatform} from "../../utils/renderByPlatform";
import {TabBar as CTabBar} from "./env/coco/index"
import {TabBar as RTabBar} from "./env/riojungle/index"
import {ITabBar} from "./type";

export const TabBar = (props: ITabBar) => {
  return renderByPlatform({
    "wild777bet": <CTabBar {...props}/>,
    "u1": <CTabBar {...props}/>,
    "u2": <RTabBar {...props}/>,
  }, <CTabBar {...props}/>);
}
