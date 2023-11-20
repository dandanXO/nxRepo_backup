import React from "react";
import { IUserInfoStatusPopoverNavigatorProps, OtherContainer } from "../../index";
import { RightOutlined } from "@ant-design/icons";

export const UserInfoStatusPopoverNavigator = ({
  children,
  onClick
}: IUserInfoStatusPopoverNavigatorProps) => {
  return (
    <OtherContainer
      className='flex justify-between py-3 px-[14px] text-white text-base cursor-pointer'
      onClick={onClick}
    >
      {children}
      <RightOutlined />
    </OtherContainer>
  )
}
