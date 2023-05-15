import { appStore } from '../../reduxStore';
import { IndexPageSagaAction } from '../../presentation/pages/IndexPage/userUsecaseSaga';

window.onUploadKycBackgroundData = (uploaded: boolean) => {
  appStore.dispatch(
    IndexPageSagaAction.system.KycBackgroundDataUploadedSaga(uploaded)
  );
};
