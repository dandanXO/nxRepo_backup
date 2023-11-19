
import {renderByPlatform} from "../../../../utils/renderByPlatform";

import {CommonTableTabG as PCImageTab} from "./pernambucana/CommonTableTabG";
import {ImageTab} from "../../../../components/TabItem/ImageTab";

export const CommonTableTabG = renderByPlatform({
  "wild777bet": ImageTab,
  "coco777bet": ImageTab,
}, PCImageTab)
