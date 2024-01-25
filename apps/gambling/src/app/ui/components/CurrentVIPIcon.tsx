import React from "react";
import { tcx } from "../utils/tcx";
import { environment } from "../../../environments/environment";

interface ICurrentVIPIconProps {
  level: number
  className?: string
  imageClassName?: string
  textClassName?: string
}

const CurrentVIPIcon = ({
  level,
  className,
  imageClassName,
  textClassName
}:ICurrentVIPIconProps) => {
  return (
    <div className={tcx('flex flex-col w-full justify-center items-center', className)}>
      <img className={imageClassName} alt='currentVIP' src={`assets/${environment.uVersion}/${environment.mVersion}/icon_vip.png`}/>
      <img className={textClassName} alt='vip_level' src={`assets/${environment.uVersion}/ic_vip_${level}.png`} />
    </div>
  )
}

export default CurrentVIPIcon;
