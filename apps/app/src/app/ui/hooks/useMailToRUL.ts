import { useAppInfo } from "./useAppInfo";
import {useUserPhoneNumber} from "./useUserPhoneNumber";
import {useSelector} from "react-redux";
import {RootState} from "../../reduxStore";

export const useMailToRUL = (content: string) => {
  const {appName} = useAppInfo();
  const {phoneNumber} = useUserPhoneNumber();
  const app =  useSelector((state: RootState) => state.app);
  const mailToURL = `mailto:${app?.init?.csEmail || ''}?subject=Feedback&body=App:%20${appName}%0D%0AName:%20${content}%0D%0APhone:%20${phoneNumber}`;
  return {
    mailToURL,
  };
}
