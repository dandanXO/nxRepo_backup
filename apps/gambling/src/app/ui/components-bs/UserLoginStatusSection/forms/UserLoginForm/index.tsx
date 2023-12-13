import {PhoneSvg} from "../../../../components/Icons/PhoneSvg";
import {KeySvg} from "../../../../components/Icons/KeySvg";
import {ConfirmButton} from "../../../../components/Buttons/ConfirmButton";
import {Input as DesktopInput, Input, InputValue} from "../../../../components/Inputs/Input";
import useBreakpoint from "../../../../hooks/useBreakpoint";

import {useEffect, useState} from "react";
import {useLoginMutation} from "../../../../../external";
import {environment} from "../../../../../../environments/environment";
import {MockTriggerLoginResponse} from "../../mock/MockTriggetLoginResponse";
import {useForm} from "../../../../hooks/useForm";
import {setLoginLocalStorage} from "../../../../../persistant/setLoginLocalStorage";
import {promiseHandler} from "../../../../../gateway/promiseHanlder";
import {IOpenNotificationWithIcon} from "../../../../pageTemplate";
import {AppLocalStorage} from "../../../../../persistant/localstorage";
import {connect} from "../../../../../gateway/socket";
import {useDispatch, useSelector} from "react-redux";
import {appSlice} from "../../../../../reduxStore/appSlice";
import {EyeOutlined, EyeInvisibleOutlined} from "@ant-design/icons";
import {MobileInput} from "../../../../components/Inputs/MobileInput";
import {AppLocalStorageKey} from "../../../../../persistant/AppLocalStorageKey";
import {HidableEyeSvg} from "../../../../components/Icons/HidableEyeSvg";
import {PhonePrefix} from "../../PhonePrefix";
import {RootState} from "../../../../../reduxStore";
import {useGetDeviceId} from "../../../../hooks/useGetDeviceId";

export const onValidatePhoneInput = (data: string, setPhoneInput: any) => {
  const customInputStyle = {
    border: "1px solid var(--main-primary-main)",
  };

  const valid = data.length === 10 || data.length === 11;
  if(valid) {
    setPhoneInput({
      data,
      isValidation: true,
      errorMessage: "",
    });
  } else {
    setPhoneInput({
      data,
      isValidation: false,
      errorMessage: "Número de celular de 10 ou 11 dígitos",
    })
  }

  if(data) {
    return true
  } else {
    return false;
  }
}


export const onValidatePasswordInput = (data: string, setPasswordInput: any) => {

  const passwordRex = /^[a-zA-Z0-9]+$/;
  const valid = passwordRex.test(data) && !data.includes(' ') && data.length >= 4 && data.length <= 12;
  if(valid) {
    setPasswordInput({
      data,
      isValidation: true,
      errorMessage: "",
    });
  } else {
    setPasswordInput({
      data,
      isValidation: false,
      errorMessage: "Senha (4-12 letras e números)",
    })
  }

  if(valid) {
    return true
  } else {
    return false;
  }
}


type IUserLoginForm = {
  confirmToLogin: () => void;
  openNotificationWithIcon: (props: IOpenNotificationWithIcon) => void;
  onSwitchToForgetPassword: () => void;
}
export const UserLoginForm = (props: IUserLoginForm) => {

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


  const dispatch = useDispatch();

  const [triggerLogin] = useLoginMutation()


  const {deviceId} = useGetDeviceId(phoneInput.data, "login");
  console.log("[useGetDeviceId] login.deviceId", deviceId);

  const {onFormConfirm} = useForm({

    onFormConfirm: () => {
      if(!onValidatePhoneInput(phoneInput.data, setPhoneInput) || !onValidatePasswordInput(passwordInput.data, setPasswordInput)) {
        return;
      }

      // if(environment.mockBackend) {
      //   // console.log("triggerLogin-data", MockTriggerLoginResponse);
      //   setLoginLocalStorage({
      //     token: MockTriggerLoginResponse.data.token,
      //     userInfo: MockTriggerLoginResponse.data.user_info,
      //     kPhone: phoneInput.data,
      //     kPassword: passwordInput.data,
      //     amount: 100,
      //     ip: MockTriggerLoginResponse.data.connection.ip,
      //   })
      //
      //   const url = MockTriggerLoginResponse.data.connection.ip;
      //   const token = MockTriggerLoginResponse.data.token;
      //   if(url) connect(url, token);
      //
      //   props.confirmToLogin();
      // } else {
        triggerLogin({
          "appChannel": "pc",
          "appPackageName": environment.appPackageName,
          "deviceId": deviceId,
          "deviceModel": "WEB",
          "deviceVersion": "WEB",
          "appVersion": environment.appVersion,
          "sysTimezone": null,
          "sysLanguage": null,
          phone: phoneInput.data,
          password: passwordInput.data,
        }).then((response) => {
            console.log("[debug]triggerLogin-data", response)
            if(!(response as any).error) {
              setLoginLocalStorage({
                token: (response as any).data?.data?.token,
                userInfo: (response as any).data?.data?.user_info,
                kPhone: phoneInput.data,
                kPassword: passwordInput.data,
                amount: 100,
                ip: (response as any).data?.data?.connection?.ip,
              })
              dispatch(appSlice.actions.setUserVIPLevel((response as any).data?.data?.user_info?.vip_level));

              const url = (response as any).data?.data?.connection?.ip;
              const token = (response as any).data?.data?.token;
              if(token && url) connect(url, token);

              dispatch(appSlice.actions.setIsLogin(true));
              dispatch(appSlice.actions.setIsShowInviteBonusModal(true))
              dispatch(appSlice.actions.setShowDepositModal(true))


              props.confirmToLogin();
            }
        }).catch((error: any) => {
          console.error(error);
        })
      }
    // }
  });


  return (
    <div className={"form"}>
      <div className={"flex flex-col"}>

        <Input
            type="number"
            prefix={
              <>
                {/*<PhoneSvg fill="#6c7083" className="mr-2 w-[24px] h-[24px]" />*/}
                <PhoneSvg className="mr-1" />
                <PhonePrefix/>
              </>
            }
            placeholder="Tu número de celular"
            value={phoneInput.data}
            validation={phoneInput.isValidation}
            errorMessage={phoneInput.errorMessage}
            onChange={(event: any) => onValidatePhoneInput(event.target.value, setPhoneInput)}
        />

        <Input
            type={isPasswordVisible ? 'text' : 'password'}
            // prefix={<KeySvg fill={"#6c7083"} className={"mr-2 w-[24px] h-[24px]"}/>}
            prefix={<KeySvg className={"mr-1"}/>}
            placeholder={"Senha (4-12 letras e números)"}
            value={passwordInput.data}
            validation={passwordInput.isValidation}
            errorMessage={passwordInput.errorMessage}
            onChange={(event: any) => {
              onValidatePasswordInput(event.target.value, setPasswordInput)
            }}
            suffix={(
              <div
                className="password-toggle"
                onClick={togglePasswordVisibility}
              >
                <HidableEyeSvg hide={!isPasswordVisible}/>
              </div>
            )}
        />

        <section className={"flex flex-col"}>
          <button
            className={"text-[var(--white)] text-center mb-3 ml-3"}
            onClick={() => {
              props.onSwitchToForgetPassword();
            }}
          >Esqueça A Eenha?</button>
          <ConfirmButton className="!w-full text-sm md:text-base my-2 "onClick={() => onFormConfirm()}>Entrar</ConfirmButton>
        </section>

      </div>
    </div>
  )
}
