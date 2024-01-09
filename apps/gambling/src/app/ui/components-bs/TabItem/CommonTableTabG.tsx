
import {renderByPlatform} from "../../utils/renderByPlatform";

import {CommonTableTabG as PCImageTab} from "../../pages/InvitePage/InviteRecordInfoTabSection/env/pernambucana/CommonTableTabG";
import {ImageTab} from "./ImageTab";

export const CommonTableTabG = renderByPlatform({
  "wild777bet": ImageTab,
  "u1": ImageTab,
}, PCImageTab)
