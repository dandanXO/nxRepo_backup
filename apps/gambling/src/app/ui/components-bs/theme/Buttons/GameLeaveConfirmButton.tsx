import {IButton} from "./IButton";
import React from "react";

export const GameLeaveConfirmButton = (props: IButton) => {
  return (
    <button className='rounded-lg w-full py-3 bg-gradient-to-b from-[var(--primary-main-from)] to-[var(--primary-main-to)]' onClick={props.onClick}>Confirme</button>
  )
}
