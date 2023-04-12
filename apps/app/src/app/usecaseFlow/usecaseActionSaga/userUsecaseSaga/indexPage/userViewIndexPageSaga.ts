// NOTE: Action: UserApplyProduct
import {call, put, select, fork, all} from "redux-saga/effects";
import {Service} from "../../../../api";
import {indexPageSlice} from "../../../reduxStore/indexPageSlice";
import {USER_AUTH_STATE} from "../../../../domain/USER_AUTH_STATE";
import moment from "moment-timezone";
import {SystemCaseActions} from "../../../usecaseAction/systemCaseActions";
import {GetIndexResponse} from "../../../../api/indexService/GetIndexResponse";
import {GetUserInfoServiceResponse} from "../../../../api/userService/GetUserInfoServiceResponse";
import {catchSagaError} from "../../../utils/catchSagaError";
import {GetOpenIndexResponse} from "../../../../api/indexService/GetOpenIndexResponse";
import {RootState} from "../../../reduxStore";
import {getToken} from "../../../../api/base/getToken";


export function* userViewIndexPageSaga(action: any) {
  try {

    const token: string = yield select((state: RootState) => state.app.token);
    if(!token) {
      // TODO: get token from querystring
      // const token = getToken();

      const userResponse: GetUserInfoServiceResponse = yield call(Service.UserService.GetUserInfoService, {});
      yield put(indexPageSlice.actions.updateUserAPI(userResponse));
    }

    const status: number = yield select((state: RootState) => state.indexPage.user.state);
    if (status === USER_AUTH_STATE.ready) {
      const openIndexResponse: GetOpenIndexResponse = yield call(Service.IndexService.getOpenIndex, {packageId: "com.ylbu8.abha"});
      yield put(indexPageSlice.actions.updateOpenAPI(openIndexResponse));

    } else {
      const indexResponse: GetIndexResponse = yield call(Service.IndexService.getIndex, {});
      yield put(indexPageSlice.actions.updateIndexAPI(indexResponse));

      if (indexResponse.noQuotaBalance === true || indexResponse.riskReject === true) {
        // NOTICE: 不能重刷，需等待重刷時間
        // console.log("不能重刷，需等待重刷時間")
        // const expireTime = moment(indexResponse.refreshableUntil);
        yield put(SystemCaseActions.SystemRefreshableCountdownSaga(indexResponse.refreshableUntil))

      } else {
        // NOTICE: 可以重刷
        const currentTime = moment();
        const expireTime = moment(indexResponse.offerExpireTime);
        const isRiskControlOverdue = expireTime.isBefore(currentTime);
        // console.log("currentTime.format", currentTime.format())
        // console.log("expireTime.format", expireTime.format())
        if (!isRiskControlOverdue && indexResponse.availableAmount > 0) {
          const expiredTime = indexResponse?.offerExpireTime;
          yield put(SystemCaseActions.SystemCountdownSaga(expiredTime))
        }
      }
    }

  } catch(error) {
    yield catchSagaError(error);
  }

}

function *callGetUserInfoServiceSaga() {

}
