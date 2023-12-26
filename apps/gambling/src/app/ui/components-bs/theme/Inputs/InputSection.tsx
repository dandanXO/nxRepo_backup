import { renderByPlatform } from "../../../utils/renderByPlatform";
import { InputSection as PInputSection } from "./env/pernambucana/InputSection"
import { InputSection as WInputSection } from "./env/wild/InputSection"
import { InputSection as CInputSection } from "./env/coco/InputSection"
import { InputSection as RInputSection } from "./env/riojungle/InputSection"

export const InputSection = renderByPlatform({
  "wild777bet": WInputSection,
  "coco777bet": CInputSection,
  "riojungle777bet": RInputSection
}, PInputSection)
