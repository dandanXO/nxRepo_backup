import cx from "classnames";
import React, {useState} from "react";
import {UserLoginForm} from "../../forms/UserLoginForm";
import {UserRegisterForm} from "../../forms/UserRegisterForm";
import {UserForgetPasswordForm} from "../../forms/UserForgetPasswordForm";
import {LoginModalLogo} from "../../../Logos/LoginModalLogo";
import {IUserLoginStatusSection} from "../../types";
import {TabItem} from "../../../../components/TabItem/env/riojungle/TabItem";
import {Tabs} from "../../../../components/Tabs";
import {ArrowLeft} from "../../../Icons/ArrowLeft";
import {ILoginUIStatusType} from "../../../../../reduxStore/appSlice";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../reduxStore";

export const UserLoginStatusSection = (props: IUserLoginStatusSection) => {

  const loginUIStatusType = useSelector((rootState: RootState) => rootState.app.loginUIStatusType)
  const [switchToLoginOrRegister, setSwitchToLoginOrRegister] = useState<ILoginUIStatusType>(loginUIStatusType);

  return (
    <div className={"flex flex-col"}>

      {switchToLoginOrRegister !== "forget" && (
        <section className={"flex flex-col justify-center items-center mb-5"}>
          <LoginModalLogo/>
        </section>
      )}
      {switchToLoginOrRegister !== "forget" && (
        <section className={"mb-5 flex justify-center items-center"}>
          <Tabs className={"w-full"}>
            <TabItem
              className={"flex-1"}
              name={'Entrar'}
              active={switchToLoginOrRegister === "login"}
              onClick={() => {
                setSwitchToLoginOrRegister("login")
              }}
            />
            <TabItem
              className={"flex-1"}
              name={'Registro'}
              active={switchToLoginOrRegister === "register"}
              onClick={() => {
                setSwitchToLoginOrRegister("register")
              }}
            />
          </Tabs>
        </section>
      )}

      {switchToLoginOrRegister === "forget" && (
        <section className={"mb-5 flex justify-start items-center"}>
          <button
            onClick={() => {
              setSwitchToLoginOrRegister("login")
            }}
            className={cx("font-bold text-white",
              "text-2xl leading-8",
              "flex flex-row justify-center items-center"
            )}
          >
            <ArrowLeft className={"mr-2"}/>
            <span>Esqueça a senha</span>
          </button>
        </section>
      )}

      {(switchToLoginOrRegister === "login" ? (
        <div className={""}>
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
