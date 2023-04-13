import {appStore} from "../../usecaseFlow/reduxStore";
import {SystemCaseActions} from "../../usecaseFlow/usecaseAction/systemCaseActions";

window.onUploadKycBackgroundData = (uploaded: boolean) => {
  appStore.dispatch(SystemCaseActions.SystemKycBackgroundDataUploadedSaga(uploaded));
}
