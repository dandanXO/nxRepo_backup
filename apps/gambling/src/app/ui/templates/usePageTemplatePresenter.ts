import {AppLocalStorage} from "../../persistant/localstorage";
import {AppLocalStorageKey} from "../../persistant/AppLocalStorageKey";


export const usePageTemplatePresenter = () => {
  // const app = useContext(AppContext);
  return {
    user: {
      isUserLogin: !!AppLocalStorage.getItem(AppLocalStorageKey.token),
    }
  }
}
