import {renderByPlatform} from "../../../../utils/renderByPlatform";
import {UserLoginForm as CUserLoginForm} from "./env/coco/UserLoginForm";
import {UserLoginForm as RUserLoginForm} from "./env/riojungle/UserLoginForm";
import {IUserLoginForm} from "./types";

export const UserLoginForm = (props: IUserLoginForm) => {
  return renderByPlatform({
    "coco777bet": (
      <CUserLoginForm {...props} />
    ),
    "riojungle777bet": (
      <RUserLoginForm {...props} />
    )
  }, <CUserLoginForm {...props} />)
}

