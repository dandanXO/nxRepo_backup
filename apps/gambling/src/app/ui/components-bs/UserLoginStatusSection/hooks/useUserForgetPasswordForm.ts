import {useState} from "react";
import {InputValue} from "../../Inputs/Input";
import {useForgetPasswordMutation, useSendForgetPasswordSMSCodeMutation} from "../../../../external";
import {useGetDeviceId} from "../../../hooks/useGetDeviceId";
import {useForm} from "../../../hooks/useForm";
import {onValidatePasswordInput, onValidatePhoneInput} from "../forms/UserLoginForm/env/coco/UserLoginForm";
import {environment} from "../../../../../environments/environment";
import {setLoginLocalStorage} from "../../../../persistant/setLoginLocalStorage";
import {connect} from "../../../../gateway/socket";
import {AppLocalStorage} from "../../../../persistant/localstorage";
import {AppLocalStorageKey} from "../../../../persistant/AppLocalStorageKey";

type IUseUserForgetPasswordForm = {
  confirmToRegister: () => void;
}


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

export const useUserForgetPasswordForm = (props: IUseUserForgetPasswordForm) => {

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

  const onChangePhoneInput = (event: any) => {
    onValidatePhoneInput(event.target.value, setPhoneInput)
  }

  const [passwordInput, setPasswordInput] = useState<InputValue<string>>({
    data: '',
    isValidation: true,
    errorMessage: '',
  });
  const onChangePasswordInput = (event: any) => {
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
  }

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [captchaInput, setCaptchaInput] = useState<InputValue<string>>({
    data: '',
    isValidation: true,
    errorMessage: '',
  });
  const onChangeCaptchaInput = (event: any) => {
    onValidateCaptchaInput(event.target.value, setCaptchaInput);
  }

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


  const isValidSMSCode = phoneInput.data.length > 0 && phoneInput.isValidation || false
  const onClickSendSMSCode = (isCounting: boolean) => {
    if(isCounting) return;
    if(onValidatePhoneInput(phoneInput.data, setPhoneInput)) {
      triggerSendForgetPasswordSMSCode({
        appPackageName: environment.appPackageName,
        deviceId: AppLocalStorage.getItem(AppLocalStorageKey.deviceId) || "",
        phone: phoneInput.data,
        verifyType: 1
      });
    }
  }



  return {
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
  }

}
