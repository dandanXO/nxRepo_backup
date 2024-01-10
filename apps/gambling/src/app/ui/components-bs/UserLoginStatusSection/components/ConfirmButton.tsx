import {twMerge} from "tailwind-merge";
import {ConfirmButton as COCOConfirmButton } from "../../Buttons/ConfirmButton";
import {renderByUVersion} from "../../../utils/renderByUVersion";
import cx from "classnames";

type IButton = {
  children: React.ReactNode;
  disable?: boolean;
  className?: string;
}
const RiojungleConfirmButton = (props: IButton) => {
  return (
    <button
      className={twMerge(
        "rounded-lg",
        "shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)]",
        "bg-[var(--primary-main)]",
        "w-full",
        "py-3",
        "text-sm md:text-base lg:text-lg text-white",
        "cursor-pointer",
        "flex flex-row justify-center",
        props.disable && "opacity-[0.7]"
      )}
    >{props.children}</button>
  )
}


const CocoConfirmButton = (props: IButton) => {
  return (
    <COCOConfirmButton className={cx("!w-full text-sm md:text-base my-2", props.className)}>{props.children}</COCOConfirmButton>
  )
}


export const ConfirmButton = (props: IButton) => {
  return renderByUVersion({
    "u1": <CocoConfirmButton {...props}/>,
    "u2": <RiojungleConfirmButton {...props}/>,
  }, <CocoConfirmButton {...props}/>)
}
