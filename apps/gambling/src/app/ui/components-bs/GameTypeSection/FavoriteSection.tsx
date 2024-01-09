import {renderByPlatform} from "../../utils/renderByPlatform";
import {FavoriteSection as PFavoriteSection} from "./env/pernambucana/FavoriteSection";
import {FavoriteSection as WFavoriteSection} from "./env/wild/FavoriteSection";
import {FavoriteSection as CFavoriteSection} from "./env/coco/FavoriteSection";
import {FavoriteSection as RFavoriteSection} from "./env/riojungle/FavoriteSection";

export const FavoriteSection = renderByPlatform({
  "wild777bet": WFavoriteSection,
  "u1": CFavoriteSection,
  "u2": RFavoriteSection,
// }, PFavoriteSection)
}, CFavoriteSection)
