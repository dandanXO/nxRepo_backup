import {renderByUVersion} from "../../utils/renderByUVersion";
import {FavoriteSection as PFavoriteSection} from "./env/pernambucana/FavoriteSection";
import {FavoriteSection as WFavoriteSection} from "./env/wild/FavoriteSection";
import {FavoriteSection as CFavoriteSection} from "./env/u1/FavoriteSection";
import {FavoriteSection as RFavoriteSection} from "./env/u2/FavoriteSection";

export const FavoriteSection = renderByUVersion({
  "wild777bet": WFavoriteSection,
  "u1": CFavoriteSection,
  "u2": RFavoriteSection,
// }, PFavoriteSection)
}, CFavoriteSection)
