import React from "react";
import styled from "styled-components";
import {ArrowLeft} from "../../../../components-bs/theme/Icons/ArrowLeft";
import cx from "classnames";

type IGameBackNavigation = {
  onClick?: () => void;
  className?: string;
}

export const GameBackNavigation = (props: IGameBackNavigation) => {
  return (
    <div className={cx("bg-[#1a1a1a] flex flex-row w-full items-center py-3 px-6 fixed", props.className)}>
      <span onClick={() => props.onClick && props.onClick()}>
        <ArrowLeft className='relative z-10 text-white mr-1'/>
      </span>
      <div className="text-base md:text-lg lg:text-2xl font-medium leading-6 md:leading-7 lg:leading-8 text-white">Retornar</div>
    </div>
  )
}
