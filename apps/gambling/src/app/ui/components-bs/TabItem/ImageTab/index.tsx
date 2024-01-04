import {renderByPlatform} from "../../../utils/renderByPlatform";
import {ImageTab as PImageTab} from "../env/pernambucana/ImageTab"
import {ImageTab as WImageTab} from "../env/wild/ImageTab"
import {ImageTab as CImageTab} from "../env/coco/ImageTab"

export const ImageTab = renderByPlatform({
  "wild777bet": WImageTab,
  "coco777bet": CImageTab,
}, PImageTab)

