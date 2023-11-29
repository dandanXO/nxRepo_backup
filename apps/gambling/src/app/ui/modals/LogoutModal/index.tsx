import styled from "styled-components";
import {CloseCircleOutlined} from "@ant-design/icons";
import {UserLoginStatusSection} from "../../components-bs/UserLoginStatusSection";
import {LogoutSection} from "../../components-bs/LogoutSection";
import cx from "classnames";


const Container = styled.div`
  background: rgba(255,255,255,0.5);
  //background: rgba(9,11,15,1);
  box-shadow: 0 0 .1rem #000 !important;

  overflow: hidden;
  position: relative;
  z-index: 1;

  //&:before {
  //  content: "";
  //  width: 4rem;
  //  height: 4rem;
  //  background: #1DA668;
  //  position: absolute;
  //  z-index: -1;
  //  top: -20%;
  //  left: -20%;
  //  border-radius: 100px;
  //  filter: blur(1.5rem);
  //  opacity: .3;
  //}
`

const LogoutSectionContainer = styled.div.attrs((props) => ({
  className: cx("z-[1000] fixed left-0 top-0 right-0 bottom-0 flex flex-col flex justify-center items-center w-full h-full", props.className)
}))<{
  className?: string;
}>``


export type ILogoutModal = {

}
export const LogoutModal = (props:ILogoutModal) => {

  return (
    <LogoutSectionContainer className={"bg-[rgba(0,0,0,0.5)]"}>
      <LogoutSection className={"border-[var(--stroke-modal)] border-[1px] rounded-md bg-gradient-to-b from-[var(--background-modal-from)] to-[var(--background-modal-to)] p-4 "}/>
    </LogoutSectionContainer>
  )
}

