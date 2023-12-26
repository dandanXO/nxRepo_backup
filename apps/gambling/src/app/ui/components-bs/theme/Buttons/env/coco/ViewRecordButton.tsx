import {PageOrModalPathEnum} from "../../../../../PageOrModalPathEnum";
import React from "react";
import {IButton} from "../../IButton";

export const ViewRecordButton = (props: IButton) => {
  return (
    <button
      className='text-white text-xl mt-20 mr-10 mb-20'
      onClick={props.onClick}
    >{'visualizar registros >'}
    </button>
  )
}
