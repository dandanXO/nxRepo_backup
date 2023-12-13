import styled from "styled-components";

import {MoneyButton} from "./MoneyButton";

const StyledItem = styled.div.attrs({
  className: "relative w-full flex flex-row justify-between text-left item-center",
})`
  margin-bottom: 8px;
  //margin-top: 10px;
  box-shadow: 0 0.05rem 0.05rem #fb7df6 inset, 0 -0.05rem 0.05rem #52095d inset;
  border: 2px solid var(--stroke-popup);
  border-radius: 4px;
  background: linear-gradient(180deg, var(--background-modal-from), var(--background-modal-to));
  //background-color: rgba(242, 255, 221, 0.5);
  padding: 6px 16px;
`

type IItem = {
  title: string;
  money: number;
}
export const Item = (props: IItem) => {
  return (
    <StyledItem>
      <div className={"left flex flex-col"}>
        <div className={"font-bold text-lg text-[var(--text-popup)]"}>{props.title}</div>
        <div className={"text-bold text-lg text-[var(--white)]"}>Prêmio</div>
      </div>
      <div className={"right flex justify-center items-center"}>
        <MoneyButton money={props.money}/>
      </div>
    </StyledItem>
  )
}
