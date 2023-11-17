import cx from "classnames";
import {useState} from "react";
import {UserLoginForm} from "./forms/UserLoginForm";
import {UserRegisterForm} from "./forms/UserRegisterForm";
import {IOpenNotificationWithIcon} from "../../pageTemplate";
import {UserForgetPasswordForm} from "./forms/UserForgetPasswordForm";
import {environment} from "../../../../environments/environment";

export type IUserLoginStatusSection = {
  // onClickToLogin: () => void;
  // onClickToRegister: () => void;
  confirmToLogin: () => void;
  confirmToRegister: () => void;
  openNotificationWithIcon: (props: IOpenNotificationWithIcon) => void;
  showPlatformLogo?: boolean;
}


export const UserLoginStatusSection = (props: IUserLoginStatusSection) => {
  const [switchToLoginOrRegister, setSwitchToLoginOrRegister] = useState<"login"|"register"|"forget">("register");

  return (
    <div>
      <section className={"mb-2 flex justify-center items-center"}>
        {switchToLoginOrRegister !== "forget" && (
          <div className="flex" style={{ width: "350px" }}>
            <button
              onClick={() => {
                setSwitchToLoginOrRegister("login")
              }}
              className={cx("flex-1 font-bold pb-2 ml-7 mr-7", {
                // "border-b-short": switchToLoginOrRegister === "login", // 新增的类
              })}
            >
              <span className={cx("pb-2",{
                "text-main-secondary-main": switchToLoginOrRegister === "login",
                "text-white": switchToLoginOrRegister !== "login",
                "border-b-2": switchToLoginOrRegister === "login",
                "border-b-solid": switchToLoginOrRegister === "login",
                "border-b-main-secondary-main": switchToLoginOrRegister === "login",
              })}>Entrar</span>
            </button>

            <button
              onClick={() => {
                setSwitchToLoginOrRegister("register")
              }}
              className={cx("flex-1 font-bold pb-2 mr-7 ml-7",{

              })}
            >
              <span className={cx("pb-2", {
                "text-main-secondary-main": switchToLoginOrRegister === "register",
                "text-white": switchToLoginOrRegister !== "register",
                "border-b-2": switchToLoginOrRegister === "register",
                "border-bottom-width-2": switchToLoginOrRegister === "register",
                "border-b-solid": switchToLoginOrRegister === "register",
                "border-b-main-secondary-main": switchToLoginOrRegister === "register",
              })}>Cadastre-Se</span>
            </button>
          </div>
        )}

        {switchToLoginOrRegister === "forget" && (
          <button
            onClick={() => {
              setSwitchToLoginOrRegister("register")
            }}
            className={cx("font-bold pb-2",{
              "text-main-secondary-main": switchToLoginOrRegister === "forget",
              "border-b-2": switchToLoginOrRegister === "forget",
              "border-b-solid": switchToLoginOrRegister === "forget",
              "border-b-main-secondary-main": switchToLoginOrRegister === "forget",
            })}
          >
            Esqueça a senha
          </button>
        )}
      </section>

      {(switchToLoginOrRegister === "login" ? (
        <div>
          <section className={"flex flex-col justify-center items-center mb-4"}>
            {/*<img className={"mb-2"} alt={"website-small-logo"} src={`assets/${environment.assetPrefix}/logo_web.png`}/>*/}
            <img className={"mb-2"} alt={"website-small-logo"} src={`assets/${environment.assetPrefix}/LOGO.png`}/>
            {props.showPlatformLogo && (
              <span className={"text-white text-sm"}>{environment.platformName}</span>
            )}
          </section>
          <UserLoginForm
            confirmToLogin={() => {
              props.confirmToLogin()
            }}
            openNotificationWithIcon={props.openNotificationWithIcon}
            onSwitchToForgetPassword={() => {
              setSwitchToLoginOrRegister("forget")
            }}
          />
        </div>
      ) : switchToLoginOrRegister === "register" ? (
        <div>
          <UserRegisterForm
            confirmToRegister={() => {
              props.confirmToLogin()
            }}
            openNotificationWithIcon={props.openNotificationWithIcon}
          />
        </div>
      ) : (
        <div>
          <UserForgetPasswordForm
            confirmToRegister={() => {
              props.confirmToLogin()
            }}
            openNotificationWithIcon={props.openNotificationWithIcon}
          />
        </div>
      ))}
    </div>
  )





}
