import {renderByPlatform} from "../../utils/renderByPlatform";
import {LogoutPopoverContainer as PLogoutPopoverContainer} from "./env/pernambucana/LogoutPopoverContainer";
import {LogoutPopoverContainer as WLogoutPopoverContainer} from "./env/wild/LogoutPopoverContainer";
import {LogoutPopoverContainer as CLogoutPopoverContainer} from "./env/coco/LogoutPopoverContainer";
import {LogoutPopoverContainer as RioLogoutPopoverContainer} from "./env/riojungle/LogoutPopoverContainer";

export const LogoutPopoverContainer = renderByPlatform({
  "wild777bet": WLogoutPopoverContainer,
  "coco777bet": CLogoutPopoverContainer,
  "riojungle777bet": RioLogoutPopoverContainer
}, PLogoutPopoverContainer)
