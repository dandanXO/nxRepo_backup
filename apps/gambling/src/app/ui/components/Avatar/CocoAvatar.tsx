import {Avatar} from "./index";
import {AvatarContainer} from "../../header/env/coco/AvatarContainer";

export const CocoAvatar = () => {
  return (
    <AvatarContainer className={"w-[60px] h-[60px]"}>
      <Avatar className={"rounded-[2px]"}/>
    </AvatarContainer>
  )
}
