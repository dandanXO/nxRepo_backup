import React from "react";

type IProps = {
  children: React.ReactNode;
}
export const ListHeader = (props: IProps) => {
  return (
    <div className='p-3 text-[#ffb413]'>{props.children}</div>
  )
}
