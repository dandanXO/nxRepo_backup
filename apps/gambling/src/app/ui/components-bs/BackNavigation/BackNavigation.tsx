import {BackNavigation as CocoBackNavigation} from "./env/coco/BackNavigation";
import {BackNavigation as PernambucanaBackNavigation} from "./env/pernambucana/BackNavigation";
import {BackNavigation as WildBackNavigation} from "./env/wild/BackNavigation";
import {renderByPlatform} from "../../utils/renderByPlatform";

export const BackNavigation = renderByPlatform({
    "coco777bet": CocoBackNavigation,
    "wild777bet": WildBackNavigation,
    "riojungle777bet": CocoBackNavigation
  }, PernambucanaBackNavigation);
