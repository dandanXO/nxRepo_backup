// NOTE: Action: UserApplyProduct
import {UserServiceResponse} from "../../services/userService/userService";
import {call, put} from "redux-saga/effects";
import {Service} from "../../services";
import {GetOpenIndexResponse} from "../../services/indexService/getOpenIndexService";
import {GetIndexResponse} from "../../services/indexService/getIndexService";
import {USER_AUTH_STATE} from "../index";
import {indexPageSlice} from "../storeSlice/indexPageSlice";

function* userViewIndexPageSaga() {
  const userResponse: UserServiceResponse = yield call(Service.UserService, {});
  yield put(indexPageSlice.actions.updateUserAPI(userResponse));

  if (userResponse.status === USER_AUTH_STATE.ready) {
    const openIndexResponse: GetOpenIndexResponse = yield call(Service.IndexService.getOpenIndex, {packageId: "com.ylbu8.abha"});
    yield put(indexPageSlice.actions.updateOpenAPI(openIndexResponse));
  } else {
    const indexResponse: GetIndexResponse = yield call(Service.IndexService.getIndex, {});
    yield put(indexPageSlice.actions.updateIndexAPI(indexResponse));
  }
}
