import {renderByPlatform} from "../../../../utils/renderByPlatform";
import {UserRegisterForm as CUserRegisterForm} from "./env/coco/UserRegisterForm";
import {UserRegisterForm as RUserRegisterForm} from "./env/riojungle/UserRegisterForm";
import {IUserRegisterForm} from "./types";

export const UserRegisterForm = (props: IUserRegisterForm) => {
  return renderByPlatform({
    "coco777bet": (
      <CUserRegisterForm {...props}/>
    ),
    "riojungle777bet": (
      <RUserRegisterForm {...props}/>
    )
  }, <CUserRegisterForm {...props}/>)
}
