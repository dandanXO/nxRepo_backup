import { renderByPlatform } from "../../utils/renderByPlatform";

import { ProgressBar as CocoProgressBar } from './env/coco'
import { ProgressBar as RioProgressBar } from './env/riojungle'

export const ProgressBar = renderByPlatform({
  "coco777bet": CocoProgressBar,
  "riojungle777bet": RioProgressBar
}, CocoProgressBar)
