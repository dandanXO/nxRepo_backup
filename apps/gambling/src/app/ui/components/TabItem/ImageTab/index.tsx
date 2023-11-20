import {renderByPlatform} from "../../../utils/renderByPlatform";
import {ImageTab as PImageTab} from "../env/pernambucana/ImageTab/index"
import {ImageTab as WImageTab} from "../env/wild/ImageTab/index"
import {ImageTab as CImageTab} from "../env/coco/ImageTab/index"

export const ImageTab = renderByPlatform({
  "wild777bet": WImageTab,
  "coco777bet": CImageTab,
}, PImageTab)

