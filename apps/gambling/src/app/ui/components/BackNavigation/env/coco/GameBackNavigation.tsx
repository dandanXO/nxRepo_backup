import React from "react";
import styled from "styled-components";
import {ArrowLeft} from "../../../Icons/ArrowLeft";

type IGameBackNavigation = {
  onClick?: () => void;
}

export const GameBackNavigation = (props: IGameBackNavigation) => {
  return (
    <div className="bg-[#1a1a1a] flex flex-row w-full items-center h-[40px] md:h-[52px] lg:h-[56px] py-3 px-6 fixed">
      <span onClick={() => props.onClick && props.onClick()}>
        <ArrowLeft className='relative z-10 text-white mr-1'/>
      </span>
      <div className="text-base md:text-lg lg:text-2xl font-medium leading-6 md:leading-7 lg:leading-8 text-white">Retornar</div>
    </div>
  )
}
