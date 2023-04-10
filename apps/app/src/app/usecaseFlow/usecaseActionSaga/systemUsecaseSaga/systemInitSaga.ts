import {call, put} from "redux-saga/effects";
import {Service} from "../../../api";
import {PayloadAction} from "@reduxjs/toolkit";
import {appSlice} from "../../reduxStore/appSlice";
import {GetInitServiceResponse} from "../../../api/appService/GetInitServiceResponse";
import {catchSagaError} from "../../utils/catchSagaError";
import {GetUserInfoServiceResponse} from "../../../api/userService/GetUserInfoServiceResponse";
import {indexPageSlice} from "../../reduxStore/indexPageSlice";

window["isInAndroid"] = ():boolean => typeof window["onUploadKycBackgroundData"] !== "undefined";
// window["onUploadKycBackgroundData"];

export function *systemInitSaga(action: PayloadAction<null>) {
  try {
    // FIXME:
    // NOTE: 是否啟用測試渠道(測試不好會出4)
    const packageId = window.isInAndroid() ? "packageId" : "abc.abc.com"
    console.log("packageId", packageId);

    const response: GetInitServiceResponse = yield call(Service.AppService.getInit, {packageId});
    console.log("response", response);

    yield put(appSlice.actions.updateInit(response));


    // NOTE: User
    const userResponse: GetUserInfoServiceResponse = yield call(Service.UserService.GetUserInfoService, {});
    yield put(indexPageSlice.actions.updateUserAPI(userResponse));

  } catch (error) {
    yield catchSagaError(error);
  }
}
