import React from "react";
import { environment } from "../../../../../environments/environment";

interface IRecentGameHeaderProps {
  count: number;
  onClickLeft: () => void;
  onClickRight: () => void;
}

export const RecentGameHeader = ({
  count,
  onClickLeft,
  onClickRight
}: IRecentGameHeaderProps) => {
  return (
    <div className='py-[14px] flex items-center justify-between'>
      <div className='flex gap-2 font-bold items-center'>
        <img className='w-6 h-6' src={`assets/${environment.assetPrefix}/icon_recent.png`} alt="recentIcon" />
        <div className='text-xl text-white'>Recente</div>
        <div className='text-sm text-[var(--secondary-assistant)]'>+{count}</div>
      </div>

      <div className='flex gap-2'>
        <img onClick={onClickLeft} className='w-6 h-6 cursor-pointer' src={`assets/${environment.assetPrefix}/icon_arrow_left.png`} alt="leftIcon" />
        <img onClick={onClickRight} className='w-6 h-6 cursor-pointer' src={`assets/${environment.assetPrefix}/icon_arrow_right.png`} alt="rightIcon" />
      </div>
    </div>
  )
}
