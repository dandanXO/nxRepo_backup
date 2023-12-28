import {renderByPlatform} from "../../utils/renderByPlatform";
import {UserLoginStatusSection as CUserLoginStatusSection} from "./env/coco/UserLoginStatusSection"
import {UserLoginStatusSection as RUserLoginStatusSection} from "./env/riojungle/UserLoginStatusSection"
import {IUserLoginStatusSection} from "./types";


export const UserLoginStatusSection = (props: IUserLoginStatusSection) => {
  return renderByPlatform({
    "coco777bet": (
      <CUserLoginStatusSection {...props} />
    ),
    "riojungle777bet": (
      <RUserLoginStatusSection {...props} />
    )
  }, <CUserLoginStatusSection {...props} />)
}

