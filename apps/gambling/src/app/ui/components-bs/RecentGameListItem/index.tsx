import React from "react";
import { environment } from "../../../../environments/environment";
import { tcx } from "../../utils/tcx";
import useBreakpoint from "../../hooks/useBreakpoint";

interface IRecentGameItemProps {
  gameId: number;
  onClick: () => void;
  className?: string;
}

export const RecentGameItem = ({
  gameId,
  onClick,
  className
 }: IRecentGameItemProps) => {
  const { isMobile } = useBreakpoint()

  return (
    <div onClick={onClick} className={tcx('flex-shrink-0 cursor-pointer w-[108px] h-[108px]',['w-[60px] h-[60px]', isMobile], className)}>
      <img
        className='rounded-md hover:blur-[2px] hover:brightness-50'
        alt={`game${gameId}`}
        src={`${environment.s3URLImages}/${gameId}-small.png`}
      />
    </div>
  )
}
