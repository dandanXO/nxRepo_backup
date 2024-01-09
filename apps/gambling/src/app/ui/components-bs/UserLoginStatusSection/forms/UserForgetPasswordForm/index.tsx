import {renderByPlatform} from "../../../../utils/renderByPlatform";
import {UserForgetPasswordForm as CUserForgetPasswordForm} from "./env/coco/UserForgetPasswordForm";
import {UserForgetPasswordForm as RUserForgetPasswordForm} from "./env/riojungle/UserForgetPasswordForm";
import {IUserForgetPasswordForm} from "./types";

export const UserForgetPasswordForm = (props: IUserForgetPasswordForm) => {
  return renderByPlatform({
    "u1": (
      <CUserForgetPasswordForm {...props}/>
    ),
    "u2": (
      <RUserForgetPasswordForm {...props}/>
    )
  }, <CUserForgetPasswordForm {...props}/>)
}
