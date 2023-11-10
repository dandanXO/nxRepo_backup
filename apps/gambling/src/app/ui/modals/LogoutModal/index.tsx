import styled from "styled-components";
import {CloseCircleOutlined} from "@ant-design/icons";
import {UserLoginStatusSection} from "../../components/UserLoginStatusSection";
import {LogoutSection} from "../../components/LogoutSection";


const Container = styled.div`
  background: rgba(9,11,15,.93);
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

export type ILogoutModal = {

}
export const LogoutModal = (props:ILogoutModal) => {

  return (
    <div className={"z-[999] fixed left-0 top-0 right-0 bottom-0 flex flex-col flex justify-center items-center w-full h-full"}>
      <LogoutSection className={"bg-[var(--assistant)] p-4 rounded-2xl"}/>
    </div>
  )
}
