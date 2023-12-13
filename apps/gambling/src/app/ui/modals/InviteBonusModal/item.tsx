import {renderByPlatform} from "../../utils/renderByPlatform";
import {Item as WItem} from "./env/wild/Item";
import {Item as CItem} from "./env/coco/Item";
import {Item as PItem} from "./env/pernambucana/Item";

export const Item = renderByPlatform({
  "wild777bet": WItem,
  "coco777bet": CItem,
}, PItem)
