
import {useEffect, useState} from "react";
import {InputValue} from "../../theme/Inputs/Input";
import {useDispatch} from "react-redux";
import axios from "axios";
import {environment} from "../../../../../environments/environment";
import {useRegisterMutation} from "../../../../external";

import {onValidatePasswordInput, onValidatePhoneInput} from "../forms/UserLoginForm";
import {setLoginLocalStorage} from "../../../../persistant/setLoginLocalStorage";
import {connect} from "../../../../gateway/socket";
import {appSlice} from "../../../../reduxStore/appSlice";

import {useGetDeviceId} from "../../../hooks/useGetDeviceId";
import {useForm} from "../../../hooks/useForm";

type IUseUserRegisterForm = {
  confirmToRegister: () => void;
}
export const useUserRegisterForm = (props: IUseUserRegisterForm) => {

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

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };


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


  const [captchaKey, setCaptchaKey] = useState<string>();
  const onGetCaptchaKey = (key: string) => {
    setCaptchaKey(key);
  }

  const [triggerRegister, {isLoading, isError, isSuccess}] = useRegisterMutation();



  const [isChecked, setIsChecked] = useState(true);

  const toggleCheck = () => {
    setIsChecked(!isChecked);
  };


  const {deviceId} = useGetDeviceId(phoneInput.data, "register");
  console.log("[useGetDeviceId] register.deviceId", deviceId);

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

  return {
    // Phone
    phoneInput,
    setPhoneInput,
    confirmPhoneInput,
    setConfirmPhoneInput,
    onValidateConfirmPhoneInput,
    // Password
    isPasswordVisible,
    passwordInput,
    setPasswordInput,
    togglePasswordVisibility,
    // Captcha
    onClickCaptcha,
    imgSrc,
    isCaptchaLoading,
    captchaInput,
    setCaptchaInput,
    onValidateCaptchaInput,
    // Policy
    isChecked,
    onFormConfirm,
    toggleCheck,


  }
}
