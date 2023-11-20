import React from "react";
import { IUserInfoStatusPopoverNavigatorProps, OtherContainer } from "../../index";
import { RightOutlined } from "@ant-design/icons";
import styled from "styled-components";

const Container = styled.div`
  background: rgb(from var(--primary-assistant) r g b / 20%);
`

export const UserInfoStatusPopoverNavigator = ({
  children,
  onClick
}: IUserInfoStatusPopoverNavigatorProps) => {
  return (
    <Container
      className='rounded-xl flex justify-between py-3 px-[14px] text-white text-base cursor-pointer items-center'
      onClick={onClick}
    >
      {children}
      <RightOutlined />
    </Container>
  )
}
