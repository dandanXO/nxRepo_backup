import {renderByPlatform} from "../../utils/renderByPlatform";
import {FavoriteSection as PFavoriteSection} from "./env/pernambucana/FavoriteSection";
import {FavoriteSection as WFavoriteSection} from "./env/wild/FavoriteSection";
import {FavoriteSection as CFavoriteSection} from "./env/coco/FavoriteSection";

export const FavoriteSection = renderByPlatform({
  "wild777bet": WFavoriteSection,
  "coco777bet": CFavoriteSection,
// }, PFavoriteSection)
}, CFavoriteSection)
