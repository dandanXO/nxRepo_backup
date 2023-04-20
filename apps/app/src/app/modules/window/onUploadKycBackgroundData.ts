import {appStore} from "../../usecaseFlow/reduxStore";
import {SystemCaseActions} from "../../usecaseFlow/usecaseActionSaga/systemUsecaseSaga/systemCaseActions";
import {IndexPageSagaAction} from "../../usecaseFlow/usecaseActionSaga/userUsecaseSaga/indexPageSaga";

window.onUploadKycBackgroundData = (uploaded: boolean) => {
  appStore.dispatch(IndexPageSagaAction.system.KycBackgroundDataUploadedSaga(uploaded));
}
