import {MenuDrawerContent} from "./MenuDrawerContent";
import {MenuDrawerContainer} from "../../MenuDrawerContainer";
import React from "react";

export const MenuDrawer = () => {
  return (
    <MenuDrawerContainer
      className={""}
      isTabletShow={false}
      isShowCloseButton={false}
    >
      <MenuDrawerContent/>
    </MenuDrawerContainer>
  )
}
