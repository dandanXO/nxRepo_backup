import styled from "styled-components";
import {CloseCircleOutlined} from "@ant-design/icons";
import {UserLoginStatusSection} from "../../components/UserLoginStatusSection";
import {IOpenNotificationWithIcon} from "../../pageTemplate";


const Container = styled.div`
  background: var(--assistant);
  //background: rgba(9,11,15,1);
  //box-shadow: 0 0 .1rem #27563A !important;

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

export type IUserLoginStatusModal = {
  setIsLogin: (login: boolean) => void;
  close: () => void;
  openNotificationWithIcon: (props: IOpenNotificationWithIcon) => void;
}
export const UserLoginStatusModal = (props:IUserLoginStatusModal) => {
  return (
    <div className={"z-[999] fixed left-0 top-0 right-0 bottom-0 flex flex-col flex justify-center items-center w-full h-full"}>

      <Container className={"p-2 rounded-2xl max-w-[320px] box-content"}>
        <UserLoginStatusSection
          confirmToLogin={() => {
            props.setIsLogin(true);
            props.close();
          }}
          confirmToRegister={() => {
            props.setIsLogin(false)
            props.close();
          }}
          openNotificationWithIcon={props.openNotificationWithIcon}
        />
        <section className={"mt-2 flex flex-col justify-center items-center"}>
          <button>
            <CloseCircleOutlined className={"text-white text-xl"} onClick={() => {
              props.close();
            }}/>
          </button>
        </section>
      </Container>

    </div>
  )
}
