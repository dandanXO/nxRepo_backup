import styled from "styled-components";
import {UserMoneyStatusSection} from "../../header/UserMoneyStatusSection";
import React from "react";

export const RegisterButton = styled.button`
  width: 150px;
  height: 30px;
  border-radius: 25px;
  background: linear-gradient(180deg,#56F0D6 0%,#8499FD 99%);
`

type IProps = {
  children: React.ReactNode;
  onClick: () => void;
}
export const RegisterButton2 = (props: IProps) => {
  return (
    <div className={"rounded-[5px] !bg-[#1A3084] py-[5px] px-[50px] text-white text-bold shadow-[0_1px_#1f6dc8]"} onClick={() => props.onClick()}>
      {props.children}
    </div>
  )
}
