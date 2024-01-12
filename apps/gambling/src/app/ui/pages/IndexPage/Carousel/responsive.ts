import {renderByUVersion} from "../../../utils/renderByUVersion";
import {responsive as CocoResponsive} from "./env/u1/responsive";
import {responsive as RiojungleResponsive} from "./env/u2/responsive";

export const responsive = renderByUVersion({
  "u1": CocoResponsive,
  "u2": RiojungleResponsive,
}, CocoResponsive)
