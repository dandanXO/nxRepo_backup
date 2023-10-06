import { AppLocalStorage } from './localstorage';

class UserInfoPersistence {
  set phone(name: string) {
    AppLocalStorage.setItem('phone', name);
  }
  get phone(): string {
    return AppLocalStorage.getItem('phone') || '';
  }
  clearPhone() {
    AppLocalStorage.removeItem('phone');
  }
}
export const userInfoPersistence = new UserInfoPersistence();
