import {renderByUVersion} from "../../utils/renderByUVersion";
import {MenuDrawer as PMenuDrawer} from "./env/p1/MenuDrawer";
import {MenuDrawer as CMenuDrawer} from "./env/u1/MenuDrawer";
import {MenuDrawer as RMenuDrawer} from "./env/u2/MenuDrawer";

export const MenuDrawer = (props: any) => {
  return renderByUVersion({
    // "wild777bet": <WFooter {...props}/>,
    "p1": <PMenuDrawer {...props}/>,
    "u1": <CMenuDrawer {...props}/>,
    "u2": <RMenuDrawer {...props}/>
  }, <RMenuDrawer {...props}/>);
}
