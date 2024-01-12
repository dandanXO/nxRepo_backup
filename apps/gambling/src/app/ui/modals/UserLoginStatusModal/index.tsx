import {renderByUVersion} from "../../utils/renderByUVersion";
import {IUserLoginStatusModal} from "./types";
import {UserLoginStatusModal as CUserLoginStatusModal} from "./env/u1/UserLoginStatusModal";
import {UserLoginStatusModal as RUserLoginStatusModal} from "./env/u2/UserLoginStatusModal";

export const UserLoginStatusModal = (props:IUserLoginStatusModal) => {
  return renderByUVersion({
    "u1": <CUserLoginStatusModal {...props} />,
    "u2": <RUserLoginStatusModal {...props} />
  }, <CUserLoginStatusModal {...props} />);
}
