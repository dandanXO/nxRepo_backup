import {LeftOutlined} from "@ant-design/icons";
import React from "react";
import styled from "styled-components";

type IProps = {
  onClick?: () => void;
}

export const BackNavigation = (props: IProps) => {
  return (
    <div className={"ml-3 mt-3 mb-3 text-xl text-left text-white"}>
      <button
        // className='flex items-center text-2xl text-[#ff97ef] ml-[6vw]'
        className={'mb-2 flex flex-row items-center'}
        onClick={() => props.onClick && props.onClick()}
      >
        <LeftOutlined />
      </button>
      <div className={''}>Retornar</div>
    </div>
  )
}

