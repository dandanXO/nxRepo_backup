import {renderByPlatform} from "../../utils/renderByPlatform";
import {InputSection as PInputSection} from "./env/pernambucana/InputSection"
import {InputSection as WInputSection} from "./env/wild/InputSection"
import {InputSection as CInputSection} from "./env/coco/InputSection"
export const InputSection = renderByPlatform({
  "wild777bet": WInputSection,
  "coco777bet": CInputSection
}, PInputSection)
