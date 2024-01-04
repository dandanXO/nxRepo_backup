import {useEffect, useState} from "react";
import {environment} from "../../../../../../environments/environment";
import axios from "axios";
import cx from 'classnames';

type ICaptcha = {
  imgSrc: string | null;
  onClickCaptcha: () => void;
  isLoading: boolean;
  className: string;
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
      className={cx("h-[50px] cursor-pointer",props.className)} src={props.imgSrc}
      onClick={() => {
        props.onClickCaptcha();
      }}
    />
  )
}
