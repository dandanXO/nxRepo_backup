import {PhoneSvg} from "../../PhoneSvg";
import {KeySvg} from "../../KeySvg";
import {ConfirmButton} from "../../../ConfirmButton";
import {Input as DesktopInput, InputValue} from "../../../Input";
import {MobileInput} from "./MobileInput";
import useBreakpoint from "../../../../hooks/useBreakpoint";

import {useState} from "react";
import {useLoginMutation} from "../../../../../external";
import {environment} from "../../../../../../environments/environment";
import {MockTriggerLoginResponse} from "../../MockTriggetLoginResponse";
import {useForm} from "../../../../hooks/useForm";
import {setLoginLocalStorage} from "../../../../../persistant/setLoginLocalStorage";
import {promiseHandler} from "../../../../../gateway/promiseHanlder";
import {IOpenNotificationWithIcon} from "../../../../pageTemplate";
import {AppLocalStorage} from "../../../../../persistant/localstorage";
import {connect} from "../../../../../gateway/socket";
import {useDispatch} from "react-redux";
import {appSlice} from "../../../../../reduxStore/appSlice";

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
  const valid = data.length >= 4 && data.length <= 12;
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


  const {onFormConfirm} = useForm({

    onFormConfirm: () => {
      if(!onValidatePhoneInput(phoneInput.data, setPhoneInput) || !onValidatePasswordInput(passwordInput.data, setPasswordInput)) {
        return;
      }

      if(environment.mockBackend) {
        console.log("triggerLogin-data", MockTriggerLoginResponse);
        setLoginLocalStorage({
          token: MockTriggerLoginResponse.data.token,
          userInfo: MockTriggerLoginResponse.data.user_info,
          kPhone: phoneInput.data,
          kPassword: passwordInput.data,
          amount: 100,
          ip: MockTriggerLoginResponse.data.connection.ip,
        })

        const url = MockTriggerLoginResponse.data.connection.ip;
        const token = MockTriggerLoginResponse.data.token;
        if(url) connect(url, token);

        props.confirmToLogin();
      } else {
        triggerLogin({
          "appChannel": "pc",
          "appPackageName": environment.appPackageName,
          "deviceId": AppLocalStorage.getItem("deviceId") || "",
          "deviceModel": "WEB",
          "deviceVersion": "WEB",
          "appVersion": environment.appVersion,
          "sysTimezone": null,
          "sysLanguage": null,
          phone: phoneInput.data,
          password: passwordInput.data,
        }).then((response) => {
          promiseHandler.then(response, () => {
            console.log("triggerLogin-data", response)
            setLoginLocalStorage({
              token: (response as any).data.data.token,
              userInfo: (response as any).data.data.user_info,
              kPhone: phoneInput.data,
              kPassword: passwordInput.data,
              amount: 100,
              ip: (response as any).data.data.connection.ip,
            })
            dispatch(appSlice.actions.setUserVIPLevel((response as any).data.data.user_info.vip_level));

            const url = (response as any).data.data.connection.ip;
            const token = (response as any).data.data.token;
            if(url) connect(url, token);
            dispatch(appSlice.actions.setIsLogin(true));
            dispatch(appSlice.actions.setIsShowInviteBonusModal(true))
            dispatch(appSlice.actions.setShowTelegramModal(true))

            props.confirmToLogin();
          }, props.openNotificationWithIcon);
        }).catch((error: any) => {
          alert(error);
        })
      }
    }
  });


  return (
    <div className={"form"}>
      <div className={"flex flex-col"}>
        <Input
            type="text"
            prefix={
              <>
                <PhoneSvg fill="#6c7083" className="mr-2 w-[24px] h-[24px]" />
                <span className="text-main-primary-main mr-2">+55</span>
              </>
            }
            placeholder="Tu número de celular"
            value={phoneInput.data}
            validation={phoneInput.isValidation}
            errorMessage={phoneInput.errorMessage}
            onChange={(event) => onValidatePhoneInput(event.target.value, setPhoneInput)}
        />

        <div style={{ position: 'relative' }}>
          <Input
              type={isPasswordVisible ? 'text' : 'password'}
          prefix={<KeySvg fill={"#6c7083"} className={"mr-2 w-[24px] h-[24px]"}/>}
          placeholder={"Senha (4-12 letras e números)"}
          value={passwordInput.data}
          validation={passwordInput.isValidation}
          errorMessage={passwordInput.errorMessage}
          onChange={(event) => {
            onValidatePasswordInput(event.target.value, setPasswordInput)
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

        <section className={"flex flex-col mt-2"}>
          <button className={"my-4 text-[var(--light)]"} onClick={() => {
            props.onSwitchToForgetPassword();
          }}>Esqueça a senha?</button>
          <ConfirmButton
            onClick={() => onFormConfirm()}
            style={{width: "100%", height: 50, fontWeight: "bold"}}>Entrar</ConfirmButton>
        </section>

      </div>
    </div>
  )
}
