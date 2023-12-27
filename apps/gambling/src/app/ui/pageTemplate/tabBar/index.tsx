import {renderByPlatform} from "../../utils/renderByPlatform";
import {TabBar as CTabBar} from "./env/coco/index"
import {TabBar as RTabBar} from "./env/riojungle/index"
import {ITabBar} from "./type";

export const TabBar = (props: ITabBar) => {
  return renderByPlatform({
    "wild777bet": <CTabBar {...props}/>,
    "coco777bet": <CTabBar {...props}/>,
    "riojungle777bet": <RTabBar {...props}/>,
  }, <CTabBar {...props}/>);
}
