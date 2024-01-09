import {renderByUVersion} from "../../../../utils/renderByUVersion";
import {UserForgetPasswordForm as CUserForgetPasswordForm} from "./env/coco/UserForgetPasswordForm";
import {UserForgetPasswordForm as RUserForgetPasswordForm} from "./env/riojungle/UserForgetPasswordForm";
import {IUserForgetPasswordForm} from "./types";

export const UserForgetPasswordForm = (props: IUserForgetPasswordForm) => {
  return renderByUVersion({
    "u1": (
      <CUserForgetPasswordForm {...props}/>
    ),
    "u2": (
      <RUserForgetPasswordForm {...props}/>
    )
  }, <CUserForgetPasswordForm {...props}/>)
}
