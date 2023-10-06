import axios, { AxiosError } from 'axios';

import { SentryModule } from '../../modules/sentry';

export function* catchSagaError(error: any) {
  // console.log('catchSagaError.error', error);
  if (axios.isAxiosError(error)) {
    const axiosError: AxiosError = error;
    // if (axiosError?.response?.status === 401) {
    //   yield put(APIBoundaryModuleSlice.actions.update({
    //     show: true,
    //     title: "Error",
    //     message: "Please login again.",
    //   }));
    // }
  } else {
    // NOTICE: 可能不是純字串
    // alertModal(error, "Warning");
  }

  SentryModule.captureException(error);

  yield false;
}
