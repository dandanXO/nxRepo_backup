import { appStore } from '../../reduxStore';
import { IndexPageSagaAction } from '../../usecaseFlow/type/userUsecaseSaga/indexPageSaga';

window.onUploadKycBackgroundData = (uploaded: boolean) => {
  appStore.dispatch(
    IndexPageSagaAction.system.KycBackgroundDataUploadedSaga(uploaded)
  );
};
