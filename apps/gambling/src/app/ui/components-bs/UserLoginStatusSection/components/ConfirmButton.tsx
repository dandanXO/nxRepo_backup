import {twMerge} from "tailwind-merge";
import {ConfirmButton as COCOConfirmButton } from "../../theme/Buttons/ConfirmButton";
import {renderByPlatform} from "../../../utils/renderByPlatform";

type IButton = {
  children: React.ReactNode;
  disable?: boolean;
}
const RiojungleConfirmButton = (props: IButton) => {
  return (
    <button
      className={twMerge(
        "rounded-lg",
        "shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)]",
        "bg-[#8547eb]",
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
    <COCOConfirmButton className="!w-full text-sm md:text-base my-2">{props.children}</COCOConfirmButton>
  )
}


export const ConfirmButton = (props: IButton) => {
  return renderByPlatform({
    "coco777bet": <CocoConfirmButton {...props}/>,
    "riojungle777bet": <RiojungleConfirmButton {...props}/>,
  }, <CocoConfirmButton {...props}/>)
}
