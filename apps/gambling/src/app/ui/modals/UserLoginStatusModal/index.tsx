import {renderByPlatform} from "../../utils/renderByPlatform";
import {IUserLoginStatusModal} from "./types";
import {UserLoginStatusModal as CUserLoginStatusModal} from "./env/coco/UserLoginStatusModal";
import {UserLoginStatusModal as RUserLoginStatusModal} from "./env/riojungle/UserLoginStatusModal";

export const UserLoginStatusModal = (props:IUserLoginStatusModal) => {
  return renderByPlatform({
    "coco777bet": <CUserLoginStatusModal {...props} />,
    "riojungle777bet": <RUserLoginStatusModal {...props} />
  }, <CUserLoginStatusModal {...props} />);
}
