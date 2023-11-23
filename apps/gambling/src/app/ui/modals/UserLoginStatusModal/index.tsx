
import {UserLoginStatusSection} from "../../components-bs/UserLoginStatusSection";
import {IOpenNotificationWithIcon} from "../../pageTemplate";
import useBreakpoint from "../../hooks/useBreakpoint";
import {renderByPlatform} from "../../utils/renderByPlatform";

import {Container as PContainer} from "./env/pernambucana/Container";
import {Container as WContainer} from "./env/wild/Container";
import {Container as CContainer} from "./env/coco/Container";
import {useEffect} from "react";
import {CloseICON} from "../../components/Icons/CloseICON";

const Container = renderByPlatform({
  "wild777bet": WContainer,
  "coco777bet": CContainer,
}, PContainer)

export type IUserLoginStatusModal = {
  setIsLogin: (login: boolean) => void;
  close: () => void;
  showCloseButton?: boolean;
  openNotificationWithIcon: (props: IOpenNotificationWithIcon) => void;
}

export const UserLoginStatusModal = (props:IUserLoginStatusModal) => {
  const isShowCloseButton = props.showCloseButton == undefined ? true : props.showCloseButton;
  const {isMobile} = useBreakpoint();


  return (
    <div
      className={"bg-[rgba(0,0,0,.6)] z-[999] fixed left-0 top-0 right-0 bottom-0 flex flex-col flex justify-center items-center w-full h-full"}
      onClick={() => {
        // NOTE: 手機版用戶會誤點
        !isMobile && props.close()
      }}
    >

      <Container className={"p-4 rounded-2xl max-w-[340px]"} onClick={(event: any) => {
        event.stopPropagation();
      }}>

        {isShowCloseButton && (
          <section className={"flex flex-col justify-center items-end"}>
            <button onClick={() => {
              props.close();
            }}>
              <CloseICON/>
            </button>
          </section>
        )}

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

        {/*{isShowCloseButton && (*/}
        {/*  <section className={"mt-2 flex flex-col justify-center items-center"}>*/}
        {/*    <button>*/}
        {/*      <CloseCircleOutlined className={"text-white text-xl"} onClick={() => {*/}
        {/*        props.close();*/}
        {/*      }}/>*/}
        {/*    </button>*/}
        {/*  </section>*/}
        {/*)}*/}

      </Container>

    </div>
  )
}
