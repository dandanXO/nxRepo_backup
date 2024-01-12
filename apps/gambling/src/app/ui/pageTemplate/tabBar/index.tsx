import {renderByUVersion} from "../../utils/renderByUVersion";
import {TabBar as CTabBar} from "./env/u1/index"
import {TabBar as RTabBar} from "./env/u2/index"
import {ITabBar} from "./type";

export const TabBar = (props: ITabBar) => {
  return renderByUVersion({
    "wild777bet": <CTabBar {...props}/>,
    "u1": <CTabBar {...props}/>,
    "u2": <RTabBar {...props}/>,
  }, <CTabBar {...props}/>);
}
