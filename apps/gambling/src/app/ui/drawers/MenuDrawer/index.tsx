import {renderByUVersion} from "../../utils/renderByUVersion";
import {MenuDrawer as CMenuDrawer} from "./env/coco/MenuDrawer";
import {MenuDrawer as RMenuDrawer} from "./env/riojungle/MenuDrawer";

export const MenuDrawer = (props: any) => {
  return renderByUVersion({
    // "wild777bet": <WFooter {...props}/>,
    "u1": <CMenuDrawer {...props}/>,
    "u2": <RMenuDrawer {...props}/>
  }, <RMenuDrawer {...props}/>);
}
