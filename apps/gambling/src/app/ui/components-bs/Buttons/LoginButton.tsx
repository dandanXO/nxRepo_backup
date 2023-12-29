import {renderByPlatform} from "../../utils/renderByPlatform";
import {LoginButton as PLoginButton} from "./env/pernambucana/LoginButton";
import {LoginButton as WLoginButton} from "./env/wild/LoginButton";
import {LoginButton as CLoginButton} from "./env/coco/LoginButton";

export const LoginButton = renderByPlatform({
  "wild777bet": WLoginButton,
  "coco777bet": CLoginButton,
}, PLoginButton)
