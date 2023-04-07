import {call} from "redux-saga/effects";
import {Service} from "../../../services";

export function *systemInitSaga() {
  yield call(Service.AppService.getInit, {packageId: ""});
}
