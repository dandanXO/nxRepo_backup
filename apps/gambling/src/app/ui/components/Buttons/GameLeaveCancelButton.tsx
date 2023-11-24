import React from "react";
import {IButton} from "./IButton";

export const GameLeaveCancelButton = (props: IButton) => {
  return (
    <button
      className='rounded-lg w-full py-3 bg-gradient-to-b from-[var(--secondary-main-from)] to-[var(--secondary-main-to)]'
      onClick={props.onClick}
    >Concelar</button>
  )
}
