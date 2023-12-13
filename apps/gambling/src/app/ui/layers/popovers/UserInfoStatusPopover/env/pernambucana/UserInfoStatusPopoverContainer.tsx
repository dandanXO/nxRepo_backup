import React from "react";

export const UserInfoStatusPopoverContainer = ({ children }: { children: React.ReactNode}) => (
  <div className='fixed right-[144px] top-[100px] z-10 w-[400px] rounded-2xl p-4 flex flex-col flex-between text-sm bg-assistant'>
    {children}
  </div>
)
