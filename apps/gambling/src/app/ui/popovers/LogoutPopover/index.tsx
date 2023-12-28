import {LogoutSection} from "../../components-bs/UserLogoutSection";
import {LogoutPopoverContainer} from "./LogoutPopoverContainer";

type ILogoutPopover = {
  close: () => void;
}

export const LogoutPopover = (props: ILogoutPopover) => {

  return (
    <LogoutPopoverContainer className={""}>
      <LogoutSection />
    </LogoutPopoverContainer>
  )
}
