import {RightOutlined} from "@ant-design/icons";
import React from "react";

type IProps = {
  onClick?: () => void;
  title: string;
}
export const ListItem = (props: IProps) => {
  return (
    <button
      className='p-3 flex justify-between border-b-[0.1px] border-black border-opacity-10 items-center w-full'
      onClick={() => props && props.onClick && props.onClick()}
    >
      <div>{props.title}</div>
      <RightOutlined style={{ fontSize: 16 }}/>
    </button>
  )
}
