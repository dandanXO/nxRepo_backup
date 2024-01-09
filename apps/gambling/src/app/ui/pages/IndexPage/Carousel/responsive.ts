import {renderByPlatform} from "../../../utils/renderByPlatform";
import {responsive as CocoResponsive} from "./env/coco/responsive";
import {responsive as RiojungleResponsive} from "./env/riojungle/responsive";

export const responsive = renderByPlatform({
  "u1": CocoResponsive,
  "riojungle777bet": RiojungleResponsive,
}, CocoResponsive)
