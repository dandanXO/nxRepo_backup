import {LogoutSection} from "../../../components-bs/LogoutSection";
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
