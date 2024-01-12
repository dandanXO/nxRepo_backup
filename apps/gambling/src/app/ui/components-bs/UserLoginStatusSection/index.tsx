import {renderByUVersion} from "../../utils/renderByUVersion";
import {UserLoginStatusSection as CUserLoginStatusSection} from "./env/u1/UserLoginStatusSection"
import {UserLoginStatusSection as RUserLoginStatusSection} from "./env/u2/UserLoginStatusSection"
import {IUserLoginStatusSection} from "./types";


export const UserLoginStatusSection = (props: IUserLoginStatusSection) => {
  return renderByUVersion({
    "u1": (
      <CUserLoginStatusSection {...props} />
    ),
    "u2": (
      <RUserLoginStatusSection {...props} />
    )
  }, <CUserLoginStatusSection {...props} />)
}

