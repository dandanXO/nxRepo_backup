import {Avatar} from "./index";
import {AvatarContainer} from "../../pageTemplate/header/env/coco/AvatarContainer";
import { tcx } from "../../utils/tcx";

interface ICocoAvatarProps {
  className?: string
}

export const CocoAvatar = ({
  className
}: ICocoAvatarProps) => {
  return <Avatar className={tcx("!rounded-[2px] w-[59px] h-[59px]", className)}/>
  // return (
  //   <AvatarContainer className={"w-[44px] h-[44px] relative"}>
  //     <Avatar className={"!rounded-[2px]"}/>
  //   </AvatarContainer>
  // )
}
