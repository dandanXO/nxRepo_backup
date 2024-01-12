import { renderByUVersion } from "../../utils/renderByUVersion";
import { InputSection as PInputSection } from "./env/pernambucana/InputSection"
import { InputSection as WInputSection } from "./env/wild/InputSection"
import { InputSection as CInputSection } from "./env/u1/InputSection"
import { InputSection as RInputSection } from "./env/u2/InputSection"

export const InputSection = renderByUVersion({
  "wild777bet": WInputSection,
  "u1": CInputSection,
  "u2": RInputSection
}, PInputSection)
