import {renderByUVersion} from "../../utils/renderByUVersion";
import {LoginButton as PLoginButton} from "./env/pernambucana/LoginButton";
import {LoginButton as WLoginButton} from "./env/wild/LoginButton";
import {LoginButton as CLoginButton} from "./env/u1/LoginButton";

export const LoginButton = renderByUVersion({
  "wild777bet": WLoginButton,
  "u1": CLoginButton,
}, PLoginButton)
