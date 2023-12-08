import {PhoneSvg} from "../../../../components/Icons/PhoneSvg";
import {KeySvg} from "../../../../components/Icons/KeySvg";
import {ConfirmButton} from "../../../../components/Buttons/ConfirmButton";
import useBreakpoint from "../../../../hooks/useBreakpoint";
import {Input as DesktopInput, Input, InputValue} from "../../../../components/Inputs/Input";
// import {MobileInput} from "../../../../components/Inputs/MobileInput";
import * as Sentry from "@sentry/browser";

import {useEffect, useState} from "react";
import {useForm} from "../../../../hooks/useForm";
import {useRegisterMutation} from "../../../../../external";
import {setLoginLocalStorage} from "../../../../../persistant/setLoginLocalStorage";
import {IOpenNotificationWithIcon} from "../../../../pageTemplate";
import {onValidatePhoneInput, onValidatePasswordInput} from "../UserLoginForm"
import {environment} from "../../../../../../environments/environment"
import {SecuritySvg} from "../../../../components/Icons/SecuritySvg";
import {connect} from "../../../../../gateway/socket";
import {appSlice} from "../../../../../reduxStore/appSlice";
import { useDispatch } from "react-redux";
import {AppLocalStorage} from "../../../../../persistant/localstorage";
import {usePageNavigate} from "../../../../hooks/usePageNavigate";
import {Captcha} from "../Captcha";
import {AppLocalStorageKey} from "../../../../../persistant/AppLocalStorageKey";
import {HidableEyeSvg} from "../../../../components/Icons/HidableEyeSvg";
import {CheckableICON} from "../../../../components/Icons/CheckableICON";
import axios from "axios";
import {v4 as uuidv4} from "uuid";
import {PhonePrefix} from "../../PhonePrefix";
import {useGetDeviceId} from "../../../../hooks/useGetDeviceId";

const onValidateConfirmPhoneInput = (first: string, second: string, setConfirmPhoneInput: any) => {
  if(first !== second) {
    setConfirmPhoneInput({
      data: second,
      isValidation: false,
      errorMessage: "Os números de telefone estão inconsistentes.",
    });
    return false;
  } else {
    setConfirmPhoneInput({
      data: second,
      isValidation: true,
      errorMessage: "",
    });
    return true;
  }
}

const onValidateCaptchaInput = (data: string, setCaptchaInput: any) => {
  if(data === "") {
    setCaptchaInput({
      data,
      isValidation: false,
      errorMessage: "por favor insira o código de verificação",
    });
    return false;
  } else {
    setCaptchaInput({
      data,
      isValidation: true,
      errorMessage: "",
    });
    return true;
  }
}
export type IUserRegisterForm = {
  confirmToRegister: () => void;
  openNotificationWithIcon: (props: IOpenNotificationWithIcon) => void;
}

export const UserRegisterForm = (props: IUserRegisterForm) => {
  const {isMobile} = useBreakpoint();
  // const Input = isMobile ? MobileInput : DesktopInput;

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

  const [imgSrc, setImgSrc] = useState<string|null>(null);
  const [isCaptchaLoading, setIsCaptchaLoading] = useState(false)
  const onClickCaptcha = () => {
    setIsCaptchaLoading(true);
    axios.get(`${environment.captcha}?${new Date().getTime()}`, { responseType: 'arraybuffer' }).then(res => {
      setImgSrc(`data:${res.headers['content-type']};base64,${btoa(String.fromCharCode(...new Uint8Array(res.data)))}`);
      setCaptchaInput({
        data: "",
        isValidation: undefined,
        errorMessage: "",
      })
      if(res.headers["captcha-image-key"]) {
        const key = res.headers["captcha-image-key"];
        // console.log("captcha-image-key", key)
        onGetCaptchaKey(key)
      }
    }).finally(() => {
      setIsCaptchaLoading(false)
    })
  }
  useEffect(() => {
    onClickCaptcha();
  }, [])

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

    const [isChecked, setIsChecked] = useState(true);

    const toggleCheck = () => {
        setIsChecked(!isChecked);
    };

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

  const {deviceId} = useGetDeviceId(phoneInput.data, "register");
  console.log("register.deviceId", deviceId);

  const {onFormConfirm} = useForm({
    onFormConfirm: () =>  {
      if(!onValidatePhoneInput(phoneInput.data, setPhoneInput) ||
        !onValidateConfirmPhoneInput(phoneInput.data, confirmPhoneInput.data, setConfirmPhoneInput) ||
        !onValidatePasswordInput(passwordInput.data, setPasswordInput) ||
        !onValidateCaptchaInput(captchaInput.data, setCaptchaInput)
      ) {
        return;
      }

      if(!captchaKey) {
        return;
      }

      triggerRegister({
          "appChannel": "pc",
          "deviceId": deviceId,
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
            "inviteUrl": window.location.href,
          },
          "installTime": String(new Date().getTime()),
          // TODO:
          "captcha_image_key": captchaKey,
          "captcha_image_code": captchaInput.data,
          "web_uuid": "39b1e7e2-0a02-4fd2-958f-e8a85215010f"
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
          if(url && token) connect(url, token);

          dispatch(appSlice.actions.setIsLogin(true));
          dispatch(appSlice.actions.setShowDepositModal(true))
          dispatch(appSlice.actions.setIsShowInviteBonusModal(true));

          props.confirmToRegister();
        } else {
          onClickCaptcha();
        }
      }).catch((error) => {
        console.error(error);
      })
    }
  })

  const {
    onClickToPrivacyAgreement
  } = usePageNavigate();

  const [captchaKey, setCaptchaKey] = useState<string>();
  const onGetCaptchaKey = (key: string) => {
    setCaptchaKey(key);
  }
  return (
    <section className={"flex flex-col"}>
      <Input
        type={"number"}
        prefix={
          <>
            {/*<PhoneSvg fill={"#6c7083"} className={"mr-2 w-[24px] h-[24px]"}/>*/}
            <PhoneSvg className={"mr-1"}/>
            <PhonePrefix/>
          </>
        }
        placeholder={"Tu nùmero de celular"}
        value={phoneInput.data}
        validation={phoneInput.isValidation}
        errorMessage={phoneInput.errorMessage}
        onChange={(event: any) => {
          onValidatePhoneInput(event.target.value, setPhoneInput);
        }}
      />

      <Input
          type={"number"}
          prefix={
            <>
              {/*<PhoneSvg fill={"#6c7083"} className={"mr-2 w-[24px] h-[24px]"}/>*/}
              <PhoneSvg className={"mr-1"}/>
              <PhonePrefix/>
            </>
          }
          placeholder={"Confirme o número do celular"}
          value={confirmPhoneInput.data}
          validation={confirmPhoneInput.isValidation}
          errorMessage={confirmPhoneInput.errorMessage}
          onChange={(event: any) => {
            onValidateConfirmPhoneInput(phoneInput.data, event.target.value, setConfirmPhoneInput);
          }}
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
          onValidatePasswordInput(event.target.value, setPasswordInput);
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

      <Input
        type={"text"}
        className={"rounded-br-[0px] rounded-tr-[0px] border-r-[0px]"}
        // prefix={<SecuritySvg fill={"#6c7083"} className={"mr-2 w-[24px] h-[24px]"}/>}
        prefix={<SecuritySvg className={"mr-1"}/>}
        outerSuffix={<Captcha onClickCaptcha={onClickCaptcha} imgSrc={imgSrc} isLoading={isCaptchaLoading}/>}
        placeholder={ isMobile ? "Código gráfico" : "Código de verificação"}
        value={captchaInput.data}
        validation={captchaInput.isValidation}
        errorMessage={captchaInput.errorMessage}
        onChange={(event: any) => {
          onValidateCaptchaInput(event.target.value, setCaptchaInput);
        }}
      />

      <section className={"flex flex-col mb-4"}>
        <ConfirmButton
          className="!w-full my-2 "
          disable={!isChecked}
          onClick={() => isChecked && onFormConfirm()}
        >Register agora</ConfirmButton>
      </section>

      <section className={"flex flex-row items-center mb-4"}>
        <button className={"mr-2 relative top-[1px] shrink-0"} onClick={toggleCheck}>
          <CheckableICON isChecked={isChecked}/>
        </button>
        <a
          className={"text-white font-thin text-md"}
          // style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', maxWidth: '300px' }}
        >
          <span className={"text-[var(--text-tertiary)] font-medium mr-1 my-2 text-sm"} onClick={toggleCheck} >Eu concordo</span>
          <span className={"text-[var(--white)] font-medium underline break-all text-sm"} onClick={() => {
            onClickToPrivacyAgreement();
          }}>Condições e condições, política de privacidade</span>
        </a>
      </section>


    </section>
  )
}
