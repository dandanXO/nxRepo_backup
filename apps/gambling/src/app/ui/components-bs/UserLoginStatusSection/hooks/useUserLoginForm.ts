import {MobileInput} from "../../theme/Inputs/MobileInput";
import {Input as DesktopInput, InputValue} from "../../theme/Inputs/Input";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {useLoginMutation} from "../../../../external";
import {useGetDeviceId} from "../../../hooks/useGetDeviceId";
import {useForm} from "../../../hooks/useForm";
import {environment} from "../../../../../environments/environment";
import {setLoginLocalStorage} from "../../../../persistant/setLoginLocalStorage";
import {appSlice} from "../../../../reduxStore/appSlice";
import {connect} from "../../../../gateway/socket";
import {onValidatePasswordInput, onValidatePhoneInput} from "../forms/UserLoginForm";

type IUseUserLoginForm = {
  confirmToLogin: () => void;
}
export const useUserLoginForm = (props: IUseUserLoginForm) => {


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

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

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

  return {
    phoneInput,
    setPhoneInput,
    isPasswordVisible,
    passwordInput,
    setPasswordInput,
    togglePasswordVisibility,
    onFormConfirm,
  }
}
