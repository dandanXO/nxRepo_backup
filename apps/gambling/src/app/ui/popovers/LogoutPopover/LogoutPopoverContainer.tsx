import {renderByUVersion} from "../../utils/renderByUVersion";
import {LogoutPopoverContainer as PLogoutPopoverContainer} from "./env/pernambucana/LogoutPopoverContainer";
import {LogoutPopoverContainer as WLogoutPopoverContainer} from "./env/wild/LogoutPopoverContainer";
import {LogoutPopoverContainer as CLogoutPopoverContainer} from "./env/coco/LogoutPopoverContainer";
import {LogoutPopoverContainer as RioLogoutPopoverContainer} from "./env/riojungle/LogoutPopoverContainer";

export const LogoutPopoverContainer = renderByUVersion({
  "wild777bet": WLogoutPopoverContainer,
  "u1": CLogoutPopoverContainer,
  "u2": RioLogoutPopoverContainer
}, PLogoutPopoverContainer)
