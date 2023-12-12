import { renderByPlatform } from "../../utils/renderByPlatform";

import { ProgressBar as CocoProgressBar } from './env/coco'

export const ProgressBar = renderByPlatform({
  "coco777bet": CocoProgressBar
}, CocoProgressBar)
