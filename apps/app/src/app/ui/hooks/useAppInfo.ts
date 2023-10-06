import {useSelector} from "react-redux";
import {RootState} from "../../reduxStore";

export const useAppInfo = () => {
  const appName: string =  useSelector((state: RootState) => state.app.appName);
  // TODO: REFACTOR ME NativeAppInfo.packageId 在pureh5 沒有
  const appID: string =  useSelector((state: RootState) => state.app.appID);
  return {
    appName,
    appID,
  }
}
