import cx from "classnames";
import {useState} from "react";
import useBreakpoint from "../../hooks/useBreakpoint";
import {environment} from "../../../../environments/environment";

import {StyledTabItem as Pernambucana} from "./env/pernambucana/StyledTabItem";
import {StyledTabItem as Coco} from "./env/coco/StyledTabItem"
const StyledTabItem = environment.assetPrefix === "coco777bet" ? Coco : Pernambucana;

export type ITabs = {
  children: React.ReactElement | React.ReactElement[];
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
  active: boolean;
  pureColor?: boolean;
  name?: string;
  className?: string;
  size?: "small" | "normal" | "big" | "auto";
  onClick?: () => void;
  background?:string;

  mode?: "howto" | "data";
  children?: React.ReactNode;
}

export const TabItem = (props: ITabItem) => {
  const { isMobile } = useBreakpoint();
  const [hover, setHover] = useState(false);
  return (
    <StyledTabItem
      mode={props.mode}
      pureColor={props.pureColor}
      background={props.background}
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


