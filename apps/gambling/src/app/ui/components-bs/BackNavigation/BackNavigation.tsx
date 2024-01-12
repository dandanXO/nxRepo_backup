import {BackNavigation as CocoBackNavigation} from "./env/u1/BackNavigation";
import {BackNavigation as PernambucanaBackNavigation} from "./env/pernambucana/BackNavigation";
import {BackNavigation as WildBackNavigation} from "./env/wild/BackNavigation";
import {renderByUVersion} from "../../utils/renderByUVersion";

export const BackNavigation = renderByUVersion({
    "u1": CocoBackNavigation,
    "wild777bet": WildBackNavigation,
    "u2": CocoBackNavigation
  }, PernambucanaBackNavigation);
