import cx from "classnames";
import {useState} from "react";
import useBreakpoint from "../../pageTemplate/hooks/useBreakpoint";
import {StyledTabItem as PStyledTabItem} from "./env/pernambucana/StyledTabItem";
import {StyledTabItem as CtyledTabItem} from "./env/coco/StyledTabItem"
import {StyledTabItem as WStyledTabItem} from "./env/wild/StyledTabItem"
import {renderByUVersion} from "../../utils/renderByUVersion";

const StyledTabItem = renderByUVersion({
  "u1": CtyledTabItem,
  "wild777bet": WStyledTabItem,
}, PStyledTabItem)

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
  activeBackground?:string;

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
      activeBackground={props.activeBackground}
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


