import {renderByPlatform} from "../../../utils/renderByPlatform";
import {LogoutPopoverContainer as PLogoutPopoverContainer} from "./pernambucana/LogoutPopoverContainer";
import {LogoutPopoverContainer as WLogoutPopoverContainer} from "./wild/LogoutPopoverContainer";
import {LogoutPopoverContainer as CLogoutPopoverContainer} from "./coco/LogoutPopoverContainer";

export const LogoutPopoverContainer = renderByPlatform({
  "wild777bet": WLogoutPopoverContainer,
  "coco777bet": CLogoutPopoverContainer,
}, PLogoutPopoverContainer)
