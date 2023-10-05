import axios, { AxiosError } from 'axios';
import { put } from 'redux-saga/effects';

import { alertModal } from '../../externel/base/alertModal';
import { SentryModule } from '../../modules/sentry';
import { APIBoundaryModuleSlice } from '../../reduxStore/apiBoundaryModuleSlice';
import {push} from "@lagunovsky/redux-react-router";
import {PageOrModalPathEnum} from "../../ui/PageOrModalPathEnum";

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
