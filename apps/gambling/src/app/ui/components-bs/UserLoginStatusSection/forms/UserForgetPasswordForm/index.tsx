import {renderByUVersion} from "../../../../utils/renderByUVersion";
import {UserForgetPasswordForm as CUserForgetPasswordForm} from "./env/u1/UserForgetPasswordForm";
import {UserForgetPasswordForm as RUserForgetPasswordForm} from "./env/u2/UserForgetPasswordForm";
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
