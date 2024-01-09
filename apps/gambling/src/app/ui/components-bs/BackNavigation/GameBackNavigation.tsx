import {GameBackNavigation as CocoGameBackNavigation} from "./env/coco/GameBackNavigation";
import {GameBackNavigation as PernambucanaGameBackNavigation} from "./env/pernambucana/GameBackNavigation";
import {GameBackNavigation as WildGameBackNavigation} from "./env/wild/GameBackNavigation";
import {renderByPlatform} from "../../utils/renderByPlatform";


export const GameBackNavigation = renderByPlatform({
  "u1": CocoGameBackNavigation,
  "wild777bet": WildGameBackNavigation,
  "riojungle777bet": CocoGameBackNavigation,
}, PernambucanaGameBackNavigation);
