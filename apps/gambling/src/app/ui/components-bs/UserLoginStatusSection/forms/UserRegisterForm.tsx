import {PhoneSvg} from "../PhoneSvg";
import {KeySvg} from "../KeySvg";
import {ConfirmButton} from "../../../components/Buttons/ConfirmButton";
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";
import useBreakpoint from "../../../hooks/useBreakpoint";
import {Input as DesktopInput, Input, InputValue} from "../../../components/Inputs/Input";
import {MobileInput} from "../../../components/Inputs/MobileInput";

import {useState} from "react";
import {useForm} from "../../../hooks/useForm";
import {useRegisterMutation} from "../../../../external";
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
import {appSlice} from "../../../../reduxStore/appSlice";
import { useDispatch } from "react-redux";
import {AppLocalStorage} from "../../../../persistant/localstorage";
import cx from "classnames";
import {EyeOutlined, EyeInvisibleOutlined} from "@ant-design/icons";

const onValidateConfirmPhoneInput = (first: string, second: string) => {
  if(first !== second) {
    return false;
  } else {
    return true;
  }
}

const onValidateCaptchaInput = (data: string) => {
  if(data === "") {
    return false;
  } else {
    return true;
  }
}
export type IUserRegisterForm = {
  confirmToRegister: () => void;
  openNotificationWithIcon: (props: IOpenNotificationWithIcon) => void;
}

export const UserRegisterForm = (props: IUserRegisterForm) => {
  const {isMobile} = useBreakpoint();
  const Input = isMobile ? MobileInput : DesktopInput;

  // NOTO: 2023101601 / test1234
  // refactor:
  const [phoneInput, setPhoneInput] = useState<InputValue<string>>({
    data: '',
    isValidation: true,
    errorMessage: '',
  });

  const [confirmPhoneInput, setConfirmPhoneInput] = useState<InputValue<string>>({
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
  const dispatch = useDispatch();

  const [triggerRegister, {isLoading, isError, isSuccess}] = useRegisterMutation();
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

    const [isChecked, setIsChecked] = useState(false);

    const toggleCheck = () => {
        setIsChecked(!isChecked);
    };

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [password, setPassword] = useState('');

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

  const {onFormConfirm} = useForm({
    onFormConfirm: () =>  {
      if(!onValidatePhoneInput(phoneInput.data, setPhoneInput) ||
        !onValidateConfirmPhoneInput(phoneInput.data, confirmPhoneInput.data) ||
        !onValidatePasswordInput(passwordInput.data, setPasswordInput)
      ) {
        return;
      }

      triggerRegister({
          "appChannel": "pc",
          "deviceId": AppLocalStorage.getItem("deviceId") || "",
          "appPackageName": environment.appPackageName,
          "deviceModel": "WEB",
          "deviceVersion": "WEB",
          "appVersion": environment.appVersion,
          "sysTimezone": null,
          "sysLanguage": null,
          "phone": phoneInput.data,
          "password": passwordInput.data,
          "verifyCode": "register",
          "web_finger": {
            "cpuSize": 10,
            "canvas": "76b55d9781385eac47339cc7c2f88340",
            "webgl": "f2334ad6094e54920ca9fb85c526c843",
            "userAgent": navigator.userAgent,
            "screenWidth": window.innerWidth,
            "inviteUrl": location.href,
          },
          "installTime": String(new Date().getTime()),
          // TODO:
          "captcha_image_key": "78ahjsgfafsfchhcsa",
          "captcha_image_code": captchaInput.data,
          "web_uuid": "39b1e7e2-0a02-4fd2-958f-e8a85215010f"
      }).then((response) => {
        console.log("triggerRegister-data", response)
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
          if(url && token) connect(url, token);

          dispatch(appSlice.actions.setIsLogin(true));
          dispatch(appSlice.actions.setShowTelegramModal(true))
          dispatch(appSlice.actions.setIsShowInviteBonusModal(true));

          props.confirmToRegister();
        }
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
            <span className={"text-main-primary-main mr-2"}>+55</span>
          </>
        }
        placeholder={"Tu nùmero de celular"}
        value={phoneInput.data}
        validation={phoneInput.isValidation}
        errorMessage={phoneInput.errorMessage}
        onChange={(event) => {
           if(onValidatePhoneInput(event.target.value, setPhoneInput)) {
             setPhoneInput({
               data: event.target.value,
               isValidation: true,
               errorMessage: "",
             });
           } else {
             setPhoneInput({
               data: event.target.value,
               isValidation: false,
               errorMessage: "Número de celular de 10 ou 11 dígitos",
             })
           }
        }}
      />

      <Input
          type={"number"}
          prefix={
            <>
              {/*<PhoneSvg fill={"#6c7083"} className={"mr-2 w-[24px] h-[24px]"}/>*/}
              <PhoneSvg fill={"#6c7083"} className={"mr-2 w-[14px] h-[20px]"}/>
              <span className={"text-main-primary-main mr-2"}>+55</span>
            </>
          }
          placeholder={"Confirme o número do celular"}
          value={confirmPhoneInput.data}
          validation={confirmPhoneInput.isValidation}
          errorMessage={confirmPhoneInput.errorMessage}
          onChange={(event) => {
            if(onValidateConfirmPhoneInput(phoneInput.data, event.target.value)) {
              setConfirmPhoneInput({
                data: event.target.value,
                isValidation: true,
                errorMessage: "",
              });
            } else {
              setConfirmPhoneInput({
                data: event.target.value,
                isValidation: false,
                errorMessage: "Os números de telefone estão inconsistentes.",
              })
            }
          }}
      />

      <Input
        type={isPasswordVisible ? 'text' : 'password'}
        // prefix={<KeySvg fill={"#6c7083"} className={"mr-2 w-[24px] h-[24px]"}/>}
        prefix={<KeySvg fill={"#6c7083"} className={"mr-2 w-[20px] h-[20px]"}/>}
        placeholder={"Senha (4-12 letras e números)"}
        value={passwordInput.data}
        validation={passwordInput.isValidation}
        errorMessage={passwordInput.errorMessage}
        onChange={(event) => {
          if (onValidatePasswordInput(event.target.value, setPasswordInput)) {
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
        suffix={(
          <div
            className="password-toggle"
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? (
              <EyeOutlined className={"text-[#8B619E]"}/>
            ) : (
              <EyeInvisibleOutlined className={"text-[#8B619E]"}/>
            )}
          </div>
        )}
      />

      <Input
        type={"text"}
        // prefix={<SecuritySvg fill={"#6c7083"} className={"mr-2 w-[24px] h-[24px]"}/>}
        prefix={<SecuritySvg fill={"#6c7083"} className={"mr-2 w-[20px] h-[20px]"}/>}
        outerSuffix={<img className={"h-[48px]"} src={environment.captcha}/>}
        placeholder={"Código de verificação"}
        value={captchaInput.data}
        validation={captchaInput.isValidation}
        errorMessage={captchaInput.errorMessage}
        onChange={(event) => {
          if(onValidateCaptchaInput(event.target.value)) {
            setCaptchaInput({
              data: event.target.value,
              isValidation: true,
              errorMessage: "",
            });
          } else {
            setCaptchaInput({
              data: event.target.value,
              isValidation: false,
              errorMessage: "por favor insira o código de verificação",
            })
          }
        }}
      />

      <section className={"flex flex-col mb-4"}>
        <ConfirmButton
          className="!w-full"
          onClick={() => onFormConfirm()}
        >Register agora</ConfirmButton>
      </section>

      {isMobile ? (
      <section className={"flex flex-row items-center mb-4"}>
          <div className={"mr-2 relative top-[1px]"} onClick={toggleCheck}>
              {isChecked ? (
                  <img src={`assets/${environment.assetPrefix}/Property 1=uncheck.png`} />
              ) : (
                  <img src={`assets/${environment.assetPrefix}/Property 1=check.png`} alt="Checked" />
              )}
          </div>
        <p className={"text-white font-thin"} style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', maxWidth: '300px' }}>
          <span className={"text-[var(--light)]"}>Eu concordo</span>
          <span className={"text-main-secondary-main"}>Condições e condições, política de privacidade</span>
        </p>
      </section>
        ):(
        <section className={"flex flex-row items-center"}>
            <div className={"mr-2 relative top-[1px]"} onClick={toggleCheck}>
                {isChecked ? (
                    <img src={`assets/${environment.assetPrefix}/Property 1=uncheck.png`}/>
                ) : (
                    <img src={`assets/${environment.assetPrefix}/Property 1=check.png`}/>
                )}
            </div>
          <p className={"text-white font-thin"}>
            <span className={"text-[var(--light)]"}>Eu concordo</span>
            <span className={"text-main-secondary-main"}>Condições e condições, política de privacidade</span>
          </p>
        </section>
      )}


    </section>
  )
}
