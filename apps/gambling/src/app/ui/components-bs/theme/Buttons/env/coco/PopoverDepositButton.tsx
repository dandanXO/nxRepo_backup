import React from "react";
import {IButton} from "../../IButton";

export const PopoverDepositButton = (props: IButton) => {
  return (
    <button
      className='w-full bg-gradient-to-r from-[var(--button-deposit-from)] to-[var(--button-deposit-to)] py-[10px] rounded-lg'
      onClick={props.onClick}
    >
      Depósito
    </button>
  )
}
