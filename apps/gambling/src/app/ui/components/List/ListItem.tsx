import {RightOutlined} from "@ant-design/icons";
import React from "react";
import cx from "classnames";

type IProps = {
  onClick?: () => void;
  title: React.ReactNode;
  isEnd?: boolean;
  className?: string;
}
export const ListItem = (props: IProps) => {
  return (
    <button
      className={cx('p-3 flex justify-between border-[var(--primary-assistant)] items-center w-full', {
        "border-b-[0.1px]": !props.isEnd,
      },props.className)}
      onClick={() => props && props.onClick && props.onClick()}
    >
      <div className={"w-full text-left"}>{props.title}</div>
      {props.onClick && <RightOutlined style={{ fontSize: 16 }}/>}
    </button>
  )
}
