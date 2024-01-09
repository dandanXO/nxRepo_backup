import {renderByUVersion} from "../../../utils/renderByUVersion";
import {responsive as CocoResponsive} from "./env/coco/responsive";
import {responsive as RiojungleResponsive} from "./env/riojungle/responsive";

export const responsive = renderByUVersion({
  "u1": CocoResponsive,
  "u2": RiojungleResponsive,
}, CocoResponsive)
