import cx from "classnames";
import React, {useState} from "react";
import {UserLoginForm} from "../../forms/UserLoginForm";
import {UserRegisterForm} from "../../forms/UserRegisterForm";
import {UserForgetPasswordForm} from "../../forms/UserForgetPasswordForm";
import {environment} from "../../../../../../environments/environment";
import {LoginModalLogo} from "../../../theme/Logos/LoginModalLogo";
import {IUserLoginStatusSection} from "../../types";
import {TabItem} from "../../../../components/TabItem/env/riojungle/TabItem";
import {Tabs} from "../../../../components/Tabs";

export const UserLoginStatusSection = (props: IUserLoginStatusSection) => {
  const [switchToLoginOrRegister, setSwitchToLoginOrRegister] = useState<"login"|"register"|"forget">("login");

  return (
    <div className={"flex flex-col"}>

      <section className={"flex flex-col justify-center items-center mb-5"}>
        <LoginModalLogo/>
      </section>

      <section className={"mb-5 flex justify-center items-center"}>
        {switchToLoginOrRegister !== "forget" && (
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
              name={'Cadastre-Se'}
              active={switchToLoginOrRegister === "register"}
              onClick={() => {
                setSwitchToLoginOrRegister("register")
              }}
            />
          </Tabs>
        )}

        {switchToLoginOrRegister === "forget" && (
          <button
            onClick={() => {
              setSwitchToLoginOrRegister("register")
            }}
            className={cx("font-bold pb-2",{
              "text-main-secondary-main": switchToLoginOrRegister === "forget",
            })}
          >
            Esqueça A Senha?
          </button>
        )}
      </section>


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
