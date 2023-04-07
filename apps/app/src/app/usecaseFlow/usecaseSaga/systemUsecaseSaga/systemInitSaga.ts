import {call} from "redux-saga/effects";
import {Service} from "../../../services";
import {GetInitServiceResponse} from "../../../services/appService/getInitService";
import {PayloadAction} from "@reduxjs/toolkit";

window["isInAndroid"] = ():boolean => typeof window["onUploadKycBackgroundData"] !== "undefined";
// window["onUploadKycBackgroundData"];

export function *systemInitSaga(action: any) {
  // NOTE: 是否啟用測試渠道(測試不好會出4)
  const packageId = window.isInAndroid() ? "packageId" : "abc.abc.com"
  console.log("packageId", packageId);

  const response: GetInitServiceResponse = yield call(Service.AppService.getInit, {packageId});
  console.log("response", response);
}
