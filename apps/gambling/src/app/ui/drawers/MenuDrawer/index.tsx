import {renderByPlatform} from "../../utils/renderByPlatform";
import {MenuDrawer as CMenuDrawer} from "./env/coco/MenuDrawer";
import {MenuDrawer as RMenuDrawer} from "./env/riojungle/MenuDrawer";

export const MenuDrawer = (props: any) => {
  return renderByPlatform({
    // "wild777bet": <WFooter {...props}/>,
    "u1": <CMenuDrawer {...props}/>,
    "riojungle777bet": <RMenuDrawer {...props}/>
  }, <RMenuDrawer {...props}/>);
}
