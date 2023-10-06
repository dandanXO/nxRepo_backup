import {appInfoPersistence} from "../persistant/AppInfoPersistence";
import {NativeAppInfo} from "../application/nativeAppInfo";
import queryString from "query-string";

const parsedQueryString = queryString.parse(window.location.search);
console.log("appInfoPersistence.appDomain", appInfoPersistence.appDomain);

export class AppProxy {
  static get appName(): string {
    return appInfoPersistence.appName || NativeAppInfo.appName || parsedQueryString['appName'] ? (parsedQueryString['appName'] as string) : "";
  }
  static get appID(): string {
    return appInfoPersistence.appID || NativeAppInfo.packageId || parsedQueryString['packageId'] ? (parsedQueryString['packageId'] as string) : "";
  }
  static get appDomain(): string {
    return appInfoPersistence.appDomain || NativeAppInfo.domain || parsedQueryString['appDomain'] ? (parsedQueryString['appDomain'] as string) : "";
  }
}
