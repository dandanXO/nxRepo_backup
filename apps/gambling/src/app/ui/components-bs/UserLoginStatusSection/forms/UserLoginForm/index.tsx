import {renderByUVersion} from "../../../../utils/renderByUVersion";
import {UserLoginForm as CUserLoginForm} from "./env/u1/UserLoginForm";
import {UserLoginForm as RUserLoginForm} from "./env/u2/UserLoginForm";
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

