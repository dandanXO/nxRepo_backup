import {renderByUVersion} from "../../../../utils/renderByUVersion";
import {UserLoginForm as CUserLoginForm} from "./env/coco/UserLoginForm";
import {UserLoginForm as RUserLoginForm} from "./env/riojungle/UserLoginForm";
import {IUserLoginForm} from "./types";

export const UserLoginForm = (props: IUserLoginForm) => {
  return renderByUVersion({
    "u1": (
      <CUserLoginForm {...props} />
    ),
    "u2": (
      <RUserLoginForm {...props} />
    )
  }, <CUserLoginForm {...props} />)
}

