import React from "react";

export const UserInfoStatusPopoverContainer = ({ children, onMouseLeave }: { children: React.ReactNode; onMouseLeave: () => void;}) => (
  <div
    className={`
      fixed right-[144px] top-[66px] z-10 w-[396px] flex flex-col flex-between gap-3
      rounded-2xl px-4 py-6 text-sm bg-[var(--primary-variant)] border-[2px] border-[var(--primary-assistant)]
    `}
     onMouseLeave={onMouseLeave}
  >
    {children}
  </div>
)
