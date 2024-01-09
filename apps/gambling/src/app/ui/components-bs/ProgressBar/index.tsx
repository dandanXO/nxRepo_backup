import { renderByPlatform } from "../../utils/renderByPlatform";

import { ProgressBar as CocoProgressBar } from './env/coco'
import { ProgressBar as RioProgressBar } from './env/riojungle'

export const ProgressBar = renderByPlatform({
  "u1": CocoProgressBar,
  "riojungle777bet": RioProgressBar
}, CocoProgressBar)
