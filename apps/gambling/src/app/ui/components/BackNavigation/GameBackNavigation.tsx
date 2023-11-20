import {GameBackNavigation as CocoGameBackNavigation} from "./env/coco/GameBackNavigation";
import {GameBackNavigation as PernambucanaGameBackNavigation} from "./env/pernambucana/GameBackNavigation";
import {GameBackNavigation as WildGameBackNavigation} from "./env/wild/GameBackNavigation";
import {renderByPlatform} from "../../utils/renderByPlatform";


export const GameBackNavigation = renderByPlatform({
  "coco777bet": CocoGameBackNavigation,
  "wild777bet": WildGameBackNavigation
}, PernambucanaGameBackNavigation);
