import axios, {AxiosError} from "axios";
import {put} from "redux-saga/effects";
import {APIBoundaryModuleSlice} from "../reduxStore/APIBoundaryModule";

export function* catchSagaError(error: any) {
  if (axios.isAxiosError(error)) {
    const axiosError: AxiosError = error;
    if (axiosError?.response?.status === 401) {
      yield put(APIBoundaryModuleSlice.actions.update({
        show: true,
        title: "Error",
        message: "Please login again.",
      }));
    }
  } else {
    console.log("[APP] error", error);
  }
}
