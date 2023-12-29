import {renderByPlatform} from "../../../../utils/renderByPlatform";
import {UserForgetPasswordForm as CUserForgetPasswordForm} from "./env/coco/UserForgetPasswordForm";
import {UserForgetPasswordForm as RUserForgetPasswordForm} from "./env/riojungle/UserForgetPasswordForm";
import {IUserForgetPasswordForm} from "./types";

export const UserForgetPasswordForm = (props: IUserForgetPasswordForm) => {
  return renderByPlatform({
    "coco777bet": (
      <CUserForgetPasswordForm {...props}/>
    ),
    "riojungle777bet": (
      <RUserForgetPasswordForm {...props}/>
    )
  }, <CUserForgetPasswordForm {...props}/>)
}
