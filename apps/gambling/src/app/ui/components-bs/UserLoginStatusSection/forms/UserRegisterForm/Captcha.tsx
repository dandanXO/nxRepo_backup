import {useEffect, useState} from "react";
import {environment} from "../../../../../../environments/environment";
import axios from "axios";

type ICaptcha = {
  imgSrc: string | null;
  onClickCaptcha: () => void;
  isLoading: boolean;
}
export const Captcha = (props: ICaptcha) => {
  if(!props.imgSrc) return null;
  // if(props.isLoading) {
  //   return <div className={"h-[50px] cursor-pointer rounded-br-[8px] rounded-tr-[8px] bg-white"}/>
  // }
  return (
    // border-bottom-right-radius: 8px;
  // border-top-right-radius: 8px;
    <img
      className={"h-[50px] cursor-pointer rounded-br-[8px] rounded-tr-[8px]"} src={props.imgSrc}
      onClick={() => {
        props.onClickCaptcha();
      }}
    />
  )
}
