import {PageOrModalPathEnum} from "../../PageOrModalPathEnum";
import {useNavigate} from "react-router";
import {LeftOutlined} from "@ant-design/icons";
import React from "react";
import styled from "styled-components";

type IProps = {
  onClick?: () => void;
}
export const BackNavigation = (props: IProps) => {
  return (
    <div className={"mt-2 text-xl text-left text-white"}>
      <button
        // className='flex items-center text-2xl text-[#ff97ef] ml-[6vw]'
        className={'mb-4 flex flex-row items-center'}
        onClick={() => props.onClick && props.onClick()}
      >
        <LeftOutlined />
      </button>
      <div className={''}>Retornar</div>
    </div>
  )
}


const BackButton = styled.div`
  left: 20px;
  top: 20px;
  z-index: 99;
  padding: 4px 10px;
  border-radius: 20px;
  text-align: center;
  background: linear-gradient(60deg,#3378EE 0%,#0DE5FF 100%);
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
  return (
    <BackButton
      className={"fixed top-[10px] left-[10px] p-4 text-white flex flex-row justify-center items-center"}
      onClick={props.onClick}
    >
      <LeftOutlined className={"mr-1text-white text-base relative top-[-2px] left-[-3px]"}/>
      <div>Retornar</div>
    </BackButton>
  )
}
