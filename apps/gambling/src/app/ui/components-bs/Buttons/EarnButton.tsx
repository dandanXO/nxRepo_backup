import {renderByUVersion} from "../../utils/renderByUVersion";
import {EarnButton as PEarnButton} from "./env/pernambucana/EarnButton";
import {EarnButton as WEarnButton} from "./env/wild/EarnButton";
import {EarnButton as CEarnButton} from "./env/u1/EarnButton";
export const EarnButton = renderByUVersion({
  "wild777bet": WEarnButton,
  "u1": CEarnButton,
}, PEarnButton)
