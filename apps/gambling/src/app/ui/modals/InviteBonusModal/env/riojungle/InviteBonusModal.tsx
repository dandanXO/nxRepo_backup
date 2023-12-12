import useBreakpoint from "../../../../hooks/useBreakpoint";
import {MobileInviteBonusModal} from "./MobileInviteBonusModal";
import {TabletInviteBonusModal} from "./TabletInviteBonusModal";
import {DesktopInviteBonusModal} from "./DesktopInviteBonusModal";
import {renderByRWD} from "../../../../hooks/renderByRWD";

export const InviteBonusModal = () => {
  const device = useBreakpoint();

  return renderByRWD( {
    mobile: <MobileInviteBonusModal/>,
    tablet: <TabletInviteBonusModal/>,
    desktop: <DesktopInviteBonusModal/>,
  }, device)
}
