import {LeftOutlined} from "@ant-design/icons";
import React from "react";
import styled from "styled-components";
import { tcx } from "../../../../utils/tcx";

type IProps = {
  onClick?: () => void;
  title?: React.ReactNode;
  className?: string;
}

export const BackNavigation = (props: IProps) => {
  return (
    <div className={tcx("relative pl-3 pt-3 pb-3 text-xl text-left text-white", props.className)}>
      <div
        // className='flex items-center text-2xl text-[#ff97ef] ml-[6vw]'
        className={'mb-2 flex flex-row items-center justify-start'}
      >
        <LeftOutlined className='relative z-10' onClick={() => props.onClick && props.onClick()}/>
        {props.title ? props.title : <div className={'ml-2'}>Retornar</div>}
      </div>
    </div>
  )
}
