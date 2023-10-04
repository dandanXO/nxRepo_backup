class AppInfoPersistence {
  set appName(name: string) {
    localStorage.setItem("appName", name);
  }
  get appName(): string {
    return localStorage.getItem("appName") || "";
  }
  set appID(id: string) {
    localStorage.setItem("appID", id);
  }
  get appID(): string {
    return localStorage.getItem("appID") || "";
  }
}
export const appInfoPersistence = new AppInfoPersistence();
