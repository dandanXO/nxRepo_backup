import {PhoneSvg} from "../PhoneSvg";
import {KeySvg} from "../KeySvg";
import {ConfirmButton} from "../../../components/Buttons/ConfirmButton";
import {CheckCircleOutlined} from "@ant-design/icons";
import useBreakpoint from "../../../hooks/useBreakpoint";
import {Input as DesktopInput, Input, InputValue} from "../../../components/Inputs/Input";
import {MobileInput} from "../../../components/Inputs/MobileInput";
import {useState} from "react";
import {useForm} from "../../../hooks/useForm";
import {
  useForgetPasswordMutation,
  useRegisterMutation,
  useSendForgetPasswordSMSCodeMutation
} from "../../../../external";
import {setLoginLocalStorage} from "../../../../persistant/setLoginLocalStorage";
import {promiseHandler} from "../../../../gateway/promiseHanlder";
import {IOpenNotificationWithIcon} from "../../../pageTemplate";
import {PostRegisterRequest} from "../../../../external/RegisterEndpoint";
// import {LoginFormData} from "./UserLoginForm/LoginFormData";
import {validate} from "class-validator";
import {onValidatePhoneInput, onValidatePasswordInput} from "./UserLoginForm"

import {environment} from "../../../../../environments/environment"
import {SecuritySvg} from "../SecuritySvg";
import {connect} from "../../../../gateway/socket";
import {AppLocalStorage} from "../../../../persistant/localstorage";
import styled from "styled-components";


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

const SendSMSCodeButton = styled.button`
  position: absolute;
  width: 70px;
  height: 53px;
  background: var(--main-primary-main);
  border-radius: 0 25px 25px 0; /* 左侧半径为0，其他圆角为25px */
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // cursor: pointer;
  // margin-top: -3px;
`


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
        "deviceId": AppLocalStorage.getItem("deviceId") || "",
        "deviceModel": "WEB",
        "deviceVersion": "WEB",
        "sysTimezone": null,
        "sysLanguage": null,
        "appPackageName": environment.appPackageName,
        "appVersion": environment.appVersion,
      }).then((response) => {
        console.log("triggerRegister-data", response)
        promiseHandler.then(response, () => {
          setLoginLocalStorage({
            token: (response as any).data.data.token,
            userInfo: (response as any).data.data.user_info,
            kPhone: phoneInput.data,
            kPassword: passwordInput.data,
            amount: 100,
            ip: (response as any).data.data.connection.ip,
          })

          const url = (response as any).data.data.connection.ip;
          const token = (response as any).data.data.token;
          if(url) connect(url, token);


          props.confirmToRegister();
        }, props.openNotificationWithIcon);
      }).catch((error) => {
        alert(error)
      })
    }
  })


  return (
    <section className={"flex flex-col"}>

      <Input
        type={"number"}
        prefix={
          <>
            {/*<PhoneSvg fill={"#6c7083"} className={"mr-2 w-[24px] h-[24px]"}/>*/}
            <PhoneSvg fill={"#6c7083"} className={"mr-2 w-[14px] h-[20px]"}/>
            <span className={"text-[#01FF52] mr-2"}>+55</span>
          </>
        }
         placeholder={"Tu nùmero de celular"}
         value={phoneInput.data}
         validation={phoneInput.isValidation}
         errorMessage={phoneInput.errorMessage}
         onChange={(event) => {
            onValidatePhoneInput(event.target.value, setPhoneInput)
         }}
      />

      <div style={{ position: 'relative' }}>
        <Input
          type={"text"}
          // prefix={<SecuritySvg fill={"#6c7083"} className={"mr-2 w-[24px] h-[24px]"}/>}
          prefix={<SecuritySvg fill={"#6c7083"} className={"mr-2 w-[20px] h-[20px]"}/>}
          placeholder={"Código de verificação"}
          value={captchaInput.data}
          validation={captchaInput.isValidation}
          errorMessage={captchaInput.errorMessage}
          onChange={(event) => {
            onValidateCaptchaInput(event.target.value, setCaptchaInput);
          }}
        />
        <div className={'w-[330px]'}>
          <SendSMSCodeButton
            style={{ position: 'absolute',right: '0px', top: '0', zIndex: '1',fontWeight: 'bold' }}
            onClick={() => {
              if(onValidatePhoneInput(phoneInput.data, setPhoneInput)) {
                triggerSendForgetPasswordSMSCode({
                  appPackageName: environment.appPackageName,
                  deviceId: AppLocalStorage.getItem("deviceId") || "",
                  phone: phoneInput.data,
                  verifyType: 1
                });
              }
            }}>Enviar</SendSMSCodeButton>
          </div>
      </div>

      <div style={{ position: 'relative' }}>
      <Input
        type={isPasswordVisible ? 'text' : 'password'}
        // prefix={<KeySvg fill={"#6c7083"} className={"mr-2 w-[24px] h-[24px]"}/>}
        prefix={<KeySvg fill={"#6c7083"} className={"mr-2 w-[20px] h-[20px]"}/>}
        placeholder={"Senha (4-12 letras e números)"}
        value={passwordInput.data}
        validation={passwordInput.isValidation}
        errorMessage={passwordInput.errorMessage}
        onChange={(event) => {
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
        <div
            className="password-toggle"
            style={{ position: 'absolute', right: '17px', top: '9px', zIndex: '1' }}
            onClick={togglePasswordVisibility}
        >
          {isPasswordVisible ? (
              <img src={`assets/${environment.assetPrefix}/Property 1=ic_eye_on.png`} alt="EyeOffSvg" />
          ) : (
              <img src={`assets/${environment.assetPrefix}/Property 1=ic_eye_off.png`} alt="EyeSvg"/>
          )}
        </div>
      </div>

      <section className={"flex flex-col"}>
        <ConfirmButton
          className="!w-full"
          onClick={() => onFormConfirm()}
        >Entrar</ConfirmButton>
      </section>

    </section>
  )
}
