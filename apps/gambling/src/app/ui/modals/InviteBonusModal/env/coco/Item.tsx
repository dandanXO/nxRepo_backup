import styled from "styled-components";

import {MoneyButton} from "./MoneyButton";

const StyledItem = styled.div.attrs({
  className: "relative w-full flex flex-row justify-between text-left item-center",
})`
  margin-bottom: 16px;
  margin-top: 10px;
  //background-color: rgba(242, 255, 221, 0.5);


  padding: 4px;
  background: linear-gradient(0deg,#8110bc,#c113f8);
  box-shadow: 0 0.05rem 0.05rem #fb7df6 inset, 0 -0.05rem 0.05rem #52095d inset;
  border: 0.05rem solid #ffdb4c;
  border-radius: 10px;

`

type IItem = {
  title: string;
  money: number;
}
export const Item = (props: IItem) => {
  return (
    <StyledItem>
      <div className={"left flex flex-col"}>
        <div className={"font-bold text-lg text-main-primary-main"}>{props.title}</div>
        <div className={"text-bold text-lg text-main-primary-main"}>Prêmio</div>
      </div>
      <div className={"right"}>
        <MoneyButton money={props.money}/>
      </div>
    </StyledItem>
  )
}
