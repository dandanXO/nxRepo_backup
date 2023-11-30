import React from "react";

interface IMobileRecentGameHeaderProps {
  count: number
}

export const MobileRecentGameHeader = ({
  count
}: IMobileRecentGameHeaderProps) => {
  return (
    <div className='flex gap-2 font-bold items-center'>
      <div className='text-xl text-white'>Recente</div>
      <div className='text-sm text-[var(--secondary-assistant)]'>+{count}</div>
    </div>
  )
}
