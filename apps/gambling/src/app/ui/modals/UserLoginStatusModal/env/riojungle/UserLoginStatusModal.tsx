
import {UserLoginStatusSection} from "../../../../components-bs/UserLoginStatusSection";
import {CloseICON} from "../../../../components-bs/env/riojungle/CloseICON";
import {Container} from "../../Container";
import {IUserLoginStatusModal} from "../../types";

export const UserLoginStatusModal = (props:IUserLoginStatusModal) => {

  return (
    <div
      className={"bg-[rgba(0,0,0,.6)] z-[1005] fixed left-0 top-0 right-0 bottom-0 flex flex-col justify-center items-center px-5 w-full h-full"}
      // NOTE: onclick 改用，避免拖拉文字到modal外層會直接關閉
      onMouseDown={() => {
        // NOTE: 手機版用戶會誤點
        // !isMobile && props.close()
      }}
    >
      <Container
        className={"w-full sm:w-[396px] px-4 pb-4 rounded-2xl"}
        onMouseDown={(event: any) => {
          event.stopPropagation();
        }}
      >
        <section className={"w-full flex flex-row justify-end items-center"}>
          <button onClick={() => {
            props.close();
          }}>
            <CloseICON/>
          </button>
        </section>

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

      </Container>

    </div>
  )
}
