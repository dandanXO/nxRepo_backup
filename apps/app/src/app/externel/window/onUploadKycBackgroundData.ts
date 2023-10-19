import { appStore } from '../../reduxStore';
import { IndexPageSagaAction } from '../../ui/pages/IndexPage/userUsecaseSaga/indexPageActions';

// NOTE: 監聽 Native 返回是否執行背景上傳
window.onUploadKycBackgroundData = (uploaded: boolean) => {
  console.log('onUploadKycBackgroundData.uploaded', uploaded);
  appStore.dispatch(
    IndexPageSagaAction.system.KycBackgroundDataUploadedSaga(uploaded)
  );
};