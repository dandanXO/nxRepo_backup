import {LeftOutlined} from "@ant-design/icons";
import React from "react";
import styled from "styled-components";

type IProps = {
  onClick?: () => void;
  title?: React.ReactNode;
}

export const BackNavigation = (props: IProps) => {
  return (
    <div className={"ml-3 mt-3 mb-3 text-xl text-left text-white"}>
      <button
        // className='flex items-center text-2xl text-[#ff97ef] ml-[6vw]'
        className={'w-full mb-2 flex flex-row items-center justify-start'}
        onClick={() => props.onClick && props.onClick()}
      >
        <LeftOutlined />
        {props.title ? props.title : <div className={'ml-2'}>Retornar</div>}
      </button>
    </div>
  )
}
