import {useState} from "react";
import {environment} from "../../../../../environments/environment";

export const Captcha = () => {
  const [captchaURL, setCaptchaURL] = useState(environment.captcha);
  const onClickCaptcha = () => {
    setCaptchaURL(`${environment.captcha}?${new Date().getTime()}`)
  }
  return (
    <img
      className={"h-[48px] cursor-pointer"} src={captchaURL}
      onClick={() => {
        onClickCaptcha();
      }}
    />
  )
}
