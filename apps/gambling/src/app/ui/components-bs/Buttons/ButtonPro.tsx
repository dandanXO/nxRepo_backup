import cx from "classnames";

import {ProButton} from "./ProButton";

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
        }, props.className)}
      onClick={(event) => props.onClick(event)}
    >{props.children}</ProButton>
  )
}
