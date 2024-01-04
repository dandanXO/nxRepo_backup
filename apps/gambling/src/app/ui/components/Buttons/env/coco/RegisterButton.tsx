import React from "react";
import {IRegisterButton} from "../../RegisterButton";
import cx from "classnames";

export const RegisterButton = (props: IRegisterButton) => {
  return (
    <button
      className={cx(
      "rounded-[5px] py-[5px] px-[50px] text-white text-bold",
        "bg-gradient-to-b from-[var(--primary-main-from)] to-[var(--primary-main-to)]")
      }
      onClick={() => props.onClick()}
    >
      {props.children}
    </button>
  )
}
