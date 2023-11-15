import {CloseCircleOutlined} from "@ant-design/icons";
import {UserLoginStatusSection} from "../../components-bs/UserLoginStatusSection";
import {IOpenNotificationWithIcon} from "../../pageTemplate";
import {environment} from "../../../../environments/environment";
import {PernambucanaContainer} from "./env/PernambucanaContainer";
import {CocoContainer} from "./env/CocoContainer";


const Container = environment.assetPrefix === "coco777bet" ? CocoContainer : PernambucanaContainer;


export type IUserLoginStatusModal = {
  setIsLogin: (login: boolean) => void;
  close: () => void;
  showCloseButton?: boolean;
  openNotificationWithIcon: (props: IOpenNotificationWithIcon) => void;
}
export const UserLoginStatusModal = (props:IUserLoginStatusModal) => {
  const isShowCloseButton = props.showCloseButton == undefined ? true : props.showCloseButton;
  return (
    <div
      className={"bg-[rgba(0,0,0,.6)] z-[999] fixed left-0 top-0 right-0 bottom-0 flex flex-col flex justify-center items-center w-full h-full"}
      onClick={() => {
        // NOTE: 用戶會誤點
        // props.close()
      }}
    >

      <Container className={"p-4 rounded-2xl max-w-[320px]"} onClick={(event) => {
        event.stopPropagation();
      }}>
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

        {isShowCloseButton && (
          <section className={"mt-2 flex flex-col justify-center items-center"}>
            <button>
              <CloseCircleOutlined className={"text-white text-xl"} onClick={() => {
                props.close();
              }}/>
            </button>
          </section>
        )}

      </Container>

    </div>
  )
}
