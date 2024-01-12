import {renderByUVersion} from "../../utils/renderByUVersion";
import {Item as WItem} from "./env/wild/Item";
import {Item as CItem} from "./env/u1/Item";
import {Item as PItem} from "./env/pernambucana/Item";

export const Item = renderByUVersion({
  "wild777bet": WItem,
  "u1": CItem,
}, PItem)
