import React from "react";
import {IRegisterButton} from "../../RegisterButton";


export const RegisterButton = (props: IRegisterButton) => {
  return (
    <div className={"rounded-[5px] !bg-[#1A3084] py-[5px] px-[50px] text-white text-bold shadow-[0_1px_#1f6dc8]"} onClick={() => props.onClick()}>
      {props.children}
    </div>
  )
}
