import {useEffect, useState} from "react";
import {environment} from "../../../../../environments/environment";
import axios from "axios";

type ICaptcha = {
  onGetCaptchaKey: (key: string) => void;
}
export const Captcha = (props: ICaptcha) => {
  const [imgSrc, setImgSrc] = useState<string|null>(null);

  useEffect(() => {
    onClickCaptcha();
  }, []);

  const onClickCaptcha = () => {
    axios.get(`${environment.captcha}?${new Date().getTime()}`, { responseType: 'arraybuffer' }).then(res => {
      setImgSrc(`data:${res.headers['content-type']};base64,${btoa(String.fromCharCode(...new Uint8Array(res.data)))}`);
      if(res.headers["captcha-image-key"]) {
        const key = res.headers["captcha-image-key"];
        console.log("captcha-image-key", key)
        props.onGetCaptchaKey(key)
      }
    });
  }
  if(!imgSrc) return null;
  return (
    <img
      className={"h-[48px] cursor-pointer"} src={imgSrc}
      onClick={() => {
        onClickCaptcha();
      }}
    />
  )
}
