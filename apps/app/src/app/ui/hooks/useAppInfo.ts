import {useSelector} from "react-redux";
import {RootState} from "../../reduxStore";
import {NativeAppInfo} from "../../persistant/nativeAppInfo";

export const useAppInfo = () => {
  const appName: string =  useSelector((state: RootState) => state.app.appName);
  const appID: string =  useSelector((state: RootState) => state.app.appID) || NativeAppInfo.packageId
  return {
    appName,
    appID,
  }
}
