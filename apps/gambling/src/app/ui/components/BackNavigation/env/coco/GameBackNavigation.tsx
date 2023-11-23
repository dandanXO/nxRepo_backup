import {LeftOutlined} from "@ant-design/icons";
import React from "react";
import styled from "styled-components";
import { environment } from "../../../../../../environments/environment";
import useBreakpoint from "../../../../hooks/useBreakpoint";

const BackButton = styled.div`
  left: 20px;
  top: 20px;
  z-index: 99;
  padding: 4px 10px;
  border-radius: 20px;
  text-align: center;
  position: absolute;
  display: flex;
  align-content: center;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

type IGameBackNavigation = {
  onClick?: () => void;
}

export const GameBackNavigation = (props: IGameBackNavigation) => {

  const { isMobile } = useBreakpoint();

  return (
    <BackButton
      className={"fixed top-[10px] left-[10px] p-4 text-white flex flex-row justify-center items-center"}
      onClick={props.onClick}
    >
      <img className={isMobile? 'w-[50px] h-[50px]': 'w-[76px] h-[76px]'} alt='leaveIcon' src={`assets/${environment.assetPrefix}/icon_game_close.png`}/>
    </BackButton>
  )
}
