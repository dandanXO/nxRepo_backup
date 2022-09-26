import {useLoginMutation} from "../../../api";
import {useEffect} from "react";

const useLogin = () => {
  const [triggerLogin, { isSuccess: isLoginSuccess }] = useLoginMutation();

  useEffect(() => {
    if (window.top == window.self) {
      // Top level window
      console.log("[Debug][iframe] i'm master")
      if (!isLoginSuccess) {
        triggerLogin({
          phoneNo: "19888888888",
          code: "123456"
        });
      }
    } else {
      // Not top level. An iframe, popup or something
      console.log("[Debug][iframe] inner parent window")
    }

  }, [triggerLogin, isLoginSuccess])
  return [isLoginSuccess]
}
