import styled from "styled-components";
import {LogoutSection} from "../../components-bs/UserLogoutSection";
import cx from "classnames";
import { LogoutPopoverContainer } from "../../popovers/LogoutPopover/LogoutPopoverContainer";


const LogoutSectionContainer = styled.div.attrs((props) => ({
  className: cx("z-[1005] bg-[rgba(0,0,0,0.5)] fixed left-0 top-0 right-0 bottom-0 flex flex-col flex justify-center items-center w-full h-full", props.className)
}))<{
  className?: string;
}>``


export type ILogoutModal = {

}
export const LogoutModal = (props:ILogoutModal) => {

  return (
    <LogoutSectionContainer>
      <LogoutPopoverContainer>
        <LogoutSection />
      </LogoutPopoverContainer>
    </LogoutSectionContainer>

  )
}

