import styled from "styled-components";
import {PageOrModalPathEnum} from "../PageOrModalPathEnum";
import cx from "classnames";

export const Button = styled.button`
  display: flex;;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 4px 20px;
  border-radius: 8px;
  //box-shadow: inset 0 0 3rem 0.1rem rgba(255,255,255,.08);
  color: #FFFFDE;

  width: 100%;
  height: 50px;
`


export const ProButton = styled.button`
  border-radius: 40px;
  padding: 18px 104px;
  display: flex;;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
type IButtonPro = {
  type?: "green" | "blue",
  size?: "small" | "medium" | "big",
  children: React.ReactNode | string;
  onClick: (event: any) => void;
  className?: string;
}
export const ButtonPro = (props: IButtonPro) => {
 return (
   <ProButton
     className={cx("bg-gradient-to-b text-main-primary-varient font-bold",
       {
         "text-base": !props.size || props.size === "small",
         "text-xl": props.size === "medium",
         "text-2xl": !props.size || props.size === "big",
         "w-[140px] h-[45px]": props.size === "small",
         "w-[428px] h-[65px]": props.size === "medium",
         "w-[520px] h-[80px]": !props.size || props.size === "big",
         "from-[var(--btn-gradient1-from)] to-[var(--btn-gradient1-to)]": !props.type || props.type === "green",
         "from-[var(--btn-gradient2-from)] to-[var(--btn-gradient2-to)]": props.type === "blue",
       },props.className)}
     onClick={(event) => props.onClick(event)}
   >{props.children}</ProButton>
 )
}
