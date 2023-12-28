import {renderByPlatform} from "../../utils/renderByPlatform";
import {EarnButton as PEarnButton} from "./env/pernambucana/EarnButton";
import {EarnButton as WEarnButton} from "./env/wild/EarnButton";
import {EarnButton as CEarnButton} from "./env/coco/EarnButton";
export const EarnButton = renderByPlatform({
  "wild777bet": WEarnButton,
  "coco777bet": CEarnButton,
}, PEarnButton)
