import { IndexPageSagaAction } from '../../presentation/pages/IndexPage/userUsecaseSaga/indexPageActions';
import { appStore } from '../../reduxStore';

// NOTE: 監聽 Native 返回是否執行背景上傳
window.onUploadKycBackgroundData = (uploaded: boolean) => {
  appStore.dispatch(IndexPageSagaAction.system.KycBackgroundDataUploadedSaga(uploaded));
};
