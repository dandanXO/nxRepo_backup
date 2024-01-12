import {IButton} from "../../IButton";
import React from "react";

export const PopoverWithdrawButton = (props: IButton) => {
  return (
    <button
      className='w-full bg-gradient-to-r from-[var(--button-withdraw-from)] to-[var(--button-withdraw-to)] py-[10px] rounded-lg'
      onClick={props.onClick}
    >
      Retirar
    </button>
  )
}
