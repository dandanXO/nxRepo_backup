import styled from "styled-components";
import cx from "classnames";
import {useState} from "react";
import { environment } from "apps/gambling-dashboard/src/environments/environment";
import useBreakpoint from "../hooks/useBreakpoint";


export type ITabs = {
  children: React.ReactElement[];
  className?: string;
}
export const Tabs = (props: ITabs) => {
  return (
    <section className={cx("flex flex-row ", props.className)}>
      {props.children}
    </section>
  )
}

export type ITabItem = {
  pureColor?: boolean;
  name?: string;
  active: boolean;
  className?: string;
  size?: "small" | "normal" | "big" | "auto",
  onClick?: () => void;
}

export const StyledTabItem = styled.button<ITabItem>`
  //min-width: 96px;
  //min-height: 35px;
  color: var(--white);
  ${(props) => {
    if(props.pureColor === true) {
      if(!props.active) {
        return `
          color: var(--white);
        `;
      } else {
        return `
          color: var(--main-primary-varient);
          border: 1px solid var(--white);
        `
      }
    }
  }};
  ${(props) => {
    if(!props.pureColor) {
      return props.active && `
        background: url("assets/${environment.assetPrefix}/select_btn.png");
        background-size: 100% 100%;
        background-position:  center;
      `;
    } else {
      if(props.active) {
        return `
          background: linear-gradient(90deg, var(--btn-gradient1-from), var(--btn-gradient1-to));
          border-radius: 8px;
        `;
      } else {
        return `
          background: var(--assistant);
          border-radius: 8px;
        `
      }

    }
  }}
`;

export const TabItem = (props: ITabItem) => {
  const {isMobile} = useBreakpoint();
  const [hover, setHover] = useState(false);
  return (
    <StyledTabItem
      pureColor={props.pureColor}
      className={cx(
        "px-4 py-1",
              "md:px-6 md:py-1",
        {
          // "w-[96px] text-xl": props.size === "small",
          // "w-[114px] text-xl": props.size === "big" || !isMobile,
          "w-full": props.size === "auto"
        }, props.className)}
      active={props.active}
      onClick={() => props.onClick && props.onClick()}
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseOut={() => {
        setHover(false)
      }}
    >
      <div
        className={cx(
          "",
          {
          // "text-transparent": props.active || hover,
          // "font-bold": props.active,
          // "font-medium": !props.active,
        })}
      >{props.name}</div>
    </StyledTabItem>
  )
}
