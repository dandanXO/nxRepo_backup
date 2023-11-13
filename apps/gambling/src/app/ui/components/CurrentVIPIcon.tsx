import React from "react";
import { tcx } from "../utils/tcx";
import { environment } from "../../../environments/environment";

interface ICurrentVIPIconProps {
  level: number
  className?: string
  textClassName?: string
}

const CurrentVIPIcon = ({
  level,
  className,
  textClassName
}:ICurrentVIPIconProps) => {
  return (
    <div className={tcx('flex flex-col w-full justify-center items-center', className)}>
      <img alt='currentVIP' src={`assets/${environment.assetPrefix}/icon_vip_current.png`}/>
      <div className={textClassName}>VIP {level}</div>
    </div>
  )
}

export default CurrentVIPIcon;
