import { renderByUVersion } from "../../utils/renderByUVersion";

import { ProgressBar as CocoProgressBar } from './env/u1'
import { ProgressBar as RioProgressBar } from './env/u2'

export const ProgressBar = renderByUVersion({
  "u1": CocoProgressBar,
  "u2": RioProgressBar
}, CocoProgressBar)
