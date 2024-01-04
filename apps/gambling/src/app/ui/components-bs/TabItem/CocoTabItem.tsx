import useBreakpoint from "../../hooks/useBreakpoint";
import {useState} from "react";
import cx from "classnames";
import {ITabItem} from "./TabItem";

export const CocoTabItem = (props: ITabItem) => {
  const {isMobile} = useBreakpoint();
  const [hover, setHover] = useState(false);
  return (
    <button
      className={cx(
        "px-4 py-1",
        "md:px-6 md:py-1",
        {
          // "w-[96px] text-xl": props.size === "small",
          // "w-[114px] text-xl": props.size === "big" || !isMobile,
          "w-full": props.size === "auto"
        }, props.className)}
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
    </button>
  )
}
