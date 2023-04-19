import {appStore} from "../../usecaseFlow/reduxStore";
import {SystemCaseActions} from "../../usecaseFlow/usecaseActionSaga/systemUsecaseSaga/systemCaseActions";

window.onUploadKycBackgroundData = (uploaded: boolean) => {
  appStore.dispatch(SystemCaseActions.SystemKycBackgroundDataUploadedSaga(uploaded));
}
