import {renderByPlatform} from "../../../utils/renderByPlatform";
import {Description as PDescription} from "./env/pernambucana/Description";
import {Description as WDescription} from "./env/wild/Description";
import {Description as CDescription} from "./env/coco/Description";
export const Description = renderByPlatform({
  "wild777bet": WDescription,
  "coco777bet": CDescription
}, PDescription)
