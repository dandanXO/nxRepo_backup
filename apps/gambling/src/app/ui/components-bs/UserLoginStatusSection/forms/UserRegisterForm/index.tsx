import {renderByUVersion} from "../../../../utils/renderByUVersion";
import {UserRegisterForm as CUserRegisterForm} from "./env/u1/UserRegisterForm";
import {UserRegisterForm as RUserRegisterForm} from "./env/u2/UserRegisterForm";
import {IUserRegisterForm} from "./types";

export const UserRegisterForm = (props: IUserRegisterForm) => {
  return renderByUVersion({
    "u1": (
      <CUserRegisterForm {...props}/>
    ),
    "u2": (
      <RUserRegisterForm {...props}/>
    )
  }, <CUserRegisterForm {...props}/>)
}
