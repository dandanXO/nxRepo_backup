import axios, {AxiosError} from "axios";
import {put} from "redux-saga/effects";
import {APIBoundaryModuleSlice} from "../reduxStore/apiBoundaryModuleSlice";
import {alertModal} from "../../services/base/alertModal";

export function* catchSagaError(error: any) {
  // console.log("catchSagaError.error", error);
  if (axios.isAxiosError(error)) {
    const axiosError: AxiosError = error;
    // if (axiosError?.response?.status === 401) {
    //   yield put(APIBoundaryModuleSlice.actions.update({
    //     show: true,
    //     title: "Error",
    //     message: "Please login again.",
    //   }));
    // }
    alertModal((axiosError?.response?.data as any).message as string)
  } else {
    alertModal(error);
  }
  yield false;
}
