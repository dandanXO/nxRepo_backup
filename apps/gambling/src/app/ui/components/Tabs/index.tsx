import React, {ReactElement} from "react";
import {twMerge} from "tailwind-merge";

type ITabs = {
  children: ReactElement[];
  className?: string;
}
export const Tabs = (props: ITabs) => {
  return (
    <div className={twMerge("bg-[#333333] flex flex-row rounded-[100px]", props.className)}>
      {props.children}
    </div>
  )
}
