import {renderByPlatform} from "../../utils/renderByPlatform";
import {IUserLoginStatusModal} from "./types";
import {UserLoginStatusModal as CUserLoginStatusModal} from "./env/coco/UserLoginStatusModal";
import {UserLoginStatusModal as RUserLoginStatusModal} from "./env/riojungle/UserLoginStatusModal";

export const UserLoginStatusModal = (props:IUserLoginStatusModal) => {
  return renderByPlatform({
    "u1": <CUserLoginStatusModal {...props} />,
    "u2": <RUserLoginStatusModal {...props} />
  }, <CUserLoginStatusModal {...props} />);
}
