import {AppLocalStorage} from "../../persistant/localstorage";


export const usePageTemplatePresenter = () => {
  // const app = useContext(AppContext);
  return {
    user: {
      isUserLogin: !!AppLocalStorage.getItem("token"),
    }
  }
}
