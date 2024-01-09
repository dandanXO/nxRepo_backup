import React from "react";
import { environment } from "../../../../environments/environment";
import { tcx } from "../../utils/tcx";

interface ICheckBoxProps {
  checked:boolean
  onClick: () => void
  className?: string
}

export const CheckBox = ({
  checked,
  className,
  onClick
}: ICheckBoxProps) => {
  return <img onClick={onClick} className={tcx('cursor-pointer', className)} alt='checkBox' src={`assets/${environment.uVersion}/ic_check_box_${checked? 'checked':'unchecked'}.png`}/>
}
