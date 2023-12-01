import React from "react";

type IProps = {
  children: React.ReactNode;
}
export const ListHeader = (props: IProps) => {
  return (
    <div className='p-3 font-bold border-b-[0.1px] border-[var(--primary-assistant)]'>{props.children}</div>
  )
}
