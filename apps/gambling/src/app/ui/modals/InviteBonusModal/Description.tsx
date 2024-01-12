import {renderByUVersion} from "../../utils/renderByUVersion";
import {Description as PDescription} from "./env/pernambucana/Description";
import {Description as WDescription} from "./env/wild/Description";
import {Description as CDescription} from "./env/u1/Description";
export const Description = renderByUVersion({
  "wild777bet": WDescription,
  "u1": CDescription
}, PDescription)
