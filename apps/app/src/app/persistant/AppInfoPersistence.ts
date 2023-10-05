import {AppLocalStorage} from "./localstorage";

class AppInfoPersistence {
  set appName(name: string) {
    AppLocalStorage.setItem("appName", name);
  }
  get appName(): string {
    return AppLocalStorage.getItem("appName") || "";
  }
  set appID(id: string) {
    AppLocalStorage.setItem("appID", id);
  }
  get appID(): string {
    return AppLocalStorage.getItem("appID") || "";
  }
}
export const appInfoPersistence = new AppInfoPersistence();
