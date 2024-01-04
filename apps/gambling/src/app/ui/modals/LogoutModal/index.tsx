import styled from "styled-components";
import {LogoutSection} from "../../components-bs/UserLogoutSection";
import cx from "classnames";
import { LogoutPopoverContainer } from "../../popovers/LogoutPopover/LogoutPopoverContainer";
import {BaseModal} from "../BaseModal";

export type ILogoutModal = {

}
export const LogoutModal = (props:ILogoutModal) => {

  return (
    <BaseModal>
      <LogoutPopoverContainer>
        <LogoutSection />
      </LogoutPopoverContainer>
    </BaseModal>

  )
}

