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
import {IOpenNotificationWithIcon} from "../../../../layers/pageTemplate";
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
import {PhonePrefix} from "../../PhonePrefix";
import {useGetDeviceId} from "../../../../hooks/useGetDeviceId";


const onValidateCaptchaInput = (data: string, setCaptchaInput: any) => {
  if(data !== "") {
    setCaptchaInput({
      data,
      isValidation: true,
      errorMessage: "",
    });
  } else {
    setCaptchaInput({
      data,
      isValidation: false,
      errorMessage: "por favor insira o código de verificação",
    })
  }

  if(data !== "") {
    return true;
  } else {
    return false;
  }
}
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


  const [isChecked, setIsChecked] = useState(false);

  const toggleCheck = () => {
    setIsChecked(!isChecked);
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // NOTO: 2023101601 / test1234
  // refactor:
  const [phoneInput, setPhoneInput] = useState<InputValue<string>>({
    data: '',
    isValidation: true,
    errorMessage: '',
  });

  const [passwordInput, setPasswordInput] = useState<InputValue<string>>({
    data: '',
    isValidation: true,
    errorMessage: '',
  });

  const [captchaInput, setCaptchaInput] = useState<InputValue<string>>({
    data: '',
    isValidation: true,
    errorMessage: '',
  });

  const [triggerForgetpassword] = useForgetPasswordMutation();
  const [triggerSendForgetPasswordSMSCode] = useSendForgetPasswordSMSCodeMutation();
  // const onFormInputChange = (inputItems: Partial<PostRegisterRequest>) => {
  //   const loginFormData = new LoginFormData({
  //     appChannel: "",
  //     appPackageName: "",
  //     appVersion: "",
  //     deviceId: "",
  //     deviceModel: "",
  //     deviceVersion: "",
  //     password: "",
  //     phone: "",
  //     sysLanguage: null,
  //     sysTimezone: null,
  //   });
  //   loginFormData.phone = inputItems.phone || "";
  //
  //   validate(loginFormData).then((errors => {
  //     if(errors.length > 0) {
  //       console.log(errors);
  //     } else {
  //       console.log()
  //     }
  //   }))
  // }

  const {deviceId} = useGetDeviceId(phoneInput.data, "forget");
  console.log("[useGetDeviceId] forget.deviceId", deviceId);

  const {onFormConfirm} = useForm({
    onFormConfirm: () =>  {
      if(!onValidatePhoneInput(phoneInput.data, setPhoneInput) ||
        !onValidateCaptchaInput(captchaInput.data, setCaptchaInput) ||
        !onValidatePasswordInput(passwordInput.data, setPasswordInput)
      ) {
        return;
      }

      triggerForgetpassword({
        phone: phoneInput.data,
        password: passwordInput.data,
        "verifyCode": captchaInput.data,
        "appChannel": "mobile",
        "deviceId": deviceId,
        "deviceModel": "WEB",
        "deviceVersion": "WEB",
        "sysTimezone": null,
        "sysLanguage": null,
        "appPackageName": environment.appPackageName,
        "appVersion": environment.appVersion,
      }).then((response) => {
        // console.log("triggerRegister-data", response)
        if(!(response as any).error) {
          setLoginLocalStorage({
            token: (response as any).data?.data?.token,
            userInfo: (response as any).data?.data?.user_info,
            kPhone: phoneInput.data,
            kPassword: passwordInput.data,
            amount: 100,
            ip: (response as any).data?.data?.connection?.ip,
          })

          const url = (response as any).data?.data?.connection?.ip;
          const token = (response as any).data?.data?.token;
          if(url && token) connect(url, token)
          props.confirmToRegister();
        }
      }).catch((error) => {
        console.error(error);
      })
    }
  })


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
         onChange={(event: any) => {
            onValidatePhoneInput(event.target.value, setPhoneInput)
         }}
      />

      <div style={{ position: 'relative' }}>
        <Input
          type={"text"}
          prefix={<SecuritySvg className={"mr-1"}/>}
          suffix={
            <SendSMSCodeButton
              valid={phoneInput.data.length > 0 && phoneInput.isValidation || false}
              onClick={(isCounting) => {
                if(isCounting) return;
                if(onValidatePhoneInput(phoneInput.data, setPhoneInput)) {
                  triggerSendForgetPasswordSMSCode({
                    appPackageName: environment.appPackageName,
                    deviceId: AppLocalStorage.getItem(AppLocalStorageKey.deviceId) || "",
                    phone: phoneInput.data,
                    verifyType: 1
                  });
                }
              }}/>
          }
          placeholder={"Código de verificação"}
          value={captchaInput.data}
          validation={captchaInput.isValidation}
          errorMessage={captchaInput.errorMessage}
          onChange={(event: any) => {
            onValidateCaptchaInput(event.target.value, setCaptchaInput);
          }}
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
        onChange={(event: any) => {
          if(onValidatePasswordInput(event.target.value, setPasswordInput)) {
            setPasswordInput({
              data: event.target.value,
              isValidation: true,
              errorMessage: "",
            });
          } else {
            setPasswordInput({
              data: event.target.value,
              isValidation: false,
              errorMessage: "Senha (4-12 letras e números)",
            })
          }

        }}
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
