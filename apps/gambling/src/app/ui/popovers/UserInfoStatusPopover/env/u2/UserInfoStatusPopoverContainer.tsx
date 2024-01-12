import React from "react";

interface IUserInfoStatusPopoverContainerProps {
  children: React.ReactNode
}

export const UserInfoStatusPopoverContainer = ({
  children,
}: IUserInfoStatusPopoverContainerProps) => (
  <div
    className='fixed z-10 right-0 top-[72px] bottom-0 w-[400px] border-t border-[var(--grayscale-50)] rounded-tl-2xl rounded-bl-2xl bg-[var(--grayscale-20)] overflow-y-auto'
    onClick={(e)=>{
      e.stopPropagation();
    }}
  >
    {children}
  </div>
)
