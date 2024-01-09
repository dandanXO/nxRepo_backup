import { renderByUVersion } from "../../utils/renderByUVersion";

import { ProgressBar as CocoProgressBar } from './env/coco'
import { ProgressBar as RioProgressBar } from './env/riojungle'

export const ProgressBar = renderByUVersion({
  "u1": CocoProgressBar,
  "u2": RioProgressBar
}, CocoProgressBar)
