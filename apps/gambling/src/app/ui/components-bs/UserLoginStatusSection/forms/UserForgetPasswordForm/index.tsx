import {PhoneSvg} from "../../../../components/Icons/PhoneSvg";
import {KeySvg} from "../../../../components/Icons/KeySvg";
import {ConfirmButton} from "../../../../components/Buttons/ConfirmButton";
import {CheckCircleOutlined, EyeInvisibleOutlined, EyeOutlined} from "@ant-design/icons";
import useBreakpoint from "../../../../hooks/useBreakpoint";
import {Input as DesktopInput, Input, InputValue} from "../../../../components/Inputs/Input";
import {MobileInput} from "../../../../components/Inputs/MobileInput";
import {useEffect, useState} from "react";
import {useForm} from "../../../../hooks/useForm";
import {
  useForgetPasswordMutation,
  useRegisterMutation,
  useSendForgetPasswordSMSCodeMutation
} from "../../../../../external";
import {setLoginLocalStorage} from "../../../../../persistant/setLoginLocalStorage";
import {promiseHandler} from "../../../../../gateway/promiseHanlder";
import {IOpenNotificationWithIcon} from "../../../../pageTemplate";
// import {LoginFormData} from "./UserLoginForm/LoginFormData";
import {validate} from "class-validator";
import {onValidatePhoneInput, onValidatePasswordInput} from "../UserLoginForm"

import {environment} from "../../../../../../environments/environment"
import {SecuritySvg} from "../../../../components/Icons/SecuritySvg";
import {connect} from "../../../../../gateway/socket";
import {AppLocalStorage} from "../../../../../persistant/localstorage";
import styled from "styled-components";
import {AppLocalStorageKey} from "../../../../../persistant/AppLocalStorageKey";
import {HidableEyeSvg} from "../../../../components/Icons/HidableEyeSvg";
import {PhonePrefix} from "../../components/PhonePrefix";
import {useGetDeviceId} from "../../../../hooks/useGetDeviceId";
import {useUserForgetPasswordForm} from "../../hooks/useUserForgetPasswordForm";


export type IUserForgetPasswordForm = {
  confirmToRegister: () => void;
  openNotificationWithIcon: (props: IOpenNotificationWithIcon) => void;
}

const StyledSendSMSCodeButton = styled.button`

`
{/*Enviar*/}
{/*Esquerda 120s*/}
{/*Reenviar*/}
type ICountingButtonType = "ready" | "counting" | "finished";
type IProps = {
  onClick: (isCounting: boolean) => void;
  valid: boolean;
}
const SendSMSCodeButton = (props: IProps) => {
  const [state, setState] = useState<ICountingButtonType>("ready")
  const [secondState, setSecondState] = useState<number>(120)
  let strState

  useEffect(() => {
    let countingDownID: any;

    if(state === "counting") {
      if(countingDownID) {
        clearTimeout(countingDownID);
      }
      countingDownID = setTimeout(() => {
        if(secondState > 0) {
          setSecondState(secondState - 1)
        } else if(secondState === 0){
          clearTimeout(countingDownID);
          setState("finished");
          setSecondState(120);
        }
      }, 1000)
    }
    return () => {
      if(state === "counting") {
        clearTimeout(countingDownID);
      }
    }
  }, [state, secondState])

  if(state === "ready") {
    strState = "Enviar"
  } else if(state === "counting") {
    // strState = "Esquerda " + secondState
    strState = secondState + "s"
  } else {
    strState = "Reenviar"
  }
  return (
    <StyledSendSMSCodeButton
      className="px-2 py-0 rounded-2xl bg-gradient-to-b from-[var(--secondary-main-from)] to-[var(--secondary-main-to)] text-[var(--white)]"
      onClick={() => {
        props.onClick && props.onClick(state === "counting");
        if(!props.valid) return;
        if(state === "ready") {
          setState("counting");
        } else if(state === "finished") {
          setState("counting");
        }
    }}>{strState}</StyledSendSMSCodeButton>
  )
}


export const UserForgetPasswordForm = (props: IUserForgetPasswordForm) => {
  const {isMobile} = useBreakpoint();
  const Input = isMobile ? MobileInput : DesktopInput;

  const {
    // Phone
    phoneInput,
    onChangePhoneInput,

    // Captcha
    captchaInput,
    onChangeCaptchaInput,

    // Password
    isPasswordVisible,
    togglePasswordVisibility,
    passwordInput,
    onChangePasswordInput,

    // SMS Code
    onClickSendSMSCode,
    isValidSMSCode,

    // Form
    onFormConfirm,
  } = useUserForgetPasswordForm({
    confirmToRegister: props.confirmToRegister
  });


  return (
    <section className={"flex flex-col"}>

      <Input
        type={"number"}
        prefix={
          <>
            <PhoneSvg fill={"#6c7083"} className={"mr-1"}/>
            <PhonePrefix/>
          </>
        }
         placeholder={"Tu nùmero de celular"}
         value={phoneInput.data}
         validation={phoneInput.isValidation}
         errorMessage={phoneInput.errorMessage}
         onChange={onChangePhoneInput}
      />

      <div style={{ position: 'relative' }}>
        <Input
          type={"text"}
          prefix={<SecuritySvg className={"mr-1"}/>}
          suffix={
            <SendSMSCodeButton
              valid={isValidSMSCode}
              onClick={onClickSendSMSCode}/>
          }
          placeholder={"Código de verificação"}
          value={captchaInput.data}
          validation={captchaInput.isValidation}
          errorMessage={captchaInput.errorMessage}
          onChange={onChangeCaptchaInput}
        />
      </div>

      <Input
        type={isPasswordVisible ? 'text' : 'password'}
        prefix={<KeySvg fill={"#6c7083"} className={"mr-1"}/>}
        suffix={(
          <div
            className="password-toggle"
            onClick={togglePasswordVisibility}
          >
            <HidableEyeSvg hide={!isPasswordVisible}/>
          </div>
        )}
        placeholder={"Senha (4-12 letras e números)"}
        value={passwordInput.data}
        validation={passwordInput.isValidation}
        errorMessage={passwordInput.errorMessage}
        onChange={onChangePasswordInput}
      />

      <section className={"flex flex-col"}>
        <ConfirmButton
          className="!w-full my-2 text-sm md:text-base"
          onClick={() => onFormConfirm()}
        >Redefinir senha</ConfirmButton>
      </section>

    </section>
  )
}
