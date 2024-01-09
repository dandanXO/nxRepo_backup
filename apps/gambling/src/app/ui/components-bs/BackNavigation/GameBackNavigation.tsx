import {GameBackNavigation as CocoGameBackNavigation} from "./env/coco/GameBackNavigation";
import {GameBackNavigation as PernambucanaGameBackNavigation} from "./env/pernambucana/GameBackNavigation";
import {GameBackNavigation as WildGameBackNavigation} from "./env/wild/GameBackNavigation";
import {renderByUVersion} from "../../utils/renderByUVersion";


export const GameBackNavigation = renderByUVersion({
  "u1": CocoGameBackNavigation,
  "wild777bet": WildGameBackNavigation,
  "u2": CocoGameBackNavigation,
}, PernambucanaGameBackNavigation);
