import { AppLocalStorage } from './localstorage';

class AppInfoPersistence {
  set appName(name: string) {
    AppLocalStorage.setItem('appName', name);
  }
  get appName(): string {
    return AppLocalStorage.getItem('appName') || '';
  }
  set appID(id: string) {
    AppLocalStorage.setItem('appID', id);
  }
  get appID(): string {
    return AppLocalStorage.getItem('appID') || '';
  }

  set appDomain(domain: string) {
    AppLocalStorage.setItem('appDomain', domain);
  }

  get appDomain(): string {
    return AppLocalStorage.getItem('appDomain') || '';
  }
}
export const appInfoPersistence = new AppInfoPersistence();
